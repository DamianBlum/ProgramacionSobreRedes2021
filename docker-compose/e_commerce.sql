-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: e_commerce
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Dumping data for table `calificaciones_compradores`
--

create database e_commerce;
use e_commerce;

LOCK TABLES `calificaciones_compradores` WRITE;
/*!40000 ALTER TABLE `calificaciones_compradores` DISABLE KEYS */;
INSERT INTO `calificaciones_compradores` VALUES (1,4,1,4,'2021-01-14 00:00:00'),(2,4,1,4,'2021-04-21 20:02:45');
/*!40000 ALTER TABLE `calificaciones_compradores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `calificaciones_vendedores`
--

LOCK TABLES `calificaciones_vendedores` WRITE;
/*!40000 ALTER TABLE `calificaciones_vendedores` DISABLE KEYS */;
INSERT INTO `calificaciones_vendedores` VALUES (1,1,4,5,'2021-01-05 14:35:30');
/*!40000 ALTER TABLE `calificaciones_vendedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `compras`
--

LOCK TABLES `compras` WRITE;
/*!40000 ALTER TABLE `compras` DISABLE KEYS */;
INSERT INTO `compras` VALUES (1,4,6,4,'2022-01-04 18:15:40',1,1),(2,2,4,1,'2021-01-04 12:15:36',2,2),(3,4,5,4,'2021-04-20 22:06:30',0,0);
/*!40000 ALTER TABLE `compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `favoritos`
--

LOCK TABLES `favoritos` WRITE;
/*!40000 ALTER TABLE `favoritos` DISABLE KEYS */;
INSERT INTO `favoritos` VALUES (1,2,1),(2,4,2),(4,1,8),(5,3,10);
/*!40000 ALTER TABLE `favoritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,3,'Consola PS2 usada',11999.99,1,1),(2,1,'Guitarra Fender Stratocaster ',135521.00,2,0),(3,3,'Joystick PS2',1281.00,3,1),(4,5,'Fiat Argo Precision 1.8',1150200.00,1,1),(5,1,'Bajo Squier Jazz Bass',71377.00,4,0),(6,1,'Teclado Casio Ctk1550',18274.00,8,0),(7,2,'Botines de Futbol Infantil',1450.00,32,0),(8,5,'Star Wars Lighstaber B2912',2499.00,5,0),(9,3,'Juego PS2 Resident Evil 4 Original',500.00,1,1),(10,2,'Pelota de Futbol',1412.00,29,0);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'juanrodriguez',23512.43,4.00,NULL),(2,'nicoperez',13247.02,NULL,NULL),(3,'manugomez',33641.80,NULL,NULL),(4,'carlosfernandez',18172.99,NULL,5.00),(5,'sergiogonzalez',42791.76,NULL,NULL),(10,'b',1.00,1.00,1.00);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-12  9:09:29
