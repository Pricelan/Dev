#define CATCH_CONFIG_RUNNER
#include <catch2/catch_session.hpp>
#include <catch2/catch_test_macros.hpp>
#include "Bauer.h"
#include "Springer.h"
#include "Turm.h"
#include "Laeufer.h"
#include "Dame.h"
#include "Koenig.h"
#include "Spielfeld.h"
#include "FigurTyp.h"
#include "Figur.h"
#include "Spieler.h"
#include "Spielengine.h"
#include "KiGegner.h"
#include "..\ChessFlipCore\Persistenz\Protokollierer.h"
#include <fstream>
#include "ZugParser.h"


int main(int argc, char* argv[]) {
    return Catch::Session().run(argc, argv);
}

TEST_CASE("Testumgebung funktioniert") {
    REQUIRE(1 + 1 == 2);
}

TEST_CASE("Bauer erlaubt einen einfachen Zug nach vorne") {
	Bauer bauer(Figur::Farbe::Weiss, Position(2, 2));
	Position ziel(3, 2);
	REQUIRE(bauer.erlaubterZug(ziel) == true);
}

TEST_CASE("Bauer darf nicht diagonal auf ein leeres Feld ziehen") {
	Spieler spieler1(Figur::Farbe::Weiss, "Test1");
	Spieler spieler2(Figur::Farbe::Schwarz, "Test2");
	Spielengine engine(&spieler1, &spieler2);
	
	REQUIRE(engine.pruefeZug(Position(1, 7), Position(2, 6)) == false);

}

TEST_CASE("Gueltiger Bauernzug wird akzeptiert") {
	Spieler spieler1(Figur::Farbe::Weiss, "Test1");
	Spieler spieler2(Figur::Farbe::Schwarz, "Test2");
	Spielengine engine(&spieler1, &spieler2);

	REQUIRE(engine.pruefeZug(Position(1, 4), Position(3, 4)) == true);

}

TEST_CASE("Springer erlaubt einen L-förmigen Zug") {
	Springer springer(Figur::Farbe::Weiss, Position(1, 2));
	Position ziel(3, 1);
	REQUIRE(springer.erlaubterZug(ziel) == true);
}

TEST_CASE("Turm erlaubt vertikal Zug") {
	Turm turm(Figur::Farbe::Weiss, Position(1, 1));
	Position ziel(2, 1);
	REQUIRE(turm.erlaubterZug(ziel) == true);
}

TEST_CASE("Turm erlaubt keinen diagonalen Zug") {
	Turm turm(Figur::Farbe::Weiss, Position(1, 1));
	Position ziel(2, 2);
	REQUIRE(turm.erlaubterZug(ziel) == false);

}

TEST_CASE("Laeufer erlaubt diagonalen Zug") {
	Laeufer laeufer(Figur::Farbe::Weiss, Position(4, 1));
	Position ziel(5, 2);
	REQUIRE(laeufer.erlaubterZug(ziel) == true);
}

TEST_CASE("Laeufer erlaubt keinen geraden Zug") {
	Laeufer laeufer(Figur::Farbe::Weiss, Position(4, 1));
	Position ziel(4, 5);
	REQUIRE(laeufer.erlaubterZug(ziel) == false);
}


TEST_CASE("Dame erlaubt vertikaler Zug wie ein Turm") {
	Dame dame(Figur::Farbe::Weiss, Position(1, 5));
	Position ziel(2, 5);
	REQUIRE(dame.erlaubterZug(ziel) == true);
}

TEST_CASE("Koenig erlaubt ein vertikaler Zug") {
	Koenig koenig(Figur::Farbe::Schwarz, Position(1, 4));
	Position ziel(2, 4);
	REQUIRE(koenig.erlaubterZug(ziel) == true);
}

