#include<stdio.h>
int main() {

	double preis = 1.45;
	double *preisZeiger;

	preisZeiger = &preis;

	printf("%.2f\n", preis);
	printf("%.2f\n", *preisZeiger);
}