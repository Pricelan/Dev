#pragma once
#include "Figur.h"


class Dame : public Figur {

public:

	Dame(Farbe farbe, Position position) : Figur(farbe, position) {}
	bool erlaubterZug(Position ziel) override;


};