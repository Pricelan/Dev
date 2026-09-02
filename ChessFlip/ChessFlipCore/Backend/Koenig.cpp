#include "Koenig.h"
#include <cmath>

bool Koenig::erlaubterZug(Position ziel){

	int reihenDifferenz = std::abs(ziel.reihe - getPosition().reihe);
	int spaltenDifferenz = std::abs(ziel.spalte - getPosition().spalte);


	return (reihenDifferenz <= 1 && spaltenDifferenz <= 1) && (reihenDifferenz != 0 || spaltenDifferenz != 0);



}