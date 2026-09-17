#pragma once
#include "Teilnehmer.h"




class KiGegner : public Teilnehmer
{


public:
	KiGegner(Figur::Farbe farbe);
	void ermittleZug(Spielfeld* spielfeld, Position& start, Position& ziel) override;

};

