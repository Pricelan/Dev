#include <stdio.h>
int main()
{
	int anzahl, nummer, nochEiner;
	double preis, summeRechnung;

	/*Startwerte*/
	nummer = 0;
	summeRechnung = 0.0;

	/*Abfrage*/
	printf("Wollen Sie Artikel eingeben? (1=ja, 0=nein) ");
	scanf_s("%d", &nochEiner);

	/*Bedingte Wiederholung*/

	while (nochEiner == 1)
	{
		/*Laufende Nummer erhöhen*/

		nummer = nummer + 1;
		/*Eingabe der Artikelinformationen*/

		printf("Artikel %d, Anzahl: ", nummer);
		scanf_s("%d", &anzahl);
		printf("Artikel %d, Preis in Euro: ", nummer);
		scanf_s("%lf", &preis);

		/*Berechnung*/

		summeRechnung = summeRechnung + anzahl * preis;

		/*Abfrage, ob noch ein Artikel eingegeben werden soll*/
		printf("Wollen Sie einen weiteren Artikel eingeben? (1=ja, 0=nein) ");
		scanf_s("%d", &nochEiner);

	}
	/*Ausgabe*/

	if (nummer == 0)
		printf("Keine Eingabe\n");
	else
		printf("Die Summe der Rechnung betraegt: %.2f Euro\n", summeRechnung);

	return 0;
}