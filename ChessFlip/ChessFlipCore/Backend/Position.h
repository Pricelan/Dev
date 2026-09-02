#pragma once

struct Position
{
	int reihe;
	int spalte;
	Position(int reihe, int spalte) : reihe(reihe), spalte(spalte) {}
	Position() : reihe(0), spalte(0) {}
};