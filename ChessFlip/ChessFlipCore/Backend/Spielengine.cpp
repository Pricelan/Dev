#include "Spielengine.h"
#include "Koenig.h"
#include <cassert>
#include "Springer.h"
#include "Bauer.h"
#include "Dame.h"
#include "Laeufer.h"
#include "Turm.h"
#include <cmath>

Spielengine::Spielengine(Teilnehmer* teilnehmer1, Teilnehmer* teilnehmer2) : spielfeld(new Spielfeld()), teilnehmer1(teilnehmer1), teilnehmer2(teilnehmer2),
aktuellerZug(Figur::Farbe::Weiss), rundenZaehler(0) {}

Spielengine::~Spielengine() {
	delete (spielfeld);
}

Position Spielengine::koenigFinden(Figur::Farbe farbe) const {
	for (int reihe = 0; reihe < 8; reihe++) {
		for (int spalte = 0; spalte < 8; spalte++) {
			Figur* aktuelleFigur = spielfeld->getFigur(reihe, spalte);
			if (dynamic_cast<Koenig*>(aktuelleFigur) != nullptr && aktuelleFigur->getFarbe() == farbe) {
				return Position(reihe, spalte);
			}
		}
	}
	assert(false);
	return Position(-1, -1);

}

bool Spielengine::istWegFrei(Position start, Position ziel) const {

	int reihenSchritt = (ziel.reihe > start.reihe) ? 1 : (ziel.reihe < start.reihe) ? -1 : 0;
	int spaltenSchritt = (ziel.spalte > start.spalte) ? 1 : (ziel.spalte < start.spalte) ? -1 : 0;

	int aktuelleReihe = start.reihe + reihenSchritt;
	int aktuelleSpalte = start.spalte + spaltenSchritt;

	while (aktuelleReihe != ziel.reihe || aktuelleSpalte != ziel.spalte) {
		if (!spielfeld->istFeldFrei(aktuelleReihe, aktuelleSpalte))
			return false;

		aktuelleReihe = aktuelleReihe + reihenSchritt;
		aktuelleSpalte = aktuelleSpalte + spaltenSchritt;

	}

	return true;

}

bool Spielengine::istBauernumwandlungFaellig(Position pos) const {
	Figur* figur = spielfeld->getFigur(pos.reihe, pos.spalte);
	Bauer* bauer = dynamic_cast<Bauer*>(figur);
	if (bauer == nullptr) {
		return false;
	}
	if (bauer->getFarbe() == Figur::Farbe::Weiss) {
		return pos.reihe == 7;
	}
	else {
		return pos.reihe == 0;
	}

}

void Spielengine::wandleBauerUm(Position pos, FigurTyp typ) {
	Figur* alterBauer = spielfeld->getFigur(pos.reihe, pos.spalte);
	Figur::Farbe farbe = alterBauer->getFarbe();
	delete alterBauer;

	switch (typ) {
	case FigurTyp::Dame:
		spielfeld->setzeFigur(new Dame(farbe, pos), pos);
		break;
	case FigurTyp::Turm:
		spielfeld->setzeFigur(new Turm(farbe, pos), pos);
		break;
	case FigurTyp::Springer:
		spielfeld->setzeFigur(new Springer(farbe, pos), pos);
		break;
	case FigurTyp::Laeufer:
		spielfeld->setzeFigur(new Laeufer(farbe, pos), pos);
		break;

	}
}

bool Spielengine::istSchach(Figur::Farbe farbe) const {

	Position koenigPos = koenigFinden(farbe);

	Figur::Farbe gegnerFarbe = (farbe == Figur::Farbe::Weiss) ? Figur::Farbe::Schwarz : Figur::Farbe::Weiss;

	
	for (int reihe = 0; reihe < 8; reihe++) {
		for (int spalte = 0; spalte < 8; spalte++) {
			Figur* aktuelleFigur = spielfeld->getFigur(reihe, spalte);
			if (aktuelleFigur != nullptr && aktuelleFigur->getFarbe() == gegnerFarbe) {
				if (aktuelleFigur->erlaubterZug(koenigPos) && istWegFrei(Position(reihe, spalte), koenigPos)) {
					return true;
			    }
		    }
			
		}
	}
	return false;

}

bool Spielengine::istSchachmatt(Figur::Farbe farbe) const {
	if (!istSchach(farbe)) {
		return false;
	}
	for (int startReihe = 0; startReihe < 8; startReihe++) {
		for (int startSpalte = 0; startSpalte < 8; startSpalte++) {
			Figur* figur = spielfeld->getFigur(startReihe, startSpalte);
			if (figur == nullptr || figur->getFarbe() != farbe) {
				continue; // nicht meine Figur, überspringen
			}
			for (int zielReihe = 0; zielReihe < 8; zielReihe++) {
				for (int zielSpalte = 0; zielSpalte < 8; zielSpalte++) {
					if (pruefeZug(Position(startReihe, startSpalte), Position(zielReihe, zielSpalte))) {
						return false;
					}
				}
			}

		}
	}
	return true;
}

