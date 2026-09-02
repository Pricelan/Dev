#pragma once
#include "Figur.h"

class Springer : public Figur
{
public:
	Springer(Farbe farbe, Position position) : Figur(farbe, position) {}
	bool erlaubterZug(Position ziel) override;
};



