#define CATCH_CONFIG_RUNNER
#include <catch2/catch_session.hpp>
#include <catch2/catch_test_macros.hpp>
#include "Bauer.h"
#include "Springer.h"

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