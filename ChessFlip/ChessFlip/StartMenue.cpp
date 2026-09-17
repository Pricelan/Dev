#include "StartMenue.h"
#include <QLineEdit>
#include <QString>
#include <QVBoxLayout>
#include <QPushButton>
#include <QMessageBox>
#include <QLabel>
#include <QPainter>
#include <fstream>

StartMenue::StartMenue(QWidget *parent)
	: QDialog(parent)
{
	ui.setupUi(this);
	QVBoxLayout* layout = new QVBoxLayout(this);
	layout->setContentsMargins(10, 5, 10, 5);
	QLabel* titel = new QLabel("ChessFlip – Startmenü", this);
	titel->setStyleSheet("font-size: 20px; font-weight: bold;");
	titel->setAlignment(Qt::AlignCenter);
	layout->addWidget(titel);
	spieler1 = new QLineEdit(this);
	spieler2 = new QLineEdit(this);
	layout->addWidget(spieler1); 
	layout->addWidget(spieler2);
	spieler1->setPlaceholderText("Name Spieler1 (Weiß)");
	spieler2->setPlaceholderText("Name Spieler2 (Schwarz)");
	spieler1->setVisible(false);
	spieler2->setVisible(false);
	std::ifstream test("spielstand.txt");
	bool dateiExistiert = test.good();
	fortsetzenButton = new QPushButton("Spiel fortsetzen", this);
	layout->addWidget(fortsetzenButton);
	fortsetzenButton->setVisible(dateiExistiert);
	connect(fortsetzenButton, &QPushButton::clicked, this, &StartMenue::fortsetzenClicked);
	vsModus = new QPushButton("VS-Modus starten", this);
	layout->addWidget(vsModus);
	connect(vsModus, &QPushButton::clicked, this, &StartMenue::vsModusClicked);
	kiMode = new QPushButton("KI-Modus starten", this);
	layout->addWidget(kiMode);
	connect(kiMode, &QPushButton::clicked, this, &StartMenue::kiModusClicked);
	start = new QPushButton("Los geht's", this);
	layout->addWidget(start);
	start->setVisible(false);
	connect(start, &QPushButton::clicked, this, &QDialog::accept);

	layout->addStretch();
}


QString StartMenue::getSpieler1Name() const {
	return spieler1->text();
}

QString StartMenue::getSpieler2Name() const {
	return spieler2->text();
}

void StartMenue::vsModusClicked() {
	spieler1->setVisible(true);
	spieler2->setVisible(true);
	start->setVisible(true);
}

void StartMenue::kiModusClicked() {
	QMessageBox::information(this,"Hinweis", "In Entwicklung");
}

void StartMenue::fortsetzenClicked() {
	fortsetzenGewaehlt = true;
	accept();
}

bool StartMenue::getFortsetzenGewaehlt() const {
	return fortsetzenGewaehlt;
}

void StartMenue::paintEvent(QPaintEvent* event) {
	QPainter painter(this);
	int groesse = 20;
	int startX = 220;
	int startY = 200;
	for (int reihe = 0; reihe < 8; reihe++) {
		for (int spalte = 0; spalte < 8; spalte++) {
			bool hell = (reihe + spalte) % 2 == 0;
			painter.fillRect(startX + spalte * groesse,startY + reihe * groesse, groesse, groesse, hell ? QColor("#f0d9b5") : QColor("#b58863"));
		}
	}
}

StartMenue::~StartMenue()
{}

