
#include "Spielfeld.h"
#include <iostream>
#include "SchachFenster.h"
#include <QApplication>


int main(int argc, char *argv[])
{
    QApplication app(argc, argv);

       Spielfeld spielfeld;
       SchachFenster schachfenster;
       schachfenster.show();

       return app.exec();
}
