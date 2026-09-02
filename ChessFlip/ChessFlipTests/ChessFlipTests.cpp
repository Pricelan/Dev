#define CATCH_CONFIG_RUNNER
#include <catch2/catch_session.hpp>
#include <catch2/catch_test_macros.hpp>
#include "Bauer.h"
#include "Springer.h"
#include "Turm.h"
#include "Laeufer.h"
#include "Dame.h"
#include "Koenig.h"

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

TEST_CASE("Laeufer erlaubt diagonalen Zug") {
	Laeufer laeufer(Figur::Farbe::Weiss, Position(4, 1));
	Position ziel(5, 2);
	REQUIRE(laeufer.erlaubterZug(ziel) == true);
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
