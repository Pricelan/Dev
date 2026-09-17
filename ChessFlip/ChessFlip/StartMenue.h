#pragma once

#include <QDialog>
#include "ui_StartMenue.h"
#include <QPushButton>
#include <QLineEdit>
#include <QString>
#include <QPaintEvent>

class StartMenue : public QDialog
{
	Q_OBJECT

public:
	StartMenue(QWidget *parent = nullptr);
	~StartMenue();
	QString getSpieler1Name() const;
	QString getSpieler2Name() const;
	bool getFortsetzenGewaehlt() const;


private:
	Ui::StartMenueClass ui;
	QLineEdit* spieler1;
	QLineEdit* spieler2;
	QPushButton* vsModus;
	QPushButton* kiMode;
	QPushButton* start;
	QPushButton* fortsetzenButton;
	bool fortsetzenGewaehlt = false;

protected:
	void paintEvent(QPaintEvent* event) override;

private slots:

	void vsModusClicked();
	void kiModusClicked();
	void fortsetzenClicked();
	
};