TEST_CASE("Ungueltiger Zug durch Blockade") {
	Spieler spieler1(Figur::Farbe::Weiss, "Test1");
	Spieler spieler2(Figur::Farbe::Schwarz, "Test2");
	Spielengine engine(&spieler1, &spieler2);

	REQUIRE(engine.pruefeZug(Position(0, 0), Position(4, 0)) == false);
}

TEST_CASE("Turm steht nach Startaufstellung auf der richtigen Position") {
	Spielfeld spielfeld;
	REQUIRE(dynamic_cast<Turm*>(spielfeld.getFigur(0, 0)) != nullptr);
	REQUIRE(spielfeld.getFigur(0, 0) ->getFarbe() == Figur::Farbe::Weiss);
}

TEST_CASE("Alle Bauern in der weißen Bauernreihe sind tatsächlich weiß") {
	Spielfeld spielfeld;
	for (int spalte = 0; spalte < 8; spalte++) {
		REQUIRE(dynamic_cast<Bauer*>(spielfeld.getFigur(1, spalte)) != nullptr);
		REQUIRE(spielfeld.getFigur(1, spalte)->getFarbe() == Figur::Farbe::Weiss);
	}
}

TEST_CASE("Prüfung auf leere Reihe nach Startaufstellung") {
	Spielfeld spielfeld;
	REQUIRE(spielfeld.istFeldFrei(2, 3));

}

TEST_CASE("Bauer darf nicht drei Felder vorwaerts ziehen") {
	Spieler spieler1(Figur::Farbe::Weiss, "Test1");
	Spieler spieler2(Figur::Farbe::Schwarz, "Test2");
	Spielengine engine(&spieler1, &spieler2);

	REQUIRE(engine.pruefeZug(Position(1, 4), Position(4, 4)) == false);
	
}
TEST_CASE("Rochade wird bei erfuellten Bedingungen durchgefuehrt") {
	Spieler spieler1(Figur::Farbe::Weiss, "Test1");
	Spieler spieler2(Figur::Farbe::Schwarz, "Test2");
	Spielengine engine(&spieler1, &spieler2);

	// Springer g1 und Läufer f1 wegräumen, damit der Weg frei ist
	engine.zugAusfuehren(Position(0, 6), Position(2, 5));// Springer g1 -> f3
	engine.zugAusfuehren(Position(0, 5), Position(2, 7));// Läufer f1 -> h3

	REQUIRE(engine.istRochadeMoeglich(Position(0, 4), Position(0, 6)) == true);
}

TEST_CASE("En Passant wird bei erfuellten Bedingungen durchgefuehrt") {
	Spieler spieler1(Figur::Farbe::Weiss, "Test1");
	Spieler spieler2(Figur::Farbe::Schwarz, "Test2");
	Spielengine engine(&spieler1, &spieler2);

	engine.zugAusfuehren(Position(1, 5), Position(3, 5)); // weißer Bauer f2 -> f4 
	engine.zugAusfuehren(Position(6, 4), Position(4, 4)); // schwarzer Bauer e7 -> e5
	engine.zugAusfuehren(Position(3, 5), Position(4, 5)); // weißer Bauer f4 -> f5
	engine.zugAusfuehren(Position(6, 6), Position(4, 6)); // schwarzer Bauer g7 -> g5

	REQUIRE(engine.istEnPassantMoeglich(Position(4, 5), Position(5, 6)));

}

TEST_CASE("Bauernumwandlung wird durchgefuert") {
	Spieler spieler1(Figur::Farbe::Weiss, "Test1");
	Spieler spieler2(Figur::Farbe::Schwarz, "Test2");
	Spielengine engine(&spieler1, &spieler2);

	engine.zugAusfuehren(Position(1, 5), Position(3, 5));  
	engine.zugAusfuehren(Position(3, 5), Position(4, 5)); 
	engine.zugAusfuehren(Position(4, 5), Position(5, 5));
	engine.zugAusfuehren(Position(5, 5), Position(6, 5));
	engine.zugAusfuehren(Position(6, 5), Position(7, 5));

	REQUIRE(engine.istBauernumwandlungFaellig(Position(7, 5)) == true);
}


