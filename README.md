# Priceland Digital - Fullstack Online Shop

Dieses Projekt ist ein moderner Webshop für digitale Softwarelizenzen und Games. Es wurde als Fullstack-Anwendung mit einer klaren Trennung zwischen einem leistungsstarken Java-Backend und einem interaktiven Next.js-Frontend entwickelt.

## Kern-Features
* Gast-Checkout-System: Ermöglicht Einkäufe ohne vorherige Registrierung unter Verwendung eines Gast-Token-Verfahrens.
* Warenkorb-Management: Globales State-Management für reibungsloses Hinzufügen und Verwalten von Artikeln.
* Dynamischer Katalog: Filterung nach Kategorien (z. B. COMPUTER_SPIELE) direkt über die API.
* Sicherheit: Implementierte Spring Security für geschützte Endpunkte und Admin-Bereiche.
* Responsive Design: Vollständig optimiert für Mobile und Desktop mit Tailwind CSS.

## Technologien
### Backend
* Sprache/Framework: Java 21 mit Spring Boot
* Datenbank: MySQL (Anbindung über JPA/Hibernate)
* Sicherheit: Spring Security & DTO-Mapping

### Frontend
* Framework: Next.js 16.0.1 (App Router)
* Sprache: TypeScript
* Styling: Tailwind CSS & Framer Motion für Animationen
* State Management: React Context API

## Projektstruktur
Das Repository ist in zwei Hauptbereiche unterteilt:
* /shop-backend: Die Java Spring Boot Anwendung (Business Logik & API).
* /frontend: Die Next.js Webanwendung (User Interface).
* priceland_structur.sql: Das vollständige Datenbank-Schema inklusive Testdaten.

## Installation & Setup

### 1. Datenbank vorbereiten
1. Erstellen Sie eine Datenbank mit dem Namen priceland_digital.
2. Importieren Sie die Datei priceland_structur.sql über Ihren MySQL-Client (z. B. MySQL Workbench).
3. Prüfen Sie die application.yml im Backend auf korrekte MySQL-Zugangsdaten (User/Passwort).

### 2. System starten
Führen Sie nacheinander folgende Befehle in Ihren Terminals aus, um das Backend und das Frontend zu aktivieren:

```bash
# Backend starten (Terminal 1)
cd shop-backend
./mvnw spring-boot:run

# Frontend starten (Terminal 2)
cd frontend
npm install
npm run dev
