#include <iostream>
using namespace std;

int main() {

	int tag, monat, jahr;
	int maxTage = 0;
	
	cout << "Tag: " << endl;
	cin >> tag;

	cout << "Monat: " << endl;
	cin >> monat;

	cout << "Jahr: " << endl;
	cin >> jahr;

	

	switch (monat){
		case 1: case 3: case 5: case 7: case 8: case 10: case 12:
			maxTage = 31;
			break;
		case 2:
			maxTage = 28;
			break;
		case 4: case 6: case 9: case 11:
			maxTage = 30;
			break;
		default:
			maxTage = -1;
			break;
}

	if (maxTage == -1) {
		cout << "Fehler: Ungueltiger Monat" << endl;
	}
	else if (tag < 1 || tag > maxTage) {
		cout << "Fehler: Das Datum ist falsch! Der Monat " << monat << " hat nur " << maxTage << " Tage. " << endl;

	}
	else {
		cout << "Das Datum " << tag << "." << monat << "." << jahr << ". ist korrekt." << endl;

	}
	
	if (jahr % 4 ==0 && jahr % 100 !=0 && jahr % 400 ==0) {
		cout << "Schaltjahr" << jahr << endl;
	}

	return 0;
}