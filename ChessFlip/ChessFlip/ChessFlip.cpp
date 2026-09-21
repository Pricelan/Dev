#include <iostream>
#include "SchachFenster.h"
#include <QApplication>
#include "Spielengine.h"
#include "Spieler.h"
#include "StartMenue.h"
#include <QEventLoop>
#include "../ChessFlipCore/Persistenz/Protokollierer.h"
#include "KiGegner.h"



int main(int argc, char* argv[])
{
    QApplication app(argc, argv);

    while (true) {
        StartMenue menue;
        if (menue.exec() != QDialog::Accepted) {
            return 0;
        }
        std::string name1, name2;
        if (menue.getFortsetzenGewaehlt()) {
            name1 = "Platzhalter 1";
            name2 = "Platzhalter 2";
        }
        else {
            name1 = menue.getSpieler1Name().toStdString();
            name2 = menue.getSpieler2Name().toStdString();
        }
        Spieler spieler1(Figur::Farbe::Weiss, name1);

        Teilnehmer* teilnehmer2 = nullptr;
        KiGegner* kiGegner = nullptr;
        bool erstelleKiGegner = menue.getKiModusGewaehlt() || (menue.getFortsetzenGewaehlt() && Protokollierer::warTeilnehmer2Ki("spielstand.txt"));

        if (erstelleKiGegner) {
            kiGegner = new KiGegner(Figur::Farbe::Schwarz);
            teilnehmer2 = kiGegner;
        }
        else {
            teilnehmer2 = new Spieler(Figur::Farbe::Schwarz, name2);
        }

        Spielengine spielengine(&spieler1, teilnehmer2);

        if (kiGegner != nullptr) {
            kiGegner->setSpielengine(&spielengine);
        }

        if (menue.getFortsetzenGewaehlt()) {
            Protokollierer::laden(spielengine, "spielstand.txt");
        }

        SchachFenster schachfenster(&spielengine, kiGegner);                
        schachfenster.show();

        QEventLoop wartenAufSpielende;
        QObject::connect(&schachfenster, &SchachFenster::spielBeendet, &wartenAufSpielende, &QEventLoop::quit);
        wartenAufSpielende.exec();

        schachfenster.close();
    }

}