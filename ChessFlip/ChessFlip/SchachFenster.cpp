#include "SchachFenster.h"
#include <QString>
#include "Figur.h"
#include "Bauer.h"
#include "Turm.h"
#include "Dame.h"
#include "Koenig.h"
#include "Laeufer.h"
#include "Springer.h"
#include "ZugParser.h"
#include <Qlabel>

SchachFenster::SchachFenster(Spielengine* spielengine, QWidget *parent)
	: QMainWindow(parent), spielengine(spielengine)
{
    const Spielfeld* spielfeld = spielengine->getSpielfeld();
	ui.setupUi(this);

    QWidget* zentral = new QWidget(this);
    QVBoxLayout* aussenLayout = new QVBoxLayout(zentral);
    QGridLayout* layout = new QGridLayout();
    
    layout->setSpacing(0);
    layout->setContentsMargins(0, 0, 0, 0);

    for (int i = 1; i < 9; i++) {
            layout->setColumnStretch(i, 1);
            layout->setRowStretch(i, 1);
        }

    for (int reihe = 8; reihe >= 1; reihe--) {
        for (int spalte = 1; spalte < 9; spalte++) {
            bool hell = (reihe + spalte) % 2 == 0;
            QString farbe = hell ? "background-color: #f0d9b5; border-radius: 0px; border: none;font-size: 32px;" : "background-color: #b58863; border-radius: 0px; border: none;font-size : 32px;";
            QPushButton* button = new QPushButton(this);
            button->setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);
            button->setStyleSheet(farbe);
            Figur* figurTyp = spielfeld->getFigur(8 - reihe, spalte - 1);
            button->setText(symbolFuerFigur(figurTyp));
            felder[8 - reihe][spalte - 1] = button;
            layout->addWidget(button, reihe, spalte);
           
        }
    }


    QString buchstaben = "abcdefgh";
    for (int spalte = 0; spalte < 8; spalte++) {
        QLabel* labelOben = new QLabel(QString(buchstaben[spalte]), this);
        labelOben->setAlignment(Qt::AlignCenter);
        layout->addWidget(labelOben, 0, spalte+1);

        QLabel* labelUnten = new QLabel(QString(buchstaben[spalte]), this);
        labelUnten->setAlignment(Qt::AlignCenter);
        layout->addWidget(labelUnten, 9, spalte + 1);

    }

    QString zahlen = "12345678";
    for (int reihe = 0; reihe < 8; reihe++) {
        QLabel* labelLinks = new QLabel(QString(zahlen[7-reihe]), this);
        labelLinks->setAlignment(Qt::AlignCenter);
        layout->addWidget(labelLinks, reihe + 1, 0);

        QLabel* labelRechts = new QLabel(QString(zahlen[7-reihe]), this);
        labelRechts->setAlignment(Qt::AlignCenter);
        layout->addWidget(labelRechts, reihe + 1, 9);

    }

    aussenLayout->addLayout(layout);
    eingabefeld = new QLineEdit(this);
    aussenLayout->addWidget(eingabefeld);
    eingabefeld->setPlaceholderText("Zug eingeben (z.B. e2e4): ");
    eingabefeld->setStyleSheet("font-size: 20px; padding: 8px;");
    connect(eingabefeld, &QLineEdit::returnPressed, this, &SchachFenster::zugAnnahmeClicked);
    setCentralWidget(zentral);
    resize(8 * 60, 8 * 60);
    
}

SchachFenster::~SchachFenster()
{}

QString SchachFenster::symbolFuerFigur(Figur* figur) {
    if (figur == nullptr) return " ";

    bool weiss = (figur->getFarbe() == Figur::Farbe::Weiss);

    if (dynamic_cast<Bauer*>(figur) != nullptr) return weiss ? "♙" : "♟"; 
    if (dynamic_cast<Turm*>(figur) != nullptr) return weiss ? "♖" : "♜"; 
    if (dynamic_cast<Springer*>(figur) != nullptr) return weiss ? "♘" : "♞"; 
    if (dynamic_cast<Laeufer*>(figur) != nullptr) return weiss ? "♗" : "♝"; 
    if (dynamic_cast<Dame*>(figur) != nullptr) return weiss ? "♕" : "♛"; 
    if (dynamic_cast<Koenig*>(figur) != nullptr) return weiss ? "♔" : "♚"; 

    return "";
}

void SchachFenster::zugAnnahmeClicked() {
    QString text = eingabefeld->text();
    std::string eingabe = text.toStdString();
    Position start, ziel;
    if (!parseZugString(eingabe, start, ziel)) {
        return;
    }
    if (!spielengine->pruefeZug(start, ziel)) {
        return;
    }
        spielengine->zugAusfuehren(start, ziel);
        spielengine->naechsteRunde();
        eingabefeld->setText("");
        brettAktualisieren();
}

void SchachFenster::brettAktualisieren() {
    const Spielfeld* spielfeld = spielengine->getSpielfeld();
    for (int reihe = 8; reihe >= 1; reihe--) {
        for (int spalte = 1; spalte < 9; spalte++) {
            Figur* figurTyp = spielfeld->getFigur(8 - reihe, spalte - 1);
            felder[8 - reihe][spalte - 1]->setText(symbolFuerFigur(figurTyp));
        }
    }
}