#include "Springer.h"
#include <cmath>

bool Springer::erlaubterZug(Position ziel)
{
	int reihenDifferenz = std::abs(ziel.reihe - getPosition().reihe);
	int spaltenDifferenz = std::abs(ziel.spalte - getPosition().spalte);
	return (reihenDifferenz == 2 && spaltenDifferenz == 1) || (reihenDifferenz == 1 && spaltenDifferenz == 2);
}	