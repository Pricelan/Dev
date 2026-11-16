#pragma once
#include "Position.h"
#include <string>
#include "FigurTyp.h"

bool parseZugString(const std::string& eingabe, Position& start, Position& ziel);

std::string zugAlsText(Position start, Position ziel);
char umwandlungAlsZeichen(FigurTyp typ);
bool zeichenAlsUmwandlung(char zeichen, FigurTyp& typ);