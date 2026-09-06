#pragma once
#include "Position.h"
#include "Spielfeld.h"
#include <string>

class Teilnehmer {

public:
	Teilnehmer(Figur::Farbe farbe, std::string name);
	virtual ~Teilnehmer();
	virtual void ermittleZug(Spielfeld* spielfeld, Position& start, Position& ziel) = 0;
	Figur::Farbe getFarbe() const { return farbe; }
	void setFarbe(Figur::Farbe neueFarbe) { farbe = neueFarbe; }

private: 

	Figur::Farbe farbe;
	std::string name;


}; 