#include <iostream>
using namespace std;

int main() {

    double zahl1, zahl2;

    cout << "Geben Sie die erste Zahl ein: ";
    cin >> zahl1;

    cout << "Geben Sie die zweite Zahl ein: ";
    cin >> zahl2;

    cout << "--- Absteigend sortiert ---" << endl;

    if (zahl1 >= zahl2) {
        // Fall 1: zahl1 ist größer oder beide sind gleich
        cout << zahl1 << endl << zahl2 << endl;
    }
    else {
        // Fall 2: zahl2 muss größer sein
        cout << zahl2 << endl << zahl1 << endl;
    }

    return 0;
}