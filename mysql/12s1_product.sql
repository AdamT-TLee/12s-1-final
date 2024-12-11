-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: 12s1
-- ------------------------------------------------------
-- Server version	9.1.0

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
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `description` text,
  `image_url` text NOT NULL,
  `price` double NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Titan submersible','The Titan submersible, by OceanGate, was designed for deep-sea exploration, including reaching the Titanic wreck at 12,500 feet. Built from carbon fiber and titanium, it carried five people with a forward-facing viewport. In June 2023, it tragically imploded during a dive to the Titanic, resulting in the loss of all onboard.','/uploads/Titan_submersible.jpg',250000,1),(2,'Google Glass','Google Glass is a wearable device with a small display near the eye, offering hands-free interaction through a camera, touchpad, and sensors, used for augmented reality in professional and industrial applications.','/uploads/Google_Glass_photo.JPG',1200,1),(3,'Rabbit R1','Rabbit R1 is a compact AI assistant that uses voice commands and a touchscreen to help you with tasks like answering questions, setting reminders, and controlling smart home devices.','/uploads/gear-r1_USB-C_SIM.webp',200,1),(4,'Ouya','Ouya is an Android-based gaming console released in 2013, designed for affordable gaming and open development. It offered access to indie and mobile games but struggled to maintain traction in the competitive market.','/uploads/OUYA-Console-set-h.jpg',200,1),(5,'Nintendo Virtual Boy','Virtual Boy is a 1995 handheld gaming console by Nintendo that featured 3D graphics using stereoscopic technology. Despite its innovative design, it was criticized for discomfort during use and limited game selection, leading to poor sales and a short lifespan.','/uploads/Virtual-Boy-Set.jpg',1099,1),(6,'Humane AI Pin','The Humane AI Pin is a wearable device designed to provide an intuitive, hands-free AI experience. It features a minimalist design, enabling users to interact with AI through voice commands and gestures. The device aims to enhance daily tasks and communication while integrating seamlessly into users\' lifestyles.','/uploads/ai-pin-lunar-front.webp',699,1),(7,'Windows Phone','Windows Phone is a mobile operating system developed by Microsoft, launched in 2010. It featured a unique tile-based user interface and integrated Microsoft services like Office and OneDrive. Despite initial promise, it struggled with app availability and market share, leading to its eventual discontinuation in 2017.','/uploads/WP8.1_Start_Screen.png',188,1),(8,'Robot 5','Just a chill robot','/uploads/1733951361336.png',5,1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-11 15:11:21
