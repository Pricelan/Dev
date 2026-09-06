#include "Spielfeld.h"
#include "FigurTyp.h"
#include "Turm.h"
#include "Dame.h"
#include "Springer.h"
#include "Laeufer.h"
#include "Koenig.h"
#include "Bauer.h"
#include <cassert>

Spielfeld::Spielfeld() {

	for (int reihe = 0; reihe < 8; reihe++)
	{
		for (int spalte = 0; spalte < 8; spalte++)
		{
			feld[reihe][spalte] = nullptr;
		}
	}
	startaufstellung(Figur::Farbe::Weiss, 0, 1);
	startaufstellung(Figur::Farbe::Schwarz, 7, 6);
}

Spielfeld::~Spielfeld() {
	for (int reihe = 0; reihe < 8; reihe++)
	{
		for (int spalte = 0; spalte < 8; spalte++)
		{
			delete feld[reihe][spalte];
		}
	}
}

bool Spielfeld::istFeldFrei(int reihe, int spalte) const {
	assert(reihe >= 0 && reihe < 8 && spalte >= 0 && spalte < 8);
	return feld[reihe][spalte] == nullptr;
}

Figur* Spielfeld::getFigur(int reihe, int spalte) const
{
	assert(reihe >= 0 && reihe < 8 && spalte >= 0 && spalte < 8);
	return feld[reihe][spalte];
}

void Spielfeld::setzeFigur(Figur* figur, Position ziel) {
	assert(ziel.reihe >= 0 && ziel.reihe < 8 && ziel.spalte >= 0 && ziel.spalte < 8);
	feld[ziel.reihe][ziel.spalte] = figur;
}

void Spielfeld::startaufstellung(Figur::Farbe farbe, int figurenreihe, int bauernreihe)
{
	FigurTyp grundreihe[8] = { FigurTyp::Turm, FigurTyp::Springer, FigurTyp::Laeufer,FigurTyp::Dame, FigurTyp::Koenig,
	FigurTyp::Laeufer, FigurTyp::Springer, FigurTyp::Turm };

	for (int spalte = 0; spalte < 8; spalte++) {

		switch (grundreihe[spalte])
		{
		case FigurTyp::Turm:
			setzeFigur(new Turm(farbe, Position(figurenreihe, spalte)), Position(figurenreihe, spalte));
			break;

		case FigurTyp::Springer:
			setzeFigur(new Springer(farbe, Position(figurenreihe, spalte)), Position(figurenreihe, spalte));
			break;

		case FigurTyp::Koenig:
			setzeFigur(new Koenig(farbe, Position(figurenreihe, spalte)), Position(figurenreihe, spalte));
			break;

		case FigurTyp::Dame:
			setzeFigur(new Dame(farbe, Position(figurenreihe, spalte)), Position(figurenreihe, spalte));
			break;

		case FigurTyp::Laeufer:
			setzeFigur(new Laeufer(farbe, Position(figurenreihe, spalte)), Position(figurenreihe, spalte));
			break;
		}
	}

	for (int spalte = 0; spalte < 8; spalte++) {
		setzeFigur(new Bauer(farbe, Position(bauernreihe, spalte)), Position(bauernreihe, spalte));
	}
}