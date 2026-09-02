#include "Dame.h"
#include "Turm.h"
#include "laeufer.h"

bool Dame::erlaubterZug(Position ziel) {

	Turm turm(getFarbe(), getPosition());
	bool turmZug = turm.erlaubterZug(ziel);

	Laeufer laeufer(getFarbe(), getPosition());
	bool laeuferZug= laeufer.erlaubterZug(ziel);

	return turmZug || laeuferZug;
}