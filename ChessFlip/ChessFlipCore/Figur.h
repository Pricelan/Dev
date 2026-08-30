#pragma once
#include "Position.h"	


class Figur
{
public:
	virtual bool erlaubterZug(Position ziel) = 0;
	enum class Farbe { Weiss, Schwarz };
	Figur(Farbe farbe, Position position);

	Position getPosition() const { return position; }
	Farbe getFarbe() const { return farbe; }
	bool getIstErsterZug() const { return istErsterZug; }

private:
	Farbe farbe;
	bool istErsterZug;
	Position position;


};