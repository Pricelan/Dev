#include <iostream>
#include <ctime>
#include <cstdlib>

using namespace std;

int main() {
    srand(time(0));

    int punkte = 0;      // Zähler außerhalb der Schleife
    int aufgaben = 0;    // Optionale Statistik
    bool userWahl;

    cout << "=== KOPFRECHEN-CHALLENGE ===" << endl;
    cout << "(Druecke 1 fuer WAHR oder 0 fuer FALSCH)" << endl << endl;

    while (true) {
        int zahl1 = rand() % 21 + 20;
        int zahl2 = rand() % 21 + 20;
        int echtesErgebnis = zahl1 + zahl2;
        int anzeigeErgebnis;

        // Zufall: In 50% der Fälle schwindeln
        bool luege = rand() % 2;
        if (luege) {
            anzeigeErgebnis = echtesErgebnis + (rand() % 10 - 5);
            if (anzeigeErgebnis == echtesErgebnis) anzeigeErgebnis++; // Sichergehen, dass es falsch ist
        }
        else {
            anzeigeErgebnis = echtesErgebnis;
        }

        cout << "Aufgabe: " << zahl1 << " + " << zahl2 << " = " << anzeigeErgebnis << "?" << endl;
        cout << "Deine Wahl: ";
        cin >> userWahl;

        // Logik-Check
        bool istWirklichRichtig = (anzeigeErgebnis == echtesErgebnis);

        if (userWahl == istWirklichRichtig) {
            punkte++;
            cout << "Richtig! +1 Punkt." << endl;
        }
        else {
            cout << "Falsch! Das richtige Ergebnis war: " << echtesErgebnis << endl;
            // Optional: Punktabzug bei Fehler? punkte--;
        }

        aufgaben++;
        cout << "Aktueller Punktestand: " << punkte << " von " << aufgaben << endl;
        cout << "-----------------------------------" << endl;

        // Kleiner Tipp: Baue eine Abbruch-Bedingung ein, falls du mal aufhören willst
    }

    return 0;
}





