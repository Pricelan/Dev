-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: priceland
-- ------------------------------------------------------
-- Server version	9.5.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '3b31c4bf-df67-11f0-ad09-c0470e681dd9:1-949';

--
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrator` (
  `admin_id` bigint NOT NULL AUTO_INCREMENT,
  `passwort` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `UKesogmqxeek1uwdyhxvubme3qf` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` VALUES (1,'$2a$10$4DkKWgzLFv1MWjFkdCmAWuz3xqgCJHSUtUWkjGK33QeCMdWxFbSBe','admin');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bestellpositionen`
--

DROP TABLE IF EXISTS `bestellpositionen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bestellpositionen` (
  `bestellposition_id` bigint NOT NULL AUTO_INCREMENT,
  `einzelpreis` decimal(38,2) DEFAULT NULL,
  `menge` int NOT NULL,
  `bestell_id` bigint DEFAULT NULL,
  `software_id` bigint NOT NULL,
  PRIMARY KEY (`bestellposition_id`),
  KEY `FKeevu4g6vaysa24im9eylrcdo1` (`bestell_id`),
  KEY `FKrg1kxdlqfy6xcce74hy83fpc1` (`software_id`),
  CONSTRAINT `FKeevu4g6vaysa24im9eylrcdo1` FOREIGN KEY (`bestell_id`) REFERENCES `bestellungen` (`bestell_id`),
  CONSTRAINT `FKrg1kxdlqfy6xcce74hy83fpc1` FOREIGN KEY (`software_id`) REFERENCES `software` (`software_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bestellpositionen`
--

LOCK TABLES `bestellpositionen` WRITE;
/*!40000 ALTER TABLE `bestellpositionen` DISABLE KEYS */;
INSERT INTO `bestellpositionen` VALUES (1,139.99,1,1,3),(2,39.99,1,1,5),(3,1199.00,1,2,1),(4,139.99,1,3,3);
/*!40000 ALTER TABLE `bestellpositionen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bestellungen`
--

DROP TABLE IF EXISTS `bestellungen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bestellungen` (
  `bestell_id` bigint NOT NULL AUTO_INCREMENT,
  `erstellt_am` datetime(6) DEFAULT NULL,
  `gesamtpreis` decimal(38,2) DEFAULT NULL,
  `status` enum('ABGESCHLOSSEN','BEZAHLT','IN_BEARBEITUNG','VERSANDT') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gast_id` bigint DEFAULT NULL,
  `kunde_id` bigint DEFAULT NULL,
  `zahlungs_id` bigint DEFAULT NULL,
  `zahlung_id` bigint DEFAULT NULL,
  PRIMARY KEY (`bestell_id`),
  UNIQUE KEY `UK9f2atiejxr0ic8yfd42640nsi` (`zahlungs_id`),
  UNIQUE KEY `UKqvcf3p55t92ik2c1ltro2e6i1` (`zahlung_id`),
  KEY `FKg1a0b94gdfv6jl2d9qquj2x9o` (`gast_id`),
  KEY `FK1tblep6o4gnx8uwsucc4i1ho` (`kunde_id`),
  CONSTRAINT `FK1tblep6o4gnx8uwsucc4i1ho` FOREIGN KEY (`kunde_id`) REFERENCES `kunden` (`kunde_id`),
  CONSTRAINT `FK83468pv194eaurunahv60ijm3` FOREIGN KEY (`zahlungs_id`) REFERENCES `zahlungen` (`zahlung_id`),
  CONSTRAINT `FKbx7l70kriw87kshgqsn69teor` FOREIGN KEY (`zahlung_id`) REFERENCES `zahlungen` (`zahlung_id`),
  CONSTRAINT `FKg1a0b94gdfv6jl2d9qquj2x9o` FOREIGN KEY (`gast_id`) REFERENCES `gast` (`gast_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bestellungen`
--

LOCK TABLES `bestellungen` WRITE;
/*!40000 ALTER TABLE `bestellungen` DISABLE KEYS */;
INSERT INTO `bestellungen` VALUES (1,'2026-01-16 21:24:36.162389',179.98,'BEZAHLT',NULL,1,NULL,3),(2,'2026-01-16 22:51:19.530745',1199.00,'BEZAHLT',NULL,1,NULL,15),(3,'2026-01-18 17:53:32.309244',139.99,'BEZAHLT',NULL,1,NULL,16);
/*!40000 ALTER TABLE `bestellungen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `download`
--

DROP TABLE IF EXISTS `download`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `download` (
  `dowload_id` bigint NOT NULL AUTO_INCREMENT,
  `kunde_id` bigint NOT NULL,
  `software_id` bigint NOT NULL,
  `zeitpunkt` datetime(6) DEFAULT NULL,
  `download_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip_adresse` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lizenz_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`dowload_id`),
  KEY `FKbvg2vgjehdnxvmikl7lydq36b` (`software_id`),
  KEY `FK7cvhdhhl2yyg7d3wffqp6eev7` (`kunde_id`),
  CONSTRAINT `FK7cvhdhhl2yyg7d3wffqp6eev7` FOREIGN KEY (`kunde_id`) REFERENCES `kunden` (`kunde_id`),
  CONSTRAINT `FKbvg2vgjehdnxvmikl7lydq36b` FOREIGN KEY (`software_id`) REFERENCES `software` (`software_id`),
  CONSTRAINT `FKoqd8icbeo7t3hgqtfsrbyr8v1` FOREIGN KEY (`kunde_id`) REFERENCES `kunde` (`kunde_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `download`
--

LOCK TABLES `download` WRITE;
/*!40000 ALTER TABLE `download` DISABLE KEYS */;
/*!40000 ALTER TABLE `download` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gast`
--

DROP TABLE IF EXISTS `gast`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gast` (
  `gast_id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `erstellt_am` datetime(6) DEFAULT NULL,
  `hausnummer` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nachname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ort` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `plz` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rolle` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `strasse` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefonnummer` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vorname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`gast_id`),
  UNIQUE KEY `UKed0fpilwkedkr3tt605ffgesj` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gast`
--

LOCK TABLES `gast` WRITE;
/*!40000 ALTER TABLE `gast` DISABLE KEYS */;
/*!40000 ALTER TABLE `gast` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kunden`
--

DROP TABLE IF EXISTS `kunden`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kunden` (
  `kunde_id` bigint NOT NULL AUTO_INCREMENT,
  `aktiviert` bit(1) NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hausnummer` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nachname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ort` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `passwort` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `plz` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `registrierungsdatum` datetime(6) DEFAULT NULL,
  `rolle` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `strasse` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefonnummer` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vorname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`kunde_id`),
  UNIQUE KEY `UKh404f7i3wdul8w6gpcck2vcb1` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kunden`
--

LOCK TABLES `kunden` WRITE;
/*!40000 ALTER TABLE `kunden` DISABLE KEYS */;
INSERT INTO `kunden` VALUES (1,_binary '','kn@gmx.de','2','Niebauer','Eschweiler','$2a$10$WOiwRQyuWmu2FhFPMJ9lHubPYxiLsseJTtQ//B89cLe9YD9umjP1O','52249','2026-01-16 21:14:41.689559','KUNDE','Kinostrasse',NULL,'Kurt');
/*!40000 ALTER TABLE `kunden` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `software`
--

DROP TABLE IF EXISTS `software`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `software` (
  `preis` decimal(38,2) NOT NULL,
  `hersteller_id` bigint NOT NULL,
  `software_id` bigint NOT NULL AUTO_INCREMENT,
  `software_typ` varchar(31) COLLATE utf8mb4_unicode_ci NOT NULL,
  `aktivierungs_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alters_einstufung` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `download_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `genre` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `plattform` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quelle` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `version` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kategorie_liste` enum('FREEWARE','GAMES','SOFTWARE') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `software_beschreibung` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`software_id`),
  KEY `FKcamvj06n38mltrp022xxqk31k` (`hersteller_id`),
  CONSTRAINT `FKcamvj06n38mltrp022xxqk31k` FOREIGN KEY (`hersteller_id`) REFERENCES `softwarehersteller` (`hersteller_id`),
  CONSTRAINT `software_chk_1` CHECK ((`software_typ` in (_utf8mb4'COMPUTER_SPIEL',_utf8mb4'LIZENZ_SOFTWARE',_utf8mb4'SOFTWARE_KOSTENLOS')))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `software`
--

LOCK TABLES `software` WRITE;
/*!40000 ALTER TABLE `software` DISABLE KEYS */;
INSERT INTO `software` VALUES (1199.00,6,1,'LIZENZ_SOFTWARE',NULL,NULL,'',NULL,'SAP',NULL,NULL,'Hana','SOFTWARE','Enterprise-Resource-Planning (ERP) Software'),(139.99,7,3,'LIZENZ_SOFTWARE',NULL,NULL,'',NULL,'Microsoft Office 2024',NULL,NULL,'Professional','SOFTWARE',''),(0.00,1,4,'SOFTWARE_KOSTENLOS',NULL,NULL,'',NULL,'VLC Player',NULL,NULL,'12.1','FREEWARE',''),(39.99,4,5,'COMPUTER_SPIEL',NULL,NULL,'',NULL,'EA FC 2026',NULL,NULL,'2026','GAMES','');
/*!40000 ALTER TABLE `software` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `softwarehersteller`
--

DROP TABLE IF EXISTS `softwarehersteller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `softwarehersteller` (
  `hersteller_id` bigint NOT NULL AUTO_INCREMENT,
  `adresse` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `webseite` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`hersteller_id`),
  UNIQUE KEY `UK6uspeo4vh2vvoqfttk7k6g249` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `softwarehersteller`
--

LOCK TABLES `softwarehersteller` WRITE;
/*!40000 ALTER TABLE `softwarehersteller` DISABLE KEYS */;
INSERT INTO `softwarehersteller` VALUES (1,'Teststraße 1, 12345 Teststadt','support@testfactory.de','Test Factory GmbH','https://www.testfactory.de'),(2,'24-26 Universitatii St., Cluj-Napoca, Romania','sales@bitdefender.com','Bitdefender','https://www.bitdefender.com'),(3,'622 Broadway, New York, NY 10012','contact@rockstargames.com','Rockstar Games','https://www.rockstargames.com'),(4,'209 Redwood Shores Pkwy, Redwood City, CA','support@ea.com','Electronic Arts (EA Games)','https://www.ea.com'),(5,'345 Park Avenue, San Jose, CA','contact@adobe.com','Adobe Inc.','https://www.adobe.com'),(6,'Dietmar-Hopp-Allee 16, 69190 Walldorf','info@sap.com','SAP SE','https://www.sap.com'),(7,'One Microsoft Way, Redmond, WA','kontakt@microsoft.com','Microsoft','https://www.microsoft.com');
/*!40000 ALTER TABLE `softwarehersteller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warenkorb`
--

DROP TABLE IF EXISTS `warenkorb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warenkorb` (
  `warenkorb_id` bigint NOT NULL,
  `gast_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kunde_id` bigint DEFAULT NULL,
  PRIMARY KEY (`warenkorb_id`),
  KEY `FK60lvjtkvw57d66qf9f8gbokt` (`kunde_id`),
  CONSTRAINT `FK60lvjtkvw57d66qf9f8gbokt` FOREIGN KEY (`kunde_id`) REFERENCES `kunden` (`kunde_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warenkorb`
--

LOCK TABLES `warenkorb` WRITE;
/*!40000 ALTER TABLE `warenkorb` DISABLE KEYS */;
INSERT INTO `warenkorb` VALUES (352,'0af0e015-e47a-4dcb-b54c-d6b52cfd7bae',NULL),(353,NULL,1);
/*!40000 ALTER TABLE `warenkorb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warenkorb_item`
--

DROP TABLE IF EXISTS `warenkorb_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warenkorb_item` (
  `id` bigint NOT NULL,
  `menge` int NOT NULL,
  `software_id` bigint NOT NULL,
  `warenkorb_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKeqeu8ruy3qeq65l8s2iuwthda` (`software_id`),
  KEY `FKc1e9ebduinq2dq2hujs21art4` (`warenkorb_id`),
  CONSTRAINT `FKc1e9ebduinq2dq2hujs21art4` FOREIGN KEY (`warenkorb_id`) REFERENCES `warenkorb` (`warenkorb_id`),
  CONSTRAINT `FKeqeu8ruy3qeq65l8s2iuwthda` FOREIGN KEY (`software_id`) REFERENCES `software` (`software_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warenkorb_item`
--

LOCK TABLES `warenkorb_item` WRITE;
/*!40000 ALTER TABLE `warenkorb_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `warenkorb_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warenkorb_item_seq`
--

DROP TABLE IF EXISTS `warenkorb_item_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warenkorb_item_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warenkorb_item_seq`
--

LOCK TABLES `warenkorb_item_seq` WRITE;
/*!40000 ALTER TABLE `warenkorb_item_seq` DISABLE KEYS */;
INSERT INTO `warenkorb_item_seq` VALUES (651);
/*!40000 ALTER TABLE `warenkorb_item_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warenkorb_seq`
--

DROP TABLE IF EXISTS `warenkorb_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warenkorb_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warenkorb_seq`
--

LOCK TABLES `warenkorb_seq` WRITE;
/*!40000 ALTER TABLE `warenkorb_seq` DISABLE KEYS */;
INSERT INTO `warenkorb_seq` VALUES (451);
/*!40000 ALTER TABLE `warenkorb_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zahlungen`
--

DROP TABLE IF EXISTS `zahlungen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zahlungen` (
  `betrag` decimal(38,2) DEFAULT NULL,
  `bestellung_bestell_id` bigint DEFAULT NULL,
  `zahlung_id` bigint NOT NULL AUTO_INCREMENT,
  `zeitpunkt` datetime(6) DEFAULT NULL,
  `status` enum('BEZAHLT','FEHLGESCHLAGEN','OFFEN','STORNIERT') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zahlungs_methode` enum('KREDITKARTE','LASTSCHRIFT','PAYPAL','VORKASSE') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`zahlung_id`),
  KEY `FKsj01eqxx5mw702257m4hm1tv2` (`bestellung_bestell_id`),
  CONSTRAINT `FKsj01eqxx5mw702257m4hm1tv2` FOREIGN KEY (`bestellung_bestell_id`) REFERENCES `bestellungen` (`bestell_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zahlungen`
--

LOCK TABLES `zahlungen` WRITE;
/*!40000 ALTER TABLE `zahlungen` DISABLE KEYS */;
INSERT INTO `zahlungen` VALUES (179.98,NULL,1,'2026-01-16 23:39:31.805427','BEZAHLT',NULL),(179.98,1,2,'2026-01-16 23:50:30.381898','BEZAHLT',NULL),(179.98,1,3,'2026-01-16 23:50:34.119223','BEZAHLT',NULL),(1199.00,2,4,'2026-01-18 17:18:24.238855','BEZAHLT',NULL),(1199.00,2,5,'2026-01-18 17:18:29.570429','BEZAHLT',NULL),(1199.00,2,6,'2026-01-18 17:18:31.138622','BEZAHLT',NULL),(1199.00,2,7,'2026-01-18 17:18:31.606973','BEZAHLT',NULL),(1199.00,2,8,'2026-01-18 17:18:32.011438','BEZAHLT',NULL),(1199.00,2,9,'2026-01-18 17:18:32.656158','BEZAHLT',NULL),(1199.00,2,10,'2026-01-18 17:18:33.234283','BEZAHLT',NULL),(1199.00,2,11,'2026-01-18 17:18:33.601389','BEZAHLT',NULL),(1199.00,2,12,'2026-01-18 17:18:33.857364','BEZAHLT',NULL),(1199.00,2,13,'2026-01-18 17:18:34.065312','BEZAHLT',NULL),(1199.00,2,14,'2026-01-18 17:18:34.502576','BEZAHLT',NULL),(1199.00,2,15,'2026-01-18 17:18:38.544858','BEZAHLT',NULL),(139.99,3,16,'2026-01-18 17:53:41.346838','BEZAHLT',NULL);
/*!40000 ALTER TABLE `zahlungen` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-19 18:58:37