TEST_CASE("Narrenmatt fuehrt zu Schachmatt") {
	Spieler spieler1(Figur::Farbe::Weiss, "Test1");
	Spieler spieler2(Figur::Farbe::Schwarz, "Test2");
	Spielengine engine(&spieler1, &spieler2);

	engine.zugAusfuehren(Position(1, 5), Position(2, 5));
	engine.naechsteRunde();
	engine.zugAusfuehren(Position(6, 4), Position(4, 4));
	engine.naechsteRunde();
	engine.zugAusfuehren(Position(1, 6), Position(3, 6));
	engine.naechsteRunde();
	engine.zugAusfuehren(Position(7, 3), Position(3, 7));
	engine.naechsteRunde();


	REQUIRE(engine.istSchachmatt(Figur::Farbe::Weiss) == true);

}

TEST_CASE("Flip nach 8 Runden ohne Schach") {
	Spieler spieler1(Figur::Farbe::Weiss, "Test1");
	Spieler spieler2(Figur::Farbe::Schwarz, "Test2");
	Spielengine engine(&spieler1, &spieler2);

	bool geflippt = false;
	for (int i = 0; i < 16; i++) {
		geflippt = engine.naechsteRunde();
	}

	REQUIRE(geflippt == true);
}

TEST_CASE("Flip nach 8 Runden im Schach stehend") {
	Spieler spieler1(Figur::Farbe::Weiss, "Test1");
	Spieler spieler2(Figur::Farbe::Schwarz, "Test2");
	Spielengine engine(&spieler1, &spieler2);

	bool geflippt = false;
	for (int i = 0; i < 16; i++) {
		geflippt = engine.naechsteRunde();
	}

	engine.zugAusfuehren(Position(1, 5), Position(2, 5));
	engine.zugAusfuehren(Position(6, 4), Position(4, 4));
	engine.zugAusfuehren(Position(1, 6), Position(3, 6));
	engine.zugAusfuehren(Position(7, 3), Position(3, 7));

	bool geflippt1 = engine.naechsteRunde();
	bool geflippt2 = engine.naechsteRunde();

	REQUIRE(geflippt2 == false);
}

TEST_CASE("KI liefert einen gueltigen Zug") {
	Spieler spieler1(Figur::Farbe::Weiss, "Test1");
	KiGegner ki(Figur::Farbe::Schwarz);
	Spielengine engine(&spieler1, &ki);
	ki.setSpielengine(&engine);

	engine.zugAusfuehren(Position(1, 4), Position(3, 4));// weißer Zug, damit Schwarz am Zug ist
	engine.naechsteRunde();

	Position start, ziel;
	ki.ermittleZug(nullptr, start, ziel);

	REQUIRE(engine.pruefeZug(start, ziel) == true);


}

TEST_CASE("Zug wird im gespeicherten Boardzustand korrekt abgebildet") {
	Spieler spieler1(Figur::Farbe::Weiss, "Test1");
	Spieler spieler2(Figur::Farbe::Schwarz, "Test2");
	Spielengine engine(&spieler1, &spieler2);

	engine.zugAusfuehren(Position(1, 4), Position(3, 4)); // e2e4

	Protokollierer::speichern(engine, "test_protokoll.txt");

	std::ifstream datei("test_protokoll.txt");
	std::string zeile;
	bool gefunden = false;
	while (std::getline(datei, zeile)) {
		if (zeile == "Figur;Weiss;Bauer;3;4") {
			gefunden = true;
		}
	}

	REQUIRE(gefunden == true);
}

TEST_CASE("Ungueltige Eingabe wird abgelehnt") {
	Position start, ziel;

	REQUIRE(parseZugString("ysda123", start, ziel) == false);
	REQUIRE(parseZugString("i9i9", start, ziel) == false); // Spalte 'i' existiert nicht (nur a-h)
}