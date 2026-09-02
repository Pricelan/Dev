#pragma once
#include "Figur.h"

class Turm :public Figur {

public:
	Turm(Farbe farbe, Position position) : Figur (farbe, position) {}
	bool erlaubterZug(Position ziel) override;


};