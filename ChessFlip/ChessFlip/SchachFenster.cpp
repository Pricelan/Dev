#include "SchachFenster.h"
#include <QString>
SchachFenster::SchachFenster(QWidget *parent)
	: QMainWindow(parent)
{
	ui.setupUi(this);

    QWidget* zentral = new QWidget(this);
    QGridLayout* layout = new QGridLayout(zentral);
    
    layout->setSpacing(0);
    layout->setContentsMargins(0, 0, 0, 0);

    for (int reihe = 0; reihe < 8; reihe++) {
        for (int spalte = 0; spalte < 8; spalte++) {
            bool hell = (reihe + spalte) % 2 == 0;
            QString farbe = hell ? "background-color: #f0d9b5; border-radius: 0px; border: none;" : "background-color: #b58863; border-radius: 0px; border: none;";
            QPushButton* button = new QPushButton(this);
            button->setFixedSize(60, 60);
            button->setStyleSheet(farbe);
            felder[reihe][spalte] = button;
            layout->addWidget(button, reihe, spalte);
        }
    }

    setCentralWidget(zentral);
    resize(8 * 60, 8 * 60);
}

SchachFenster::~SchachFenster()
{}

