#pragma once
#include "Spielfeld.h"
#include "Teilnehmer.h"
#include <string>
#include "Figur.h"
#include "FigurTyp.h"


class Spielengine {
    friend class Protokollierer;
public:
    static const int MAX_RUNDEN = 8;
   	Spielengine(Teilnehmer* teilnehmer1, Teilnehmer* teilnehmer2);
	~Spielengine();

    bool istBauernumwandlungFaellig(Position pos) const;
    bool istSchach(Figur::Farbe farbe) const;
    bool istSchachmatt(Figur::Farbe farbe) const;
    bool istRochadeMoeglich(Position start, Position ziel) const;
    bool pruefeZug(Position start, Position ziel) const;
    bool istEnPassantMoeglich(Position start, Position ziel) const;
    void zugAusfuehren(Position start, Position ziel);
    void naechsteRunde();
    void wandleBauerUm(Position pos, FigurTyp typ);
    void rochadeAusfuehren(Position start, Position ziel);
    void enPassantAusfuehren(Position start, Position ziel);
    Figur::Farbe getAktuellerZug() const {
        return aktuellerZug;
    }
    const Spielfeld* getSpielfeld() const {
        return spielfeld;
    }
    int getRundenZaehler() const { return rundenZaehler; }
    std::string getAktuellerSpieler() const;
        

private:
    Position koenigFinden(Figur::Farbe farbe) const;
    bool istWegFrei(Position start, Position ziel) const;
    Position turmPositionFuerRochade(Position start, Position ziel) const;

    Spielfeld* spielfeld;
    Teilnehmer* teilnehmer1;
    Teilnehmer* teilnehmer2;
    Figur::Farbe aktuellerZug;
    int rundenZaehler;
    Position letzterDoppelschritt;
    bool letzterZugWarDoppelschritt = false;
};