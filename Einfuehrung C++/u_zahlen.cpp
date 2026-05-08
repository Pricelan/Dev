#include <iostream>
#include <iomanip>
using namespace std;

int main() {



	double zahl, zahl2, zahl3;
	double summe, mittelwert;

	cout << "Geben sie bitte drei Zahlen ein" << endl;
	cout << fixed << setprecision(1);
	cout << "Zahl 1: " << endl;
	cin >> zahl;
	cout << "Ihre erste Zahl: " << zahl << endl;
	cout << "Zahl 2: " << endl;
	cin >> zahl2;
	cout << "Ihre zweite Zahl: " << zahl2 << endl;
	cout << "Zahl 3: " << endl;
	cin >> zahl3;
	cout << "Ihre dritte Zahl: " << zahl3 << endl;

	summe = zahl + zahl2 + zahl3;
	mittelwert = (zahl + zahl2 + zahl3)/3;

	cout << fixed << setprecision(3);
	cout << "Die Summe ist: " << summe << endl;
	cout << "Der Mittelwert ist: " << mittelwert  << endl;

	


}