#include <stdio.h>
int main()
{
	int anzahl;
	double preis, summeRechnung;

	
	do {
		printf("Geben sie eine Anzahl ein: ");
		if (scanf_s("%d", &anzahl) != 1) {
			anzahl = 0;
			while (getchar() != '\n'); // Eingabepuffer leeren
		}

		printf("Geben sie einen Preis ein: ");
		if (scanf_s("%lf", &preis) != 1) {
			preis = 0.0;
			while (getchar() != '\n'); // Eingabepuffer leeren
		}

		if (anzahl <= 0) {
			printf("die Anzahl muss groeßer als 0 sein\n");
		}

		if (preis >= 10) {
			printf("der Preis muss kleiner als 10 sein\n");
		}

		summeRechnung = anzahl * preis;

	} while (anzahl <= 0 || preis >= 10);

	printf("Die Summe der Rechnung betraegt: %.2lf", summeRechnung);

	return 0;
}
