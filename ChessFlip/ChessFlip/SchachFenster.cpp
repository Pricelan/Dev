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
#include "../ChessFlipCore/Persistenz/Protokollierer.h"
#include <Qlabel>
#include <QMessageBox>
#include "FigurTyp.h"
#include "KiGegner.h"

SchachFenster::SchachFenster(Spielengine* spielengine, KiGegner* kiGegner, QWidget *parent)
	: QMainWindow(parent), spielengine(spielengine), kiGegner(kiGegner)
{
    const Spielfeld* spielfeld = spielengine->getSpielfeld();
	ui.setupUi(this);

    QWidget* zentral = new QWidget(this);
    QVBoxLayout* aussenLayout = new QVBoxLayout(zentral);
    QGridLayout* layout = new QGridLayout();
    statusLabel = new QLabel(this);
    aussenLayout->addWidget(statusLabel);
    statusAktualisieren();
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
    speichernButton = new QPushButton("Spiel speichern", this);
    aussenLayout->addWidget(speichernButton);
    connect(speichernButton, &QPushButton::clicked, this, &SchachFenster::speichernClicked);
    connect(eingabefeld, &QLineEdit::returnPressed, this, &SchachFenster::zugAnnahmeClicked);

    weiterButton = new QPushButton("Nächster Zug", this);
    aussenLayout->addWidget(weiterButton);
    weiterButton->setVisible(wiederholungsModus);
    connect(weiterButton, &QPushButton::clicked, this, &SchachFenster::weiterClicked);

    zurueckButton = new QPushButton("Zurück zum Menü", this);
    aussenLayout->addWidget(zurueckButton);
    connect(zurueckButton, &QPushButton::clicked, this, &SchachFenster::zurueckClicked);
    setCentralWidget(zentral);
    resize(8 * 60, 8 * 60);

    if (kiGegner != nullptr && spielengine->getAktuellerZug() == kiGegner->getFarbe()) {
        Position kiStart, kiZiel;
        kiGegner->ermittleZug(nullptr, kiStart, kiZiel);
        zugVerarbeiten(kiStart, kiZiel);
    }
    
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
        QMessageBox::warning(this, "Ungültige Eingabe", "Bitte im Format e2e4 eingeben.");
        return;
    }
    zugVerarbeiten(start, ziel);
    
    
}


void SchachFenster::zugVerarbeiten(Position start, Position ziel) {

   
    bool kiZug = (kiGegner != nullptr &&
        spielengine->getAktuellerZug() == kiGegner->getFarbe());

    FigurTyp typ = FigurTyp::Dame;
    bool umgewandelt = false;

   
    if (!kiZug && spielengine->fuehrtZugZurUmwandlung(start, ziel)) {
        umgewandelt = true;

        QMessageBox box;
        box.setText("Bauernumwandlung - wähle eine Figur: ");
        QPushButton* damebutton = box.addButton("♕", QMessageBox::ActionRole);
        QPushButton* turmbutton = box.addButton("♖", QMessageBox::ActionRole);
        QPushButton* laeuferbutton = box.addButton("♝", QMessageBox::ActionRole);
        QPushButton* springerbutton = box.addButton("♞", QMessageBox::ActionRole);
        box.exec();

        if (box.clickedButton() == damebutton) {
            typ = FigurTyp::Dame;
        }
        else if (box.clickedButton() == springerbutton) {
            typ = FigurTyp::Springer;
        }
        else if (box.clickedButton() == laeuferbutton) {
            typ = FigurTyp::Laeufer;
        }
        else if (box.clickedButton() == turmbutton) {
            typ = FigurTyp::Turm;
        }
    }

 
    ZugErgebnis e = spielengine->zugDurchfuehren(start, ziel, typ);
    if (!e.gueltig) {
        QMessageBox::warning(this, "Ungültiger Zug",
            "Der Zug kann nach Fide-Regeln nicht durchgeführt werden");
        return;
    }

    
    std::string text = zugAlsText(start, ziel);
    if (umgewandelt) {
        text += umwandlungAlsZeichen(typ);
    }
    Protokollierer::zugAnhaengen("zugprotokoll.txt", text);

    
    eingabefeld->setText("");
    brettAktualisieren();
    statusAktualisieren();
    if (e.geflippt) {
        QMessageBox::information(this, "Flip!", "Die Seiten wurden getauscht!");
    }
    if (e.schachmatt) {
        QMessageBox::information(this, "Spielende",
            QString::fromStdString(e.gewinner) + " hat gewonnen (Schachmatt)!");
        spielVorbei = true;
        emit spielBeendet();
        return;
    }

    
    if (kiGegner != nullptr && spielengine->getAktuellerZug() == kiGegner->getFarbe()) {
        Position kiStart, kiZiel;
        kiGegner->ermittleZug(nullptr, kiStart, kiZiel);
        zugVerarbeiten(kiStart, kiZiel);
    }
}


void SchachFenster::starteWiederholung(const std::vector<std::string>& zuege) {
    wiederholungsZuege = zuege;
    wiederholungsIndex = 0;
    wiederholungsModus = true;
    eingabefeld->setEnabled(false);
    speichernButton->setEnabled(false);
    weiterButton->setVisible(true);
    brettAktualisieren();
    statusAktualisieren();
}

void SchachFenster::weiterClicked() {
    if (wiederholungsIndex >= wiederholungsZuege.size()) {
        QMessageBox::information(this, "Wiederholung", "Die Partie ist zu Ende.");
        return;
    }
    ZugErgebnis e = spielengine->zugAusText(wiederholungsZuege[wiederholungsIndex]);
    if (!e.gueltig) {
        QMessageBox::warning(this, "Wiederholung", "Ungültiger Zug im Protokoll");
        return;
    }
    wiederholungsIndex++;
    brettAktualisieren();
    statusAktualisieren();
    if (e.schachmatt) {
        QMessageBox::information(this, "Wiederholung",
            QString::fromStdString(e.gewinner) + " gewinnt durch Schachmatt.");
    }
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

void SchachFenster::statusAktualisieren() {
        
    QString farbeText = (spielengine->getAktuellerZug() == Figur::Farbe::Weiss) ? "Weiß" : "Schwarz";
    QString nameText = QString::fromStdString(spielengine->getAktuellerSpieler());
    QString rundeText = QString::number(spielengine->getRundenZaehler());
    QString maxRundenText = QString::number(Spielengine::MAX_RUNDEN);
    statusLabel->setText("Am Zug: " + farbeText + " (" + nameText + ")   Runde " + rundeText + "/" + maxRundenText);
}

void SchachFenster::closeEvent(QCloseEvent* event) {
    if (wiederholungsModus) {                       
        QMainWindow::closeEvent(event);
        return;
    }
    if (spielVorbei) {
        Protokollierer::spielstandLoeschen("spielstand.txt");
    }
    else {
        Protokollierer::speichern(*spielengine, "spielstand.txt");
    }
    QMainWindow::closeEvent(event);
}

void SchachFenster::speichernClicked() {
    Protokollierer::speichern(*spielengine, "spielstand.txt");
    QMessageBox::information(this, "Gespeichert", "Spielstand wurde gespeichert.");
}

void SchachFenster::zurueckClicked() {
    emit spielBeendet();
}