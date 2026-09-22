#include "KiGegner.h"
#include <vector>
#include "Spielengine.h"
#include "Bauer.h"
#include "Koenig.h"
#include "Springer.h"
#include "Dame.h"
#include "Laeufer.h"
#include "Turm.h"
#include <fstream>


KiGegner::KiGegner(Figur::Farbe farbe) : Teilnehmer(farbe, "Tiro") {}

void KiGegner::setSpielengine(Spielengine* engine) {
	this->engine = engine;
}

std::vector<std::pair<Position, Position>> KiGegner::alleZuege(Figur::Farbe farbe) {
	std::vector<std::pair<Position, Position>> zuege;

	Figur::Farbe alterZug = engine->getAktuellerZug();
	engine->setAktuellerZug(farbe);

	for (int startReihe = 0; startReihe < 8; startReihe++) {
		for (int startSpalte = 0; startSpalte < 8; startSpalte++) {
			Figur* figur = engine->getSpielfeld()->getFigur(startReihe, startSpalte);
			if (figur == nullptr || figur->getFarbe() != farbe) {
				continue;
			}
			
			for (int zielReihe = 0; zielReihe < 8; zielReihe++) {
				for (int zielSpalte = 0; zielSpalte < 8; zielSpalte++) {
					if (engine->pruefeZug(Position(startReihe, startSpalte), Position(zielReihe, zielSpalte))) {
						zuege.push_back(std::make_pair(Position(startReihe, startSpalte), Position(zielReihe, zielSpalte)));
						
					}
				}
			}
		}
	}
	engine->setAktuellerZug(alterZug);
	return zuege;
}

int KiGegner::figurWert(Figur* figur) const {

	if (dynamic_cast<Bauer*>(figur) != nullptr) return 1;
	if (dynamic_cast<Laeufer*>(figur) != nullptr) return 3;
	if (dynamic_cast<Koenig*>(figur) != nullptr) return 0;
	if (dynamic_cast<Springer*>(figur) != nullptr) return 3;
	if (dynamic_cast<Turm*>(figur) != nullptr) return 5;
	if (dynamic_cast<Dame*>(figur) != nullptr) return 9;

	return 0;

}

int KiGegner::bewerteStellung(Figur::Farbe kiFarbe) const {
	int summe = 0;
	for (int reihe = 0; reihe < 8; reihe++) {
		for (int spalte = 0; spalte < 8; spalte++) {
			Figur* figur = engine->getSpielfeld()->getFigur(reihe, spalte);
			if (figur == nullptr) {
				continue;
			}
			int wert = figurWert(figur);
			if (figur->getFarbe() == kiFarbe) {
				summe = summe + wert;
			}
			else {
				summe = summe - wert;
			}
		}
	}
	return summe;
}

Figur* KiGegner::zugSimulieren(Position start, Position ziel) {
	Figur* ziehendeFigur = engine->getSpielfeld()->getFigur(start.reihe, start.spalte);
	Figur* geschlageneFigur = engine->getSpielfeld()->getFigur(ziel.reihe, ziel.spalte);

	ziehendeFigur->setPosition(ziel);
	engine->getSpielfeldVeraenderbar()->setzeFigur(ziehendeFigur, ziel);
	engine->getSpielfeldVeraenderbar()->setzeFigur(nullptr, start);
	return geschlageneFigur;
}

void KiGegner::zugRueckgaengig(Position start, Position ziel, Figur* geschlageneFigur) {
	Figur* ziehendeFigur = engine->getSpielfeld()->getFigur(ziel.reihe, ziel.spalte);

	ziehendeFigur->setPosition(start);
	engine->getSpielfeldVeraenderbar()->setzeFigur(ziehendeFigur, start);
	engine->getSpielfeldVeraenderbar()->setzeFigur(geschlageneFigur, ziel);
}

int KiGegner::minimax(int tiefe, Figur::Farbe farbe) {
	Figur::Farbe alterZug = engine->getAktuellerZug();
	engine->setAktuellerZug(farbe);

	if (engine->istSchachmatt(farbe)) {
		engine->setAktuellerZug(alterZug);
		if (farbe == getFarbe()) {
			return -10000;
		}
		else {
			return 10000;
		}
	}
	if (tiefe == 0) {
		engine->setAktuellerZug(alterZug);
		return bewerteStellung(getFarbe());
	}

	std::vector<std::pair<Position, Position>> zuege = alleZuege(farbe);
	Figur::Farbe gegnerFarbe = (farbe == Figur::Farbe::Weiss) ? Figur::Farbe::Schwarz : Figur::Farbe::Weiss;
		
	int besterWert = (farbe == getFarbe()) ? -1000 : 1000;
		for (std::pair<Position, Position> zug: zuege) {
			Figur* geschlageneFigur = zugSimulieren(zug.first, zug.second);
			
			int wert = minimax(tiefe - 1, gegnerFarbe);
			zugRueckgaengig(zug.first, zug.second, geschlageneFigur);

			if (farbe == getFarbe()) {
				if (wert > besterWert) {
					besterWert = wert;
				}
			}
			else {
				if (wert < besterWert) {
					besterWert = wert;
				}
			}
			
	}
		engine->setAktuellerZug(alterZug);
		return besterWert;
}

void KiGegner::ermittleZug(Spielfeld* spielfeld, Position& start, Position& ziel) {
	std::ofstream log("ki_protokoll.txt", std::ios::app);

	std::vector<std::pair<Position, Position>> zuege = alleZuege(getFarbe());
	int besterWert = -1000;
	Figur::Farbe gegnerFarbeVonKi = (getFarbe() == Figur::Farbe::Weiss) ? Figur::Farbe::Schwarz : Figur::Farbe::Weiss;
	for (std::pair<Position, Position> zug : zuege) {

		Figur* geschlageneFigur = zugSimulieren(zug.first, zug.second);
				int wert = minimax(SUCHTIEFE - 1, gegnerFarbeVonKi);
		zugRueckgaengig(zug.first, zug.second, geschlageneFigur);

		if (wert > besterWert) {
			besterWert = wert;
			start = zug.first;
			ziel = zug.second;
		}
		log << "Zug (" << zug.first.reihe << "," << zug.first.spalte << ") -> ("
			<< zug.second.reihe << "," << zug.second.spalte << ") bewertet mit " << wert << "\n";


	}
	log << "Gewaehlter Zug: (" << start.reihe << "," << start.spalte << ") -> ("
		<< ziel.reihe << "," << ziel.spalte << "), Bewertung " << besterWert << "\n\n";
}