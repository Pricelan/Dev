#pragma once
#include "Figur.h"

class Laeufer : public Figur {

public:
	Laeufer(Farbe farbe, Position position) : Figur(farbe, position){}
	bool erlaubterZug(Position ziel) override;


};