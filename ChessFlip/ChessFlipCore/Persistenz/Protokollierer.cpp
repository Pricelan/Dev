#include "Protokollierer.h"
#include <fstream>
#include <sstream>
#include <iostream>
#include "..\Backend\Bauer.h"
#include "..\Backend\Koenig.h"
#include "..\Backend\Springer.h"
#include "..\Backend\Dame.h"
#include "..\Backend\Laeufer.h"
#include "..\Backend\Turm.h"
#include "..\Backend\KiGegner.h"


void Protokollierer::speichern(const Spielengine& engine, const std::string& dateiname) {
	std::ofstream datei(dateiname);

	datei << "AktuellerZug;" << (engine.aktuellerZug == Figur::Farbe::Weiss ? "Weiss" : "Schwarz") << "\n";
	datei << "RundenZaehler;" << engine.rundenZaehler << "\n";
	datei << "Spieler1Name;" << engine.teilnehmer1->getName() << "\n";
	datei << "Spieler2Name;" << engine.teilnehmer2->getName() << "\n";
	datei << "letzterZugWarDoppelschritt;" << engine.letzterZugWarDoppelschritt << "\n";
	datei << "letzterDoppelschritt;" << engine.letzterDoppelschritt.reihe << ";" << engine.letzterDoppelschritt.spalte << "\n";
	datei << "Teilnehmer2IstKi;" << (dynamic_cast<KiGegner*>(engine.teilnehmer2) != nullptr) << "\n";

	for (int reihe = 0; reihe < 8; reihe++) {
		for (int spalte = 0; spalte < 8; spalte++) {
			Figur* figur = engine.spielfeld->getFigur(reihe, spalte);
			if (figur == nullptr) {
				continue;
			}
			std::string farbe = (figur->getFarbe() == Figur::Farbe::Weiss) ? "Weiss" : "Schwarz";
			datei << "Figur;" << farbe << ";" << figurTypAlsText(figur) << ";" << reihe << ";" << spalte << "\n";
		}
	}
	
}

std::string Protokollierer::figurTypAlsText(Figur* figur) {
	if (dynamic_cast<Bauer*>(figur) != nullptr) return "Bauer";
	if (dynamic_cast<Laeufer*>(figur) != nullptr) return "Laeufer";
	if (dynamic_cast<Koenig*>(figur) != nullptr) return "Koenig";
	if (dynamic_cast<Springer*>(figur) != nullptr) return "Springer";
	if (dynamic_cast<Turm*>(figur) != nullptr) return "Turm";
	if (dynamic_cast<Dame*>(figur) != nullptr) return "Dame";

	return "";
}

bool Protokollierer::warTeilnehmer2Ki(const std::string& dateiname) {
	std::ifstream datei(dateiname);
	std::string zeile;
	
	while (std::getline(datei, zeile)) {
		std::vector<std::string> teile = teileAufteilen(zeile);
		if (teile[0] == "Teilnehmer2IstKi") {
			return (teile[1] == "1");
		}
	}
	return false;
}

void Protokollierer::laden(Spielengine& engine, const std::string& dateiname) {
	std::ifstream datei(dateiname);
	std::string zeile;

	for (int reihe = 0; reihe < 8; reihe++) {
		for (int spalte = 0; spalte < 8; spalte++) {
			Figur* alteFigur = engine.spielfeld->getFigur(reihe, spalte);
			delete alteFigur;
			engine.spielfeld->setzeFigur(nullptr, Position(reihe, spalte));
		}
	}

	while (std::getline(datei, zeile)) {
		std::vector<std::string> teile = teileAufteilen(zeile);

		if (teile[0] == "AktuellerZug") {
			engine.aktuellerZug = (teile[1] == "Weiss") ? Figur::Farbe::Weiss : Figur::Farbe::Schwarz;
		}
		else if (teile[0] == "RundenZaehler") {
			engine.rundenZaehler = std::stoi(teile[1]);
		}
		else if (teile[0] == "Spieler1Name") {
			engine.teilnehmer1->setName(teile[1]);
		}
		else if (teile[0] == "Spieler2Name") {
			engine.teilnehmer2->setName(teile[1]);
		}
		else if (teile[0] == "letzterZugWarDoppelschritt") {
			engine.letzterZugWarDoppelschritt = (teile[1] == "1");
		}
		else if (teile[0] == "letzterDoppelschritt") {
			engine.letzterDoppelschritt = Position(std::stoi(teile[1]), std::stoi(teile[2]));
		}
		else if (teile[0] == "Figur") {
			Figur::Farbe farbe = (teile[1] == "Weiss") ? Figur::Farbe::Weiss : Figur::Farbe::Schwarz;
			Position pos(std::stoi(teile[3]), std::stoi(teile[4]));
			Figur* neueFigur = nullptr;
			if (teile[2] == "Bauer") {
				neueFigur = new Bauer(farbe, pos);
			}
			else if (teile[2] == "Turm") {
				neueFigur = new Turm(farbe, pos);
			}
			else if (teile[2] == "Koenig") {
				neueFigur = new Koenig(farbe, pos);
			}
			else if (teile[2] == "Springer") {
				neueFigur = new Springer(farbe, pos);
			}
			else if (teile[2] == "Laeufer") {
				neueFigur = new Laeufer(farbe, pos);
			}
			else if (teile[2] == "Dame") {
				neueFigur = new Dame(farbe, pos);
			}
			engine.spielfeld->setzeFigur(neueFigur, pos);
		}
	}
}

std::vector<std::string> Protokollierer::teileAufteilen(const std::string& zeile) {
	std::vector<std::string> teile;
	std::stringstream ss(zeile);
	std::string teil;
	while (std::getline(ss, teil, ';')) {
		teile.push_back(teil);
	}

	return teile;

}