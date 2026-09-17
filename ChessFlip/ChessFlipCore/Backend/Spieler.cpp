#include "Spieler.h"
#include <iostream>
#include <string>
#include <sstream>
#include "ZugParser.h"

Spieler::Spieler(Figur::Farbe farbe, std::string name) : Teilnehmer (farbe, name){}


void Spieler::ermittleZug(Spielfeld* spielfeld, Position& start, Position& ziel) {
	
	std::string eingabe;
    bool gueltig = false;

    while (!gueltig) {
        std::cout << "Naechster Zug eingeben (z.B. e2e4): ";
        std::getline(std::cin, eingabe);
        gueltig = parseZugString(eingabe, start, ziel);
        if (!gueltig) {
            std::cout << "Ungueltige Eingabe, bitte im Format e2e4 eingeben." << std::endl;
        }               
      }
         
}