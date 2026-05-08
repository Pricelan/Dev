#include <iostream>
#include <iomanip>
#include <ctime>
#include <cstdlib>
using namespace std;

int main() {

	srand(time(0));
	int ergebnis;
	int ergebnisBerechnet;

	while (true) {
		int zahl1 = rand() % (40 - 20 + 1) + 20;
		int zahl2 = rand() % (40 - 20 + 1) + 20;
		cout << "Kopfrechenaufgabe: " << zahl1 << " + " << zahl2 << endl;
		ergebnisBerechnet = zahl1 + zahl2;
		cin >> ergebnis;
		if (ergebnis == 0) {
			cout << "Beende Training..." << endl;
			break;
		}
		cout << "Ihr Ergebnis: " << ergebnis << endl;
		cout << "Ergebnis: " << ergebnisBerechnet << endl;

		cout << "-----------------------" << endl;
		
		if (ergebnis == ergebnisBerechnet) {
			cout << "Richtig! Super." << endl;
		}
		else {
			cout << "Leider falsch. Richtig war: " << ergebnisBerechnet << endl;
		}

		
	}








}