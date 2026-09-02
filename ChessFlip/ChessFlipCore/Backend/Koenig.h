#pragma once
#include "Figur.h"

class Koenig : public Figur {

public:

	Koenig(Farbe farbe,Position position) : Figur(farbe,position){}
	bool erlaubterZug(Position ziel) override;


};