bool Spielengine::pruefeZug(Position start, Position ziel) const {

	Figur* ziehendeFigur = spielfeld->getFigur(start.reihe, start.spalte);

	if (ziehendeFigur == nullptr || ziehendeFigur->getFarbe() != aktuellerZug) {
		return false;
	}

	Figur* zielFigur = spielfeld->getFigur(ziel.reihe, ziel.spalte);

	if (zielFigur != nullptr && zielFigur->getFarbe() == aktuellerZug) {
		return false;
	}
	
	if (!ziehendeFigur->erlaubterZug(ziel)) {
		return false;
	}
	if (dynamic_cast<Springer*>(ziehendeFigur) == nullptr && !istWegFrei(start, ziel)) {
		return false;
	}

	if (dynamic_cast<Bauer*>(ziehendeFigur) != nullptr) {
		bool istDiagonal = (start.spalte != ziel.spalte);
		if (istDiagonal && zielFigur == nullptr) {
			return false;
		}
		if (!istDiagonal && zielFigur != nullptr) {
			return false;
		}
	}
	
	Figur* geschlageneFigur = spielfeld->getFigur(ziel.reihe, ziel.spalte);
	spielfeld->setzeFigur(ziehendeFigur, ziel);
	spielfeld->setzeFigur(nullptr, start);

	bool eigenerKoenigImSchach = istSchach(aktuellerZug);

	spielfeld->setzeFigur(ziehendeFigur, start);
	spielfeld->setzeFigur(geschlageneFigur, ziel);

	if (eigenerKoenigImSchach) {
		return false;
	}
		
	return true;
}


void Spielengine::zugAusfuehren(Position start, Position ziel) {

	Figur* ziehendeFigur = spielfeld->getFigur(start.reihe, start.spalte);
	Figur* zielFigur = spielfeld->getFigur(ziel.reihe, ziel.spalte);
	delete zielFigur;
	
	ziehendeFigur->setPosition(ziel);
	spielfeld->setzeFigur(ziehendeFigur, ziel);
	ziehendeFigur->setIstErsterZug(false);
	spielfeld->setzeFigur(nullptr, start);

}

void Spielengine::naechsteRunde() {

	aktuellerZug = (aktuellerZug == Figur::Farbe::Weiss) ? Figur::Farbe::Schwarz : Figur::Farbe::Weiss;

	if (aktuellerZug == Figur::Farbe::Weiss) {
		rundenZaehler++;
		if (rundenZaehler == 8 && !istSchach(Figur::Farbe::Weiss) && !istSchach(Figur::Farbe::Schwarz)) {
			rundenZaehler = 0;
			Figur::Farbe temp = teilnehmer1->getFarbe();
			teilnehmer1->setFarbe(teilnehmer2->getFarbe());
			teilnehmer2->setFarbe(temp);
		}
	}
}

std::string Spielengine::getAktuellerSpieler() const {

	if (teilnehmer1->getFarbe() == aktuellerZug) {
		return teilnehmer1->getName();
	}
	else
		return teilnehmer2->getName();


}

bool Spielengine::istRochadeMoeglich(Position start, Position ziel) const {
	Figur* koenig = spielfeld->getFigur(start.reihe, start.spalte);
	if (dynamic_cast<Koenig*>(koenig) == nullptr) {
		return false;
	}
	if (start.reihe != ziel.reihe || std::abs(ziel.spalte - start.spalte) != 2) {
		return false;
	}
	Position turmPos = turmPositionFuerRochade(start, ziel);
	Figur* turm = spielfeld->getFigur(turmPos.reihe, turmPos.spalte);
		if (dynamic_cast<Turm*>(turm) == nullptr) {
		return false;
	}
		if (!koenig->getIstErsterZug() || !turm->getIstErsterZug()) {
			return false;
	}
		if (!istWegFrei(start, turmPos)) {
			return false;
	}
		if (istSchach(aktuellerZug)) {
			return false;
		}
		int zwischenSpalte = (start.spalte + ziel.spalte) / 2;
		Position zwischenPos(start.reihe, zwischenSpalte);
		// König Feld für Feld probeweise bewegen und auf Schach prüfen
		spielfeld->setzeFigur(nullptr, start); // Startfeld leeren

		spielfeld->setzeFigur(koenig, zwischenPos); // König aufs Zwischenfeld
		bool zwischenfeldBedroht = istSchach(aktuellerZug);
		spielfeld->setzeFigur(nullptr, zwischenPos);// Zwischenfeld wieder leeren

		spielfeld->setzeFigur(koenig, ziel); // König aufs Zielfeld
		bool zielfeldBedroht = istSchach(aktuellerZug);

		spielfeld->setzeFigur(nullptr, ziel); // Zielfeld leeren
		spielfeld->setzeFigur(koenig, start); // König zurück aufs Startfeld

		if (zwischenfeldBedroht || zielfeldBedroht) {
			return false;
		}
	return true;
}

Position Spielengine::turmPositionFuerRochade(Position start, Position ziel) const {
	int turmSpalte = (ziel.spalte > start.spalte) ? 7 : 0;
	return Position(start.reihe, turmSpalte);
}


void Spielengine::rochadeAusfuehren(Position start, Position ziel){
	Figur* koenig = spielfeld->getFigur(start.reihe, start.spalte);
	Position turmPos = turmPositionFuerRochade(start, ziel);
	Figur* turm = spielfeld->getFigur(turmPos.reihe, turmPos.spalte);

	int neueTurmSpalte = (start.spalte + ziel.spalte) / 2;
	Position neueTurmPos(start.reihe, neueTurmSpalte);
	
	//Koenig bewegen
	koenig->setPosition(ziel);
	spielfeld->setzeFigur(koenig, ziel);
	spielfeld->setzeFigur(nullptr, start);
	koenig->setIstErsterZug(false);

	//Turm bewegen
	turm->setPosition(neueTurmPos);
	spielfeld->setzeFigur(turm, neueTurmPos);
	spielfeld->setzeFigur(nullptr, turmPos);
	turm->setIstErsterZug(false);
}
