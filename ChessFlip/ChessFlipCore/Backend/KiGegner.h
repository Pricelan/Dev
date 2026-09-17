#pragma once
#include "Teilnehmer.h"
#include "Spielengine.h"
#include <vector>




class KiGegner : public Teilnehmer
{


public:
	KiGegner(Figur::Farbe farbe);
	void ermittleZug(Spielfeld* spielfeld, Position& start, Position& ziel) override;
	void setSpielengine(Spielengine* engine);

private:
	Spielengine* engine = nullptr;
	std::vector<std::pair<Position, Position>> alleZuege(Figur::Farbe farbe);
	int bewerteStellung(Figur::Farbe kiFarbe) const;
	int figurWert(Figur* figur) const;
};

