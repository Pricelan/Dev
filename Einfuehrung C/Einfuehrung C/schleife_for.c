#include <stdio.h>

int main() {

	int anzahl, nummer;
	double preis, summeRechnung;

	/*Startwert*/

	summeRechnung = 0.0;

	/*Regelm‰ﬂige Wiederholung*/

	for (nummer = 1; nummer < 4; nummer = nummer + 1) {
		printf("Artikel %d, Anzahl:", nummer);
		scanf_s("%d", &anzahl);
		printf("Artikel %d, Preis in Euro: ", nummer);
		scanf_s("%lf", &preis);

		/*Berechnung*/
		summeRechnung = summeRechnung + anzahl * preis;
	}
	/*Ausgabe*/
	printf("Summe der Rechnung: %.2f Euro\n", summeRechnung);

	return 0;

}