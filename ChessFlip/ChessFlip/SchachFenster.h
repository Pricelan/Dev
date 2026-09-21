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
#include "KiGegner.h"

class SchachFenster : public QMainWindow
{
	Q_OBJECT

public:
	SchachFenster(Spielengine* spielengine, KiGegner* kiGegner = nullptr, QWidget *parent = nullptr);
	~SchachFenster();

private:
	Ui::SchachFensterClass ui;
	QPushButton* felder[8][8];
	QPushButton* speichernButton;
	Spielengine* spielengine;
	QString symbolFuerFigur(Figur* figur);
	QLineEdit* eingabefeld;
	void brettAktualisieren();
	QLabel* statusLabel;
	void statusAktualisieren();
	KiGegner* kiGegner;
	void zugVerarbeiten(Position start, Position ziel);

protected:
	void closeEvent(QCloseEvent* event) override;

private slots:
	void zugAnnahmeClicked();
	void speichernClicked();

signals:
	void spielBeendet();

};

