#include "KiGegner.h"
#include <vector>
#include "Spielengine.h"
#include "Bauer.h"
#include "Koenig.h"
#include "Springer.h"
#include "Dame.h"
#include "Laeufer.h"
#include "Turm.h"


KiGegner::KiGegner(Figur::Farbe farbe) : Teilnehmer(farbe, "Tiro") {}

void KiGegner::setSpielengine(Spielengine* engine) {
	this->engine = engine;
}

std::vector<std::pair<Position, Position>> KiGegner::alleZuege(Figur::Farbe farbe) {
	std::vector<std::pair<Position, Position>> zuege;


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