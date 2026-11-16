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
#include <vector>
#include <string>

class SchachFenster : public QMainWindow
{
	Q_OBJECT

public:
	SchachFenster(Spielengine* spielengine, KiGegner* kiGegner = nullptr, QWidget *parent = nullptr);
	~SchachFenster();
	void starteWiederholung(const std::vector<std::string>& zuege);

private:
	Ui::SchachFensterClass ui;
	QPushButton* felder[8][8];
	QPushButton* speichernButton;
	QPushButton* zurueckButton;
	Spielengine* spielengine;
	QString symbolFuerFigur(Figur* figur);
	QLineEdit* eingabefeld;
	void brettAktualisieren();
	QLabel* statusLabel;
	void statusAktualisieren();
	KiGegner* kiGegner;
	void zugVerarbeiten(Position start, Position ziel);
	bool spielVorbei = false;
	QPushButton* weiterButton;
	std::vector<std::string> wiederholungsZuege;
	size_t wiederholungsIndex = 0;        
	bool wiederholungsModus = false;

protected:
	void closeEvent(QCloseEvent* event) override;

private slots:
	void zugAnnahmeClicked();
	void speichernClicked();
	void zurueckClicked();
	void weiterClicked();

signals:
	void spielBeendet();

};

