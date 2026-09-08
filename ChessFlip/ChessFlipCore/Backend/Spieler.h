#pragma once
#include "Teilnehmer.h"

class Spieler : public Teilnehmer {

public:
	Spieler(Figur::Farbe farbe, std::string name);
	void ermittleZug(Spielfeld* spielfeld, Position& start, Position& ziel) override;








};