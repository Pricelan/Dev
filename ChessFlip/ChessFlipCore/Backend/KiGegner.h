#pragma once
#include "Teilnehmer.h"
#include "Spielengine.h"
#include <vector>




class KiGegner : public Teilnehmer
{


public:
	KiGegner(Figur::Farbe farbe);
	void ermittleZug(Spielfeld* spielfeld, Position& start, Position& ziel) override;
	void setSpielengine(Spielengine* engine);

private:
	Spielengine* engine = nullptr;

	// O(1) - feste 8x8-Doppelschleife, Aufwand pro Feld abhängig von pruefeZug()
	std::vector<std::pair<Position, Position>> alleZuege(Figur::Farbe farbe);

	// O(1) - feste 8x8-Doppelschleife
	int bewerteStellung(Figur::Farbe kiFarbe) const;

	// O(1) - konstante Anzahl Typ-Vergleiche
	int figurWert(Figur* figur) const;

	// O(b^d), b = Verzweigungsfaktor (Anzahl möglicher Züge pro Stellung), d = Suchtiefe
	int minimax(int tiefe, Figur::Farbe farbe);
	Figur* zugSimulieren(Position start, Position ziel);
	void zugRueckgaengig(Position start, Position ziel, Figur* figur);

	static const int SUCHTIEFE = 2;
};

