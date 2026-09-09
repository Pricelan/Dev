#pragma once

#include <QMainWindow>
#include <QGridLayout>
#include <QPushButton>
#include "ui_SchachFenster.h"
#include "Spielfeld.h"
#include <QString>
#include "Figur.h"
#include <QLineEdit>
#include <QVBoxLayout>
#include "Spielengine.h"

class SchachFenster : public QMainWindow
{
	Q_OBJECT

public:
	SchachFenster(Spielengine* spielengine, QWidget *parent = nullptr);
	~SchachFenster();

private:
	Ui::SchachFensterClass ui;
	QPushButton* felder[8][8];
	Spielengine* spielengine;
	QString symbolFuerFigur(Figur* figur);
	QLineEdit* eingabefeld;

private slots:
	void zugAnnahmeClicked();

};

