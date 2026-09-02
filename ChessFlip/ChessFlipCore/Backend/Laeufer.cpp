#include "Laeufer.h"
#include <cmath>

bool Laeufer::erlaubterZug(Position ziel) {

	int reihenDifferenz = std::abs(ziel.reihe - getPosition().reihe);
	int spaltenDifferenz = std::abs(ziel.spalte - getPosition().spalte);

	return (reihenDifferenz == spaltenDifferenz) && (reihenDifferenz != 0);




}
