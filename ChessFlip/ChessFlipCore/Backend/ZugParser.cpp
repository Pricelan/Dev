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