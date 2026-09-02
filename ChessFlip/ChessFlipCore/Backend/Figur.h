#pragma once
#include "Position.h"	


class Figur
{
public:
	virtual bool erlaubterZug(Position ziel) = 0;
	virtual ~Figur();
	enum class Farbe { Weiss, Schwarz };
	Figur(Farbe farbe, Position position);

	Position getPosition() const { return position; }
	Farbe getFarbe() const { return farbe; }
	bool getIstErsterZug() const { return istErsterZug; }
	void setIstErsterZug(bool ersterZug) { istErsterZug = ersterZug;}

private:
	Farbe farbe;
	bool istErsterZug;
	Position position;


};