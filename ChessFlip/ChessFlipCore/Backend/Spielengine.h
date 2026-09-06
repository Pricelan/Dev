#pragma once
#include "Spielfeld.h"
#include "Teilnehmer.h"



class Spielengine {
public:
    static const int MAX_RUNDEN = 8;
   	Spielengine(Teilnehmer* teilnehmer1, Teilnehmer* teilnehmer2);
	~Spielengine();

    bool istSchach(Figur::Farbe farbe) const;
    bool pruefeZug(Position start, Position ziel) const;
    void zugAusfuehren(Position start, Position ziel);
    void naechsteRunde();
    


private:
    Position koenigFinden(Figur::Farbe farbe) const;
    bool istWegFrei(Position start, Position ziel) const;

    Spielfeld* spielfeld;
    Teilnehmer* teilnehmer1;
    Teilnehmer* teilnehmer2;
    Figur::Farbe aktuellerZug;
    int rundenZaehler;
};