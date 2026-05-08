#include <stdio.h>
int main()
{
	int anzahl[5];
	double preis[5];
	char bezeichnung[5][30];
	int anzahlPosten;
	double summe = 0.0;


	do {
		printf("Rechnungsposten (min 1., max. 5): ");
		if (scanf_s("%d", &anzahlPosten) != 1)
		{
			printf("Ungültige Eingabe für Anzahl der Posten. Bitte geben Sie eine ganze Zahl ein.\n");
			return 1; // Beendet das Programm mit einem Fehlercode
		}
		if (anzahlPosten < 1 || anzahlPosten > 5)
		{
			printf("Die Anzahl der Posten muss zwischen 1 und 5 liegen. Bitte versuchen Sie es erneut.\n");
		}

	} while (anzahlPosten < 1 || anzahlPosten > 5);

	for (int i = 0; i < anzahlPosten; i++)

	{
	

		while (1) {
			printf("Artikel %d, Anzahl: ", i + 1);
			if (scanf_s("%d", &anzahl[i]) == 1 && anzahl[i] > 0) {
				while (getchar() != '\n');
				break; // Eingabe korrekt! Schleife verlassen.
			}
			else {
				printf("Ungueltige Anzahl! Bitte eine Zahl > 0 eingeben.\n");
				while (getchar() != '\n'); // Puffer sauber machen
			}
		}

		
		while (1) {
			printf("Artikel %d, Bezeichnung: ", i + 1);
			if (scanf_s(" %[^\n]s", bezeichnung[i], (unsigned)sizeof(bezeichnung[i])) == 1) {
				while (getchar() != '\n');
				break; // Eingabe korrekt! Schleife verlassen.
			}
			else {
				printf("Ungueltige Bezeichnung!\n");
				while (getchar() != '\n'); // Puffer sauber machen
			}
		}

		while (1) {
			printf("Artikel %d, Preis: ", i + 1);
			if (scanf_s("%lf", &preis[i]) == 1 && preis[i] >= 0) {
				while (getchar() != '\n');
				break; // Eingabe korrekt! Schleife verlassen.
			}
			else {
				printf("Ungueltiger Preis!\n");
				while (getchar() != '\n'); // Puffer sauber machen
			}

		}

	}

				printf("%-6s %-10s %-25s %-15s %-20s\n", "Nr.", "Anzahl", "Bezeichnung", "Preis/E", "Gesamt");
			for (int i = 0; i < anzahlPosten; i++) {
				printf("%-6d %-10d %-20s %10.2lf Euro %10.2lf Euro\n",
			i + 1, anzahl[i], bezeichnung[i], preis[i], anzahl[i] * preis[i]);
	}

				printf("Summe der Rechnung: %8.2lf Euro\n", summe);
			return 0;
		}
