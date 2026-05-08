#include <stdio.h>
int main() {

	int anzahl, nummer, nochEiner;
	double preis, summeRechnung;

	/*Startwert*/

	nummer = 1;
	summeRechnung = 0.0;

	/*Bedingte Wiederholung*/

	do {

		/*Eingabe*/

		printf("Artikel %d, Anzahl:", nummer);
		scanf_s("%d", &anzahl);
		printf("Artikel %d, Preis in Euro: ", nummer);
		scanf_s("%lf", &preis);

		/*Berechnung*/

		summeRechnung = summeRechnung + anzahl * preis;

		/*Abfrage*/

		printf("Noch ein Artikel (Ja=1, Nein=0): ");
		scanf_s("%d", &nochEiner);


		/*Laufende Nummer erhöhen*/

		nummer = nummer + 1;

	} while (nochEiner == 1);

	/*Ausgabe*/

	printf("Summe der Rechnung: %.2f Euro\n", summeRechnung);

		return 0;

}
