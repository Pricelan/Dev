#include <stdio.h>

void uebersichtTabelle()
{
	
	double preisApfel = 1.45;
	double preisBirne = 0.85;
	double preisBanane = 0.75;

	printf("Anzahl\tPreis gesamt\n");

	for (int anzahl = 1; anzahl <= 5; anzahl++)
	{
		printf("%d\t%.2f Euro\n", anzahl, anzahl * preisApfel);
	}
	printf("\nAnzahl\tPreis gesamt\n");

	for (int anzahl = 1; anzahl <= 5; anzahl++)
	{
		printf("%d\t%.2f Euro\n", anzahl,anzahl * preisBirne);
	}
	printf("\nAnzahl\tPreis gesamt\n");
	for (int anzahl = 1; anzahl <= 5; anzahl++)
	{
		printf("%d\t%.2f Euro\n", anzahl, anzahl * preisBanane);
	}	

}

double berechneMittelwert(double preisA, double preisB){
	return (preisA + preisB) / 2.0;
}

	
int main()
{
	uebersichtTabelle();
	
	printf("\n");

	double mittelwert1 = berechneMittelwert(1.45, 0.85); //Apfel Birne
	double mittelwert2 = berechneMittelwert(0.85, 0.75); //Birne Banane
	double mittelwert3 = berechneMittelwert(1.45, 0.75); //Apfel Banane

	printf("Mittelwert Apfel und Birne: %.2f\n", mittelwert1);
	printf("Mittelwert Birne und Banane: %.2f\n", mittelwert2);
	printf("Mittelwert Apfel und Banane: %.2f\n", mittelwert3);
	return 0;
}