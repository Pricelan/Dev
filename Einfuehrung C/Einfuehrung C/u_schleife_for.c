#include <stdio.h>
int main()
{

	int anzahlArtikel;
	double preisArtikel;

	
	preisArtikel = 1.45;
	printf("%-10s  %11s\n", "Anzahl", "Preis");
	

	for (anzahlArtikel = 1; anzahlArtikel < 11; anzahlArtikel++)
	{
		
		printf("%6d\t%10.2f Euro\n", anzahlArtikel, preisArtikel*anzahlArtikel);
		
	}


}