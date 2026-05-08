#include <stdio.h>
int main()
{
	int anzahlApfel = 12, anzahlRadio = 2;
	double preisApfel = 1.45, preisRadio = 109.95;

	/*Asugabe für Tabellenvon ganzen Zahlen.
	teilweise mit führenden Nullen*/

	printf("anzahl\n");
	printf("%6d\n", anzahlApfel);
	printf("%06d\n", anzahlRadio);

	/*Ausgabe für Tabelle von Zahlen mit Nachkommastelle*/

	printf("\n  Preis\n");
	printf("%8.2f Euro\n", preisApfel);
	printf("%8.2f Euro\n", preisRadio);

	return 0;

}
		