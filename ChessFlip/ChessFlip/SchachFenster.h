#pragma once

#include <QMainWindow>
#include <QGridLayout>
#include <QPushButton>
#include "ui_SchachFenster.h"

class SchachFenster : public QMainWindow
{
	Q_OBJECT

public:
	SchachFenster(QWidget *parent = nullptr);
	~SchachFenster();

private:
	Ui::SchachFensterClass ui;
	QPushButton* felder[8][8];
};

