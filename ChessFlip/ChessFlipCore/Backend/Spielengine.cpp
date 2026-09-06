#include "Spielengine.h"
#include "Koenig.h"
#include <cassert>

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

bool Spielengine::pruefeZug(Position start, Position ziel) const {

	Figur* ziehendeFigur = spielfeld->getFigur(start.reihe, start.spalte);

	if (ziehendeFigur == nullptr || ziehendeFigur->getFarbe() != aktuellerZug) {
		return false;
	}

	Figur* zielFigur = spielfeld->getFigur(ziel.reihe, ziel.spalte);

	if (zielFigur != nullptr && zielFigur->getFarbe() == aktuellerZug) {
		return false;
	}

	if (!(ziehendeFigur->erlaubterZug(ziel) && istWegFrei(start, ziel))) {
		return false;
	}
	return true;
}


void Spielengine::zugAusfuehren(Position start, Position ziel) {

	Figur* ziehendeFigur = spielfeld->getFigur(start.reihe, start.spalte);
	Figur* zielFigur = spielfeld->getFigur(ziel.reihe, ziel.spalte);
	delete zielFigur;

	spielfeld->setzeFigur(ziehendeFigur, ziel);
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