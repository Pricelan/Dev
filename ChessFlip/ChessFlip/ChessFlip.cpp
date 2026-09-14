#include <iostream>
#include "SchachFenster.h"
#include <QApplication>
#include "Spielengine.h"
#include "Spieler.h"
#include "StartMenue.h"


int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
       
       StartMenue menue;
       if (menue.exec() != QDialog::Accepted) {
           return 0;
       }
       std::string name1 = menue.getSpieler1Name().toStdString();
       std::string name2 = menue.getSpieler2Name().toStdString();
       Spieler spieler1(Figur::Farbe::Weiss, name1);
       Spieler spieler2(Figur::Farbe::Schwarz, name2);
       Spielengine spielengine(&spieler1, &spieler2);
       SchachFenster schachfenster(&spielengine);
       schachfenster.show();

       return app.exec();
}
