#include "Bauer.h"



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
	return (ziel.spalte == getPosition().spalte && ziel.reihe == getPosition().reihe + richtung) ||
		(getIstErsterZug() && ziel.spalte == getPosition().spalte && ziel.reihe == getPosition().reihe + 2 * richtung);
}