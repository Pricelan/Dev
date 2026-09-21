#pragma once
#include "../Backend/Spielengine.h"
#include <string>
#include <vector>

class Protokollierer {

public:
	static void speichern(const Spielengine& engine, const std::string& dateiname);
	static void laden(Spielengine& engine, const std::string& dateiname);
	static bool warTeilnehmer2Ki(const std::string& dateiname);

private:
	static std::string figurTypAlsText(Figur* figur);
	static std::vector<std::string> teileAufteilen(const std::string& zeile);


};