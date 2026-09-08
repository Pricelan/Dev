#include "Spieler.h"
#include <iostream>
#include <string>
#include <sstream>


Spieler::Spieler(Figur::Farbe farbe, std::string name) : Teilnehmer (farbe, name){}


void Spieler::ermittleZug(Spielfeld* spielfeld, Position& start, Position& ziel) {
	
	std::string eingabe;
    bool gueltig = false;

    while (!gueltig) {
        std::cout << "Naechster Zug eingeben (z.B. e2e4): ";
        std::getline(std::cin, eingabe);

        if (eingabe.length() == 4 &&
            eingabe[0] >= 'a' && eingabe[0] <= 'h' &&
            eingabe[1] >= '1' && eingabe[1] <= '8' &&
            eingabe[2] >= 'a' && eingabe[2] <= 'h' &&
            eingabe[3] >= '1' && eingabe[3] <= '8') {
            gueltig = true;
        }
        else {
            std::cout << "Ungueltige Eingabe, bitte im Format e2e4 eingeben." << std::endl;
        }
    }

    start.spalte = eingabe[0] - 'a';
    start.reihe = (eingabe[1] - '0') - 1;
    ziel.spalte = eingabe[2] - 'a';
    ziel.reihe = (eingabe[3] - '0') - 1;

}