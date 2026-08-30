#pragma once
#include "Figur.h"

class Bauer : public Figur
{
public:
	Bauer(Farbe farbe, Position position) : Figur(farbe, position), letzterZugZeitpunkt (-1) {}
	bool erlaubterZug(Position ziel) override;

	int getLetzterZugZeitpunkt() const { return letzterZugZeitpunkt; } // Getter für den Zeitpunkt des letzten Zugs des Bauern


private:
	
	int letzterZugZeitpunkt; // Speichert den Zeitpunkt des letzten Zugs des Bauern

};
