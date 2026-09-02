#include "Spielfeld.h"




Spielfeld() {

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

bool istFeldFrei(int reihe, int spalte) const {
	return feld[reihe][spalte] == nullptr;
}

Figur* getFigur(int reihe, int spalte) const
{
	return feld[reihe][spalte];
}

void setzeFigur(Figur* figur, Position ziel) {
	feld[ziel.reihe][ziel.spalte] = figur;

}

void startaufstellung(Figur::Farbe farbe, int figurenreihe, int bauernreihe)
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
