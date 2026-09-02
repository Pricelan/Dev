#pragma once
#include "Figur.h"



class Spielfeld {


public:
	Spielfeld();
	~Spielfeld();
	bool istFeldFrei(int reihe, int spalte) const;
	Figur* getFigur(int reihe, int spalte) const;
	void setzeFigur(Figur* figur, Position ziel);
	void startaufstellung(Figur::Farbe farbe, int figurenreihe, int bauernreihe);
	

private:

	Figur* feld[8][8];


};
