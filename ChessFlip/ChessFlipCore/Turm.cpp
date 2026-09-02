#include "Turm.h"

bool Turm::erlaubterZug(Position ziel) {

	bool feldVertikal = (ziel.spalte == getPosition().spalte) && (ziel.reihe != getPosition().reihe);
	bool feldHorizontal = (ziel.spalte != getPosition().spalte) && (ziel.reihe == getPosition().reihe);

	return feldVertikal || feldHorizontal;
}