#include <iostream>
#include "SchachFenster.h"
#include <QApplication>
#include "Spielengine.h"
#include "Spieler.h"

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
          
       Spieler spieler1(Figur::Farbe::Weiss, "Andy");
       Spieler spieler2(Figur::Farbe::Schwarz, "Marie");
       Spielengine spielengine(&spieler1, &spieler2);
       SchachFenster schachfenster(&spielengine);
       schachfenster.show();

       return app.exec();
}
