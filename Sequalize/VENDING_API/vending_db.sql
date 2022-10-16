-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: vending
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `assignmachine`
--

DROP TABLE IF EXISTS `assignmachine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignmachine` (
  `id` int NOT NULL AUTO_INCREMENT,
  `machine_id` int NOT NULL,
  `vendor_id` int NOT NULL,
  `assigned_by_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `manager_id` int NOT NULL DEFAULT '0',
  `admin_id` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`machine_id`,`vendor_id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignmachine`
--

LOCK TABLES `assignmachine` WRITE;
/*!40000 ALTER TABLE `assignmachine` DISABLE KEYS */;
/*!40000 ALTER TABLE `assignmachine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assignvendor`
--

DROP TABLE IF EXISTS `assignvendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignvendor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vendor_id` int NOT NULL,
  `manager_id` int NOT NULL,
  `assigned_by_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `vendor_id_UNIQUE` (`vendor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignvendor`
--

LOCK TABLES `assignvendor` WRITE;
/*!40000 ALTER TABLE `assignvendor` DISABLE KEYS */;
/*!40000 ALTER TABLE `assignvendor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `billing`
--

DROP TABLE IF EXISTS `billing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `billing` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vendor_id` int NOT NULL,
  `paid_amount` float DEFAULT '0',
  `total_amount` float DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billing`
--

LOCK TABLES `billing` WRITE;
/*!40000 ALTER TABLE `billing` DISABLE KEYS */;
INSERT INTO `billing` VALUES (1,1020,150,1350,'2022-06-26 14:25:54','2022-06-26 21:28:46');
/*!40000 ALTER TABLE `billing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `billinglog`
--

DROP TABLE IF EXISTS `billinglog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `billinglog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `billing_id` int NOT NULL,
  `vendor_id` int DEFAULT NULL,
  `amount` float DEFAULT '0',
  `action` varchar(200) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `paid_by_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billinglog`
--

LOCK TABLES `billinglog` WRITE;
/*!40000 ALTER TABLE `billinglog` DISABLE KEYS */;
INSERT INTO `billinglog` VALUES (1,1,1020,50,'added','2022-06-26 16:03:22','2022-06-26 21:03:22',NULL),(2,1,1020,50,'added','2022-06-26 16:05:01','2022-06-26 21:05:01',NULL),(3,1,1020,50,'added','2022-06-26 16:06:41','2022-06-26 21:06:41',NULL);
/*!40000 ALTER TABLE `billinglog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fingerprint`
--

DROP TABLE IF EXISTS `fingerprint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fingerprint` (
  `id` int NOT NULL AUTO_INCREMENT,
  `blob` text NOT NULL,
  `date_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `machine_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_primary` int DEFAULT '1',
  `user_id` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fingerprint`
--

LOCK TABLES `fingerprint` WRITE;
/*!40000 ALTER TABLE `fingerprint` DISABLE KEYS */;
/*!40000 ALTER TABLE `fingerprint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `expired_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `price` float DEFAULT '0',
  `refilled_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `quantity` float DEFAULT '0',
  `machine_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (5,'lux','2022-06-13 17:14:12','2022-07-14 22:24:16','2022-07-16 17:14:12',20,'2022-06-13 17:14:12',10,22),(6,'test_item01','2022-06-26 14:25:54','2022-07-14 22:29:12','2022-07-11 19:00:00',0,'2022-06-24 19:00:00',10,25);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logger`
--

DROP TABLE IF EXISTS `logger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logger` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logger`
--

LOCK TABLES `logger` WRITE;
/*!40000 ALTER TABLE `logger` DISABLE KEYS */;
INSERT INTO `logger` VALUES (1,'controller : auth =>TypeError: Cannot read property \'role\' of undefined','2022-03-30 18:16:14','2022-03-30 23:16:14'),(2,'Controller : User =>ReferenceError: vendor_ids is not defined','2022-03-31 19:25:23','2022-04-01 00:25:23'),(3,'Controller : User =>ReferenceError: results is not defined','2022-03-31 19:28:22','2022-04-01 00:28:22'),(4,'Controller : item =>ReferenceError: body is not defined','2022-05-18 16:47:14','2022-05-18 21:47:14'),(5,'Controller : User =>ReferenceError: query is not defined','2022-05-21 08:24:06','2022-05-21 13:24:06'),(6,'Controller : User =>ReferenceError: query is not defined','2022-05-21 08:26:08','2022-05-21 13:26:08'),(7,'controller : order =>TypeError: Order.getBills is not a function','2022-06-27 16:59:04','2022-06-27 21:59:04'),(8,'controller : order =>TypeError: Order.getBills is not a function','2022-06-27 16:59:13','2022-06-27 21:59:13'),(9,'controller : item =>ReferenceError: Cannot access \'newDate\' before initialization','2022-07-20 16:56:56','2022-07-20 21:56:56'),(10,'controller : item =>ReferenceError: Cannot access \'newDate\' before initialization','2022-07-20 16:59:06','2022-07-20 21:59:06');
/*!40000 ALTER TABLE `logger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `machine`
--

DROP TABLE IF EXISTS `machine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `machine` (
  `id` int NOT NULL AUTO_INCREMENT,
  `location` text NOT NULL,
  `address` text NOT NULL,
  `is_active` int DEFAULT '0',
  `inventry` float DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `temperature` float DEFAULT '30',
  `door` varchar(100) DEFAULT 'close',
  `vibration` varchar(100) DEFAULT NULL,
  `image` text,
  `manager_id` int DEFAULT '0',
  `admin_id` int DEFAULT '0',
  `vendor_id` int DEFAULT '0',
  `created_by_id` int DEFAULT '0',
  `machine_id` int DEFAULT NULL,
  `last_order_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `machine_id_UNIQUE` (`machine_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `machine`
--

LOCK TABLES `machine` WRITE;
/*!40000 ALTER TABLE `machine` DISABLE KEYS */;
INSERT INTO `machine` VALUES (22,'34.01661926909494, 71.3220673776462','Khyber Agency, Khyber Pakhtunkhwa\nPakistan',0,100,'2022-05-25 18:51:04','2022-05-25 23:51:04',30,'close',NULL,NULL,1021,1019,1020,1018,10101123,NULL),(25,'34.01661926909494, 71.3220673776462','Khyber Agency, Khyber Pakhtunkhwa\nPakistan',1,60,'2022-05-25 19:06:30','2022-06-13 22:41:42',30,'open',NULL,'1653505910775IMG-20190406-WA0072-1.jpg',1021,1019,1020,1018,10101124,'2022-06-13 17:41:42');
/*!40000 ALTER TABLE `machine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `machinerf`
--

DROP TABLE IF EXISTS `machinerf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `machinerf` (
  `id` int NOT NULL AUTO_INCREMENT,
  `machine_id` int NOT NULL,
  `rf_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `machinerf`
--

LOCK TABLES `machinerf` WRITE;
/*!40000 ALTER TABLE `machinerf` DISABLE KEYS */;
/*!40000 ALTER TABLE `machinerf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_id` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `machine_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_idx` (`machine_id`),
  CONSTRAINT `id` FOREIGN KEY (`machine_id`) REFERENCES `machine` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
INSERT INTO `order_item` VALUES (9,5,'2022-06-13 17:39:07','2022-06-13 22:39:07',25),(10,5,'2022-06-13 17:41:42','2022-06-13 22:41:42',25);
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `machine_id` int DEFAULT '0',
  `user_id` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendinguser`
--

DROP TABLE IF EXISTS `vendinguser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendinguser` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `role` varchar(100) NOT NULL DEFAULT 'vendor',
  `last_accessed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `password` text NOT NULL,
  `created_by_email` varchar(200) DEFAULT NULL,
  `user_rfid` text,
  `created_by_id` int DEFAULT NULL,
  `manager_id` int NOT NULL DEFAULT '0',
  `admin_id` int NOT NULL DEFAULT '0',
  `price` float DEFAULT NULL,
  `expiry` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1024 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendinguser`
--

LOCK TABLES `vendinguser` WRITE;
/*!40000 ALTER TABLE `vendinguser` DISABLE KEYS */;
INSERT INTO `vendinguser` VALUES (1018,'irfan','irfan@gmail.com','923455793093','superadmin','2022-05-25 18:40:24','2022-05-25 18:40:24','2022-05-25 23:42:35','$2b$10$bXmLo8bep2MD0n3PRkYIoO6Es9SRFy7jxB11zuPcoTWDr5aratH8C','umer@gmail.com',NULL,0,0,0,NULL,NULL),(1019,'admin','admin@gmail.com','923455793093','admin','2022-05-25 18:47:14','2022-05-25 18:47:14','2022-05-25 23:47:14','$2b$10$u1D/J8PeLe1Q/vBLuDj2Te5vMKaVlZNfU45kz6XGWGZD7yed0et6m','irfan@gmail.com',NULL,1018,0,0,NULL,NULL),(1020,'vendor','vendor@gmail.com','923455793093','vendor','2022-05-25 18:47:47','2022-05-25 18:47:47','2022-06-26 19:00:18','$2b$10$T7BY.84q69DuMF.hg80lp.poXi9kjV3DzsuTh7u8DSeVcTiif3Q3K','irfan@gmail.com',NULL,1018,1021,1019,50,5),(1021,'manager','manager@gmail.com','923455793093','manager','2022-05-25 18:47:00','2022-05-25 18:49:54','2022-06-12 22:44:28','$2b$10$2FuauftPEI3d/Pd7i2vLIe3UZV18gyRhhEp75QoFuqg23x86x1XPC','irfan@gmail.com',NULL,1018,0,0,NULL,NULL),(1022,'manager','manager2@gmail.com','923455793093','manager','2022-06-26 15:28:28','2022-06-26 15:28:28','2022-06-26 20:28:28','$2b$10$UwPgmC.6XP5Fv9viewOUeueTkebnKwOhWORhsMCk5DntLoRt2.Yta','admin@gmail.com',NULL,1019,0,0,NULL,NULL),(1023,'manager','superadmin@gmail.com','923455793093','superadmin','2022-06-26 15:30:44','2022-06-26 15:30:44','2022-06-26 20:30:44','$2b$10$rzeyP6/ks9fuw.NltfqrVOI6BgITCHtYZ6sykq83a8kXdRjRuBa82','manager2@gmail.com',NULL,1022,0,0,NULL,NULL);
/*!40000 ALTER TABLE `vendinguser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'vending'
--
/*!50003 DROP PROCEDURE IF EXISTS `sp_add_item` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_item`(IN machine_id INT,IN expired_at VARCHAR(50),IN quantity INT,IN user_id INT,IN refilled_at VARCHAR(50), IN item_name VARCHAR(200))
BEGIN
      SET @price=(select price  FROM vendinguser where id=user_id);
       if(@price is null) then
         SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'price is null against vendor';
       end if;
       if (quantity>0) then
           insert into item (name,machine_id,expired_at,quantity,price,refilled_at) 
           values(item_name,machine_id,expired_at,quantity,price,refilled_at);
           SET @is_vendor_exist=(select exists (SELECT 1 FROM billing where vendor_id=user_id));
           if(@is_vendor_exist=1) then
               update billing b set total_amount=b.total_amount+@price*quantity  where id=user_id;
	       else
			   insert into billing (vendor_id, total_amount) values(user_id,@price*quantity);
           end if;
       else
           insert into item (name,machine_id,expired_at,quantity,price,refilled_at) 
           values(item_name,machine_id,null,quantity,price,refilled_at);
       end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_machine` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_machine`(IN m_id INT)
BEGIN
    SET @is_exist=(select exists (SELECT 1 FROM machine where id=m_id));
    if(@is_exist=1) then
     delete from machine where id=m_id;
    else
    SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'machine not found';
    end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_user`(IN user_id INT)
BEGIN
   set @count_machine =(select count(*) from machine 
   where vendor_id=user_id OR manager_id=user_id OR admin_id=user_id);
   IF(@count_machine>0) THEN 
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'user_id exists in machine as foreign key';
	END IF;
      set @count_in_user =(select count(*) from vendinguser 
   where manager_id=user_id OR admin_id=user_id);
   IF(@count_in_user>0) THEN 
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'user is admin or manager of somebody ';
	END IF;
    SET @is_exist=(select exists (SELECT 1 FROM vendinguser where id=user_id));
    if(@is_exist=1) then
     delete from vendinguser where id=user_id;
    else
    SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'user not found';
    end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_expiry_qty` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_expiry_qty`(IN machine_id INT,IN expired_at VARCHAR(50),IN quantity INT,IN user_id INT)
BEGIN
   
   SET @is_machine_exist=(select exists (SELECT 1 FROM item i where i.machine_id=machine_id));
    if(@is_machine_exist=1) then
      SET @price=(select price  FROM vendinguser where id=user_id);
       if(@price is null) then
         SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'price is null against vendor';
       end if;
       update item i set expired_at=expired_at, quantity=quantity where i.machine_id=machine_id;
       
       SET @is_vendor_exist=(select exists (SELECT 1 FROM billing where vendor_id=user_id));
       if(@is_vendor_exist=1) then
         update billing b set total_amount=b.total_amount+@price*quantity  where vendor_id=user_id;
       else
       insert into billing (vendor_id, total_amount) values(user_id,@price*quantity);
       end if;
    else
    SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'machine id not found in any item';
    end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_admins` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_admins`(IN `per_page` INT, IN `skip` INT,IN `user_role` TEXT)
BEGIN
select id,user_name,email,phone_number,last_accessed_at,role,created_by_id from vending.vendinguser u 
where role=user_role LIMIT per_page OFFSET skip;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_admins_pagination` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_admins_pagination`(IN `per_page` INT,IN `user_role` TEXT)
BEGIN
set @total=(select COUNT(*)  from vending.vendinguser u 
where role=user_role);

SET @total_pages=CEIL(@total/per_page);
SELECT @total AS total_records,@total_pages AS total_pages LIMIT 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_counts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_counts`(IN user_id INT,IN is_super INT(1))
BEGIN
   set @dispensed_items= (select count(*) from order_item oi 
   where (is_super=1 OR machine_id in 
   (select id from machine m where m.manager_id=user_id OR m.admin_id=user_id OR m.vendor_id=user_id ))
   );
   
   set @active_machines=(select count(*) from machine m 
   where is_active=1 AND (is_super=1 OR m.manager_id=user_id OR m.admin_id=user_id OR m.vendor_id=user_id));
   
   set @inactive_machines=(select count(*) from machine m
   where is_active=0 AND (is_super=1 OR m.manager_id=user_id OR m.admin_id=user_id OR m.vendor_id=user_id));
   
   set @inactive_items=(select sum(quantity) from item i 
   where  DATE(i.expired_at) < CURDATE() AND
   (is_super=1 OR machine_id in
   (select id from machine m where m.manager_id=user_id OR m.admin_id=user_id OR m.vendor_id=user_id)));
   
   set @active_items=(select  sum(quantity) from item i 
   where  DATE(i.expired_at) >= CURDATE() AND
   (is_super=1 OR machine_id in
   (select id from machine m where m.manager_id=user_id OR m.admin_id=user_id OR m.vendor_id=user_id)));
   
   set @paid_amount=(
   select sum(paid_amount) from billing b where b.vendor_id in ( select m.vendor_id from machine m 
   where is_active=1 AND (is_super=1 OR m.manager_id=user_id OR m.admin_id=user_id OR m.vendor_id=user_id)));
   
   set @total_amount=(
   select sum(total_amount) from billing b where b.vendor_id in ( select m.vendor_id from machine m 
   where is_active=1 AND (is_super=1 OR m.manager_id=user_id OR m.admin_id=user_id OR m.vendor_id=user_id)));
   
   select 
   @paid_amount as paid_amount,
   @total_amount as total_amount,
   @total_amount-@paid_amount  as un_paid_amount,
   @dispensed_items as dispensed_items,
   @active_machines as active_machines,
   @inactive_machines as inactive_machines,
   @inactive_items  as inactive_items,
   @active_items  as active_items;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_dispensed_counts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_dispensed_counts`(IN mid INT)
BEGIN
 -- select count(*) from order_item oi where DATE(oi.created_at) >= start_date and DATE(oi.created_at) <= end_date;
 select (select count(*)  from order_item oi  where DATE(oi.created_at)=CURRENT_DATE() and machine_id = mid) as today_dispensed_items ,
count(*) as dipensed_items from order_item where machine_id = mid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_dispensed_items` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_dispensed_items`(in start_date date, in end_date date)
BEGIN
 SELECT o.*,oi.item_id,oi.item_qty as order_item_quantity,
 i.quantity as item_quantity ,i.name as item_name FROM vending.orders o 
 inner join vending.order_item  oi on o.id=oi.order_id 
 inner join item i on i.id=oi.item_id  
 where DATE(o.created_at) >= start_date and DATE(o.created_at) <= end_date;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_fingerprints` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_fingerprints`(IN `per_page` INT, IN `skip` INT,IN `status` INT(1))
BEGIN
    select f.* from fingerprint f where is_primary=status LIMIT per_page OFFSET skip;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_fingerprints_pagination` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_fingerprints_pagination`(IN `per_page` INT,IN `status` INT(1))
BEGIN
set @total=(select COUNT(*)  from fingerprint f where is_primary=status);
SET @total_pages=CEIL(@total/per_page);
SELECT @total AS total_records,@total_pages AS total_pages LIMIT 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_items` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_items`(IN `per_page` INT, IN `skip` INT,`m_id` INT)
BEGIN
Select i.*, CASE  WHEN  DATE(i.expired_at) > CURDATE()
THEN false
ELSE true  
END AS is_expired FROM item i where machine_id=m_id LIMIT per_page OFFSET skip;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_items_pagination` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_items_pagination`(IN `per_page` INT,`m_id` INT)
BEGIN
set @total=(select COUNT(*)  from item where machine_id=m_id);

SET @total_pages=CEIL(@total/per_page);
SELECT @total AS total_records,@total_pages AS total_pages LIMIT 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_Machines` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_Machines`(IN `per_page` INT, IN `skip` INT,IN `status` INT(1),IN user_id INT,IN `is_all` INT(1),IN is_super INT)
BEGIN
  if(is_all=1) then
   select m.*,case when (m.image is not null) then CONCAT("http://localhost:5000/", m.image) else null end as image ,vendor_id,manager_id,admin_id,created_by_id,
    last_order_date,
    (select i.expired_at from item i where i.machine_id=m.id)as expired_at,
    (select i.quantity from item i where i.machine_id=m.id)as quantity,
    (select u.expiry from vendinguser u where u.id=m.vendor_id)as expiry,
    case when (exists(select * from item i where i.machine_id=m.id  )) then true else false end as has_item from machine m
   WHERE (is_super=1 OR admin_id=user_id OR manager_id=user_id OR vendor_id=user_id) LIMIT per_page OFFSET skip;
   else
   select m.*,case when (m.image is not null) then CONCAT("http://localhost:5000/", m.image) else null end  as image ,vendor_id,manager_id,admin_id,created_by_id,
   last_order_date,
   (select i.expired_at from item i where i.machine_id=m.id)as expired_at,
   (select i.quantity from item i where i.machine_id=m.id)as quantity,
   (select u.expiry from vendinguser u where u.id=m.vendor_id)as expiry,
   case when (exists(select * from item i where i.machine_id=m.id )) then true else false end as has_item from machine m
   where is_active=status AND (is_super=1 OR admin_id=user_id OR manager_id=user_id OR vendor_id=user_id) LIMIT per_page OFFSET skip;
   end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_Machines_pagination` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_Machines_pagination`(IN `per_page` INT,IN `status` INT(1),IN user_id INT,IN `is_all` INT(1),IN is_super INT)
BEGIN
  set @total=0;
if(is_all=1) then
   set @total=(select  COUNT(*) from machine m   
   WHERE (is_super=1 OR admin_id=user_id OR manager_id=user_id OR vendor_id=user_id));
   else
   set @total=(select COUNT(*) from machine m 
   where is_active=status AND (is_super=1 OR admin_id=user_id OR manager_id=user_id OR vendor_id=user_id));
   end if;
   
   SET @total_pages=CEIL(@total/per_page);
   SELECT @total AS total_records,@total_pages AS total_pages LIMIT 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_managers` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_managers`(IN `per_page` INT, IN `skip` INT,IN `created_by_id` INT)
BEGIN



if(created_by_id=0) then
select id,user_name,email,phone_number,last_accessed_at,role,created_by_id,manager_id,admin_id from vending.vendinguser u 
where role='manager' LIMIT per_page OFFSET skip;
else 
select id,user_name,email,phone_number,last_accessed_at,role,created_by_id,manager_id,admin_id from vending.vendinguser u 
where role='manager' and u.admin_id=created_by_id LIMIT per_page OFFSET skip;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_managers_pagination` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_managers_pagination`(IN `per_page` INT,IN `created_by_id` INT)
BEGIN
set @total=0;
if(created_by_id=0) then
set @total=(select COUNT(*)  from vendinguser u where role='manager');
else 
set @total=(select COUNT(*)  from vendinguser u where role='manager' and u.admin_id=created_by_id);
end if;
SET @total_pages=CEIL(@total/per_page);
SELECT @total AS total_records,@total_pages AS total_pages LIMIT 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_users` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_users`(IN `per_page` INT, IN `skip` INT, IN `searchtxt` TEXT,IN `user_role` TEXT)
BEGIN
if(user_role='0') then
  SELECT u.* FROM vendinguser u where user_name LIKE  searchtxt  LIMIT per_page OFFSET skip;
else
  SELECT u.* FROM vendinguser u where user_name LIKE  searchtxt and role=user_role LIMIT per_page OFFSET skip;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_users_pagination` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_users_pagination`(IN `per_page` INT, IN `search` TEXT,IN `user_role` TEXT)
BEGIN
set @total=0;
if(user_role='0') then
    set @total=(SELECT COUNT(*) from vendinguser c WHERE  user_name LIKE search);
else
   set @total=(SELECT COUNT(*) from vendinguser c WHERE  user_name LIKE search and role=user_role);
end if;
SET @total_pages=CEIL(@total/per_page);
SELECT @total AS total_records,@total_pages AS total_pages LIMIT 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_vendors` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_vendors`(IN `per_page` INT, IN `skip` INT, IN `m_id` INT)
BEGIN
if(m_id=0) then
SELECT u.id,user_name,email,phone_number,price,expiry,last_accessed_at,role,created_by_id,manager_id,admin_id FROM vendinguser u 
 where role='vendor' LIMIT per_page OFFSET skip;
else
SELECT u.id,user_name,email,phone_number,price,expiry,last_accessed_at,role,created_by_id,manager_id,admin_id FROM vendinguser u 
where (manager_id=m_id or admin_id=m_id) and  role='vendor' LIMIT per_page OFFSET skip;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_vendors_pagination` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_vendors_pagination`(IN `per_page` INT, IN `m_id` INT)
BEGIN
set @total=0;
if(m_id=0) then
set @total=(SELECT COUNT(*) FROM vendinguser u  where role='vendor');
else
set @total=(SELECT COUNT(*) FROM vendinguser u where (manager_id=m_id or admin_id=m_id) and role='vendor');
end if;
SET @total_pages=CEIL(@total/per_page);

SELECT @total AS total_records,@total_pages AS total_pages LIMIT 1;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_order_item` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_order_item`(IN machine_id INT)
BEGIN
   update item i set quantity=(i.quantity-1) where machine_id=machine_id;
   -- remove item-id from here
   insert into order_item (machine_id) values(machine_id);
   update machine i set last_order_date=NOW() where id=machine_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_pay_bill` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_pay_bill`(IN bill_id INT,IN vendor_id INT,IN amount float,IN bill_action varchar(100),IN paid_by_id INT)
BEGIN
    SET @is_bill_exist=(select exists (SELECT 1 FROM billing b where b.id=bill_id));
    if(@is_bill_exist=1) then
    update billing b set b.total_amount=b.total_amount,b.paid_amount=b.paid_amount+amount where b.vendor_id=vendor_id and b.id =bill_id;
    insert into billinglog (billing_id,vendor_id,amount,action,paid_by_id) values (bill_id,vendor_id,amount,bill_action,paid_by_id);
    else 
    SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'bill id not found';
    end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_price_qty` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_price_qty`(IN machine_id INT, IN price INT,IN quantity INT,IN user_id INT)
BEGIN
   SET @is_machine_exist=(select exists (SELECT 1 FROM item where machine_id=machine_id));
    if(@is_machine_exist=1) then
       update item set price=price, quantity=quantity where machine_id=machine_id;
       
       SET @is_vendor_exist=(select exists (SELECT 1 FROM billing where vendor_id=user_id));
       if(@is_vendor_exist=1) then
         update billing b set total_amount=b.total_amount+price*quantity  where id=user_id;
       else
       insert into billing (vendor_id, total_amount) values(user_id,price*quantity);
       end if;
    else
    SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'machine id not found in any item';
    end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-12 22:54:25
