CREATE DATABASE  IF NOT EXISTS `rsdb` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `rsdb`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 10.87.169.104    Database: rsdb
-- ------------------------------------------------------
-- Server version	8.0.43

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

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `idClientes` int NOT NULL AUTO_INCREMENT,
  `nomeCliente` varchar(70) NOT NULL,
  `cpfCliente` char(11) NOT NULL,
  `telefoneCliente` char(12) NOT NULL,
  `emailCliente` varchar(250) NOT NULL,
  `enderecoCliente` varchar(45) NOT NULL,
  PRIMARY KEY (`idClientes`),
  UNIQUE KEY `cfpCliente_UNIQUE` (`cpfCliente`),
  UNIQUE KEY `emailCliente_UNIQUE` (`emailCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Lucas','01234567898','12345678908','lumikomio02@gmail.com','Rua Cleber jose da silva'),(4,'Lucas','01234567896','12345678901','lumikomio64@gmail.com','Rua Cleber jose da silva'),(6,'Lucas','01234567848','12345678908','lumikomio52@gmail.com','Rua Cleber jose da silva');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entregas`
--

DROP TABLE IF EXISTS `entregas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entregas` (
  `idEntregas` int NOT NULL AUTO_INCREMENT,
  `idPedido` int NOT NULL,
  `valorDistancia` decimal(10,2) NOT NULL,
  `valorPeso` decimal(10,2) NOT NULL,
  `acrescimo` decimal(10,2) NOT NULL,
  `taxaExtra` decimal(10,2) NOT NULL,
  `valorFinal` decimal(10,2) NOT NULL,
  `desconto` decimal(10,2) NOT NULL,
  `tipoEntrega` varchar(20) NOT NULL,
  `statusEntrega` varchar(70) NOT NULL,
  PRIMARY KEY (`idEntregas`),
  KEY `fk_entrega_pedidos_idx` (`idPedido`),
  CONSTRAINT `fk_entrega_pedidos` FOREIGN KEY (`idPedido`) REFERENCES `pedidos` (`idPedidos`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entregas`
--

LOCK TABLES `entregas` WRITE;
/*!40000 ALTER TABLE `entregas` DISABLE KEYS */;
INSERT INTO `entregas` VALUES (2,7,3000.00,100.00,0.00,15.00,2805.00,310.00,'normal','transitando'),(3,7,3000.00,100.00,0.00,15.00,2805.00,310.00,'normal','transitando'),(4,7,3000.00,100.00,0.00,15.00,2805.00,310.00,'normal','transitando'),(5,7,3000.00,100.00,0.00,15.00,2805.00,310.00,'normal','transitando');
/*!40000 ALTER TABLE `entregas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `idPedidos` int NOT NULL AUTO_INCREMENT,
  `idClientes` int NOT NULL,
  `dataPedido` date NOT NULL,
  `distanciaPedido` decimal(10,2) NOT NULL,
  `pesoCarga` decimal(10,2) NOT NULL,
  `valorKm` decimal(10,2) NOT NULL,
  `valorKg` decimal(10,2) NOT NULL,
  `tipoEntrega` varchar(45) NOT NULL,
  PRIMARY KEY (`idPedidos`),
  KEY `fk_pedidos_clientes1_idx` (`idClientes`),
  CONSTRAINT `fk_pedidos_clientes1` FOREIGN KEY (`idClientes`) REFERENCES `clientes` (`idClientes`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (7,1,'2025-02-12',1500.00,100.00,2.00,1.00,'normal');
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-01 10:57:43
