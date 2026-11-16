#include "ZugParser.h"
#include <string>


bool parseZugString(const std::string& eingabe, Position& start, Position& ziel) {
                    

    if (eingabe.length() == 4 &&
        eingabe[0] >= 'a' && eingabe[0] <= 'h' &&
        eingabe[1] >= '1' && eingabe[1] <= '8' &&
        eingabe[2] >= 'a' && eingabe[2] <= 'h' &&
        eingabe[3] >= '1' && eingabe[3] <= '8') {
        
    }
        else {
            return false;
        }
       
    

    start.spalte = eingabe[0] - 'a';
    start.reihe = (eingabe[1] - '0') - 1;
    ziel.spalte = eingabe[2] - 'a';
    ziel.reihe = (eingabe[3] - '0') - 1;
    return true;
    
    }

std::string zugAlsText(Position start, Position ziel) {
    std::string text;
    text += static_cast<char>('a' + start.spalte);
    text += static_cast<char>('1' + start.reihe);
    text += static_cast<char>('a' + ziel.spalte);
    text += static_cast<char>('1' + ziel.reihe);
    return text;
}

char umwandlungAlsZeichen(FigurTyp typ) {
    switch (typ) {
    case FigurTyp::Dame:  return 'D';
    case FigurTyp::Turm:  return 'T';
    case FigurTyp::Laeufer:   return 'L';
    case FigurTyp::Springer:   return 'S';
    default:              return '?';
    }
}

bool zeichenAlsUmwandlung(char zeichen, FigurTyp& typ) {
    switch (zeichen) {
    case 'D': typ = FigurTyp::Dame; return true;
    case 'T': typ = FigurTyp::Turm; return true;
    case 'S': typ = FigurTyp::Springer; return true;
    case 'L': typ = FigurTyp::Laeufer; return true;
    default:  return false;
    }
}