#include "Bauer.h"
#include <cmath>


bool Bauer::erlaubterZug(Position ziel)
{
	int richtung;
	if (getFarbe() == Farbe::Weiss)
	{
		richtung = 1;
	}
	else
	{
		richtung = -1;
	}

	bool einFeldVorwaerts = (ziel.spalte == getPosition().spalte) && (ziel.reihe == getPosition().reihe + richtung);
	bool doppelSchritt = (ziel.spalte == getPosition().spalte) && (ziel.reihe == getPosition().reihe + 2 * richtung) && getIstErsterZug();
	bool diagonalSchlag = (std::abs(ziel.spalte - getPosition().spalte) == 1) && (ziel.reihe == getPosition().reihe + richtung);

	return einFeldVorwaerts || doppelSchritt || diagonalSchlag;
}