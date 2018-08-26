-- MySQL dump 10.16  Distrib 10.2.11-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: admin_develop
-- ------------------------------------------------------
-- Server version	10.2.11-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ddweb_clients_user`
--

DROP TABLE IF EXISTS `ddweb_clients_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ddweb_clients_user` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT,
  `whmcs_tkval` varchar(32) NOT NULL COMMENT 'whmcs_tkval',
  `whmcs_uid` int(11) NOT NULL COMMENT 'whmcs用户ID',
  `u_web_user` int(11) DEFAULT NULL COMMENT '用户id',
  `u_token` varchar(64) DEFAULT NULL COMMENT 'api token',
  `u_api_use_count` varchar(255) DEFAULT NULL COMMENT 'api使用记录',
  `u_api_consume` double DEFAULT NULL COMMENT 'api消费统计',
  `u_time` timestamp NULL DEFAULT '0000-00-00 00:00:00' COMMENT '用户创建时间',
  `token` varchar(64) DEFAULT NULL COMMENT 'API令牌',
  `scope` int(2) DEFAULT 16 COMMENT '权限',
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='create table ddweb_clients_weixin (\r\n	`id` int(11) NOT NULL AUTO_INCREMENT,\r\n	`u_id` int(11) NOT NULL COMMENT ''关联用户ID'',\r\n	`app_id` varchar(32) NOT NULL COMMENT ''开发者ID(AppID)'',\r\n	`app_secret` varchar(64) NOT NULL COMMENT ''开发者密码'',\r\n	`token` varchar(128) NOT NULL COMMENT ''令牌(Token)'',\r\n	`encoding_aes_key` varchar(80) NOT NULL COMMENT "消息加密密钥(EncodingAESKey)",\r\n	`encryption_decrypt` int(2) default ''0'' COMMENT "消息加解密方式",\r\n	`time` int(11) default ''0'' COMMENT "创建时间",\r\n	PRIMARY KEY (`id`)\r\n)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ddweb_clients_user`
--

LOCK TABLES `ddweb_clients_user` WRITE;
/*!40000 ALTER TABLE `ddweb_clients_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `ddweb_clients_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ddweb_clients_weixin`
--

DROP TABLE IF EXISTS `ddweb_clients_weixin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ddweb_clients_weixin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) NOT NULL COMMENT '关联用户ID',
  `app_id` varchar(32) NOT NULL COMMENT '开发者ID(AppID)',
  `app_secret` varchar(64) NOT NULL COMMENT '开发者密码',
  `token` varchar(128) NOT NULL COMMENT '令牌(Token)',
  `encoding_aes_key` varchar(80) NOT NULL COMMENT '消息加密密钥(EncodingAESKey)',
  `encryption_decrypt` int(2) DEFAULT 0 COMMENT '消息加解密方式',
  `time` int(11) DEFAULT 0 COMMENT '创建时间',
  `openid` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ddweb_clients_weixin`
--

LOCK TABLES `ddweb_clients_weixin` WRITE;
/*!40000 ALTER TABLE `ddweb_clients_weixin` DISABLE KEYS */;
INSERT INTO `ddweb_clients_weixin` VALUES (1,1,'wxade94928ff9602e5','5ccb71c72d5669c633b2216cc70dddd4','ddwebtoken','11',0,0,NULL),(2,2,'wx13746b04c2c0eedd','1ac2a2ef82e8322faa09eba659ec59f4','ddwebdsto','11',0,0,NULL);
/*!40000 ALTER TABLE `ddweb_clients_weixin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ddweb_customization_weixin_group_hidden_like`
--

DROP TABLE IF EXISTS `ddweb_customization_weixin_group_hidden_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ddweb_customization_weixin_group_hidden_like` (
  `uid` int(11) unsigned NOT NULL,
  `toid` int(11) unsigned DEFAULT NULL,
  `gid` int(11) unsigned NOT NULL,
  `time` timestamp NULL DEFAULT NULL,
  `type` int(1) DEFAULT 0,
  `u_id` int(11) unsigned DEFAULT NULL,
  KEY `wxgroupid` (`gid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='定制开发的微信群暗恋';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ddweb_customization_weixin_group_hidden_like`
--

LOCK TABLES `ddweb_customization_weixin_group_hidden_like` WRITE;
/*!40000 ALTER TABLE `ddweb_customization_weixin_group_hidden_like` DISABLE KEYS */;
INSERT INTO `ddweb_customization_weixin_group_hidden_like` VALUES (6,5,30,'2018-01-14 13:35:00',0,NULL),(5,4,30,'2018-01-14 13:35:32',0,NULL),(5,6,30,'2018-01-14 13:35:45',0,NULL),(4,5,30,'2018-01-14 13:58:41',0,NULL),(6,4,30,'2018-01-14 14:00:11',0,NULL),(4,5,37,'2018-01-14 14:52:32',0,NULL),(4,6,37,'2018-01-14 15:30:55',0,NULL),(7,6,30,'2018-01-14 17:23:44',0,NULL),(7,6,32,'2018-01-14 17:25:24',0,NULL),(6,5,37,'2018-01-14 17:56:28',0,NULL),(5,7,29,'2018-01-14 18:40:58',0,NULL),(5,6,38,'2018-01-14 18:42:20',0,NULL),(4,7,30,'2018-01-14 18:42:50',0,NULL),(5,7,32,'2018-01-14 18:44:13',0,NULL),(5,6,32,'2018-01-14 18:44:21',0,NULL),(5,7,30,'2018-01-14 18:47:20',0,NULL);
/*!40000 ALTER TABLE `ddweb_customization_weixin_group_hidden_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ddweb_customization_weixin_group_hidden_like_config`
--

DROP TABLE IF EXISTS `ddweb_customization_weixin_group_hidden_like_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ddweb_customization_weixin_group_hidden_like_config` (
  `u_id` int(11) unsigned NOT NULL,
  `name` varchar(120) NOT NULL,
  `to_url` varchar(120) NOT NULL,
  `user` varchar(30) NOT NULL,
  `pwd` varchar(32) NOT NULL,
  `welecom` varchar(200) DEFAULT NULL,
  `indexbgurl` varchar(200) DEFAULT NULL,
  `likebgurl` varchar(200) DEFAULT NULL,
  KEY `u_id` (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='配置文件';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ddweb_customization_weixin_group_hidden_like_config`
--

LOCK TABLES `ddweb_customization_weixin_group_hidden_like_config` WRITE;
/*!40000 ALTER TABLE `ddweb_customization_weixin_group_hidden_like_config` DISABLE KEYS */;
INSERT INTO `ddweb_customization_weixin_group_hidden_like_config` VALUES (2,'暗恋之星','https://www.ddweb.com.cn','admin','123456',NULL,NULL,NULL);
/*!40000 ALTER TABLE `ddweb_customization_weixin_group_hidden_like_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ddweb_group_weixin`
--

DROP TABLE IF EXISTS `ddweb_group_weixin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ddweb_group_weixin` (
  `gid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `time` timestamp NULL DEFAULT NULL,
  `u_id` int(11) unsigned DEFAULT NULL,
  KEY `gid` (`gid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ddweb_group_weixin`
--

LOCK TABLES `ddweb_group_weixin` WRITE;
/*!40000 ALTER TABLE `ddweb_group_weixin` DISABLE KEYS */;
INSERT INTO `ddweb_group_weixin` VALUES (28,4,'2018-01-14 04:19:07',NULL),(30,4,'2018-01-14 12:27:54',NULL),(30,5,'2018-01-14 13:30:43',NULL),(30,6,'2018-01-14 13:34:36',NULL),(32,6,'2018-01-14 14:01:27',NULL),(33,4,'2018-01-14 14:30:42',NULL),(34,4,'2018-01-14 14:36:30',NULL),(35,4,'2018-01-14 14:36:38',NULL),(36,4,'2018-01-14 14:37:01',NULL),(31,4,'2018-01-14 14:37:47',NULL),(37,6,'2018-01-14 14:39:59',NULL),(37,4,'2018-01-14 14:50:34',NULL),(37,5,'2018-01-14 14:51:39',NULL),(30,7,'2018-01-14 17:23:23',NULL),(32,7,'2018-01-14 17:24:00',NULL),(32,5,'2018-01-14 17:46:22',NULL),(29,7,'2018-01-14 17:52:27',NULL),(29,5,'2018-01-14 17:55:27',NULL),(38,6,'2018-01-14 17:57:34',NULL),(39,4,'2018-01-14 17:58:58',NULL),(40,4,'2018-01-14 18:02:14',NULL),(41,4,'2018-01-14 18:11:54',NULL),(42,4,'2018-01-14 18:13:13',NULL),(43,4,'2018-01-14 18:35:22',NULL),(38,5,'2018-01-14 18:40:37',NULL);
/*!40000 ALTER TABLE `ddweb_group_weixin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ddweb_user_weixins`
--

DROP TABLE IF EXISTS `ddweb_user_weixins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ddweb_user_weixins` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `openId` varchar(64) COLLATE utf8_unicode_ci NOT NULL COMMENT '微信ID',
  `nickName` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '昵称',
  `gender` int(1) DEFAULT NULL COMMENT '性别',
  `language` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '语言',
  `city` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '城市',
  `province` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '省份',
  `country` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '国家',
  `avatarUrl` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '头像',
  `time` timestamp NULL DEFAULT NULL COMMENT '时间',
  `extend` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `u_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ddweb_user_weixins`
--

LOCK TABLES `ddweb_user_weixins` WRITE;
/*!40000 ALTER TABLE `ddweb_user_weixins` DISABLE KEYS */;
INSERT INTO `ddweb_user_weixins` VALUES (4,'o96Mm0ePW5OhLLiNRdWNohfyutg8','蓦然回首',1,'en','Guiyang','Guizhou','China','https://wx.qlogo.cn/mmopen/vi_32/iaDiarhUgrr739Fw9YgrLogYOuCVjU2yppq7HM9QiaDTweA9KWuXep0LytUOibRYWM31uGzltm7d1M86bQucUibuDog/0','2018-01-14 04:26:44',NULL,2),(5,'o96Mm0SMf_Z965PUQsogvoVnFrZs','《推理笔记》',2,'zh_CN','Nanjing','Jiangsu','China','https://wx.qlogo.cn/mmopen/vi_32/HlrvJC0YiczoOibGfs2YRLfQnPXxw2KwQBvnEdOpMDfb7rJr5XSrtSF1E9OVO67AZHL2FbqQ9icala7212VwYplow/0','2018-01-14 11:32:54',NULL,2),(6,'o96Mm0R2hnf9gaymQTHnz38qBa2o','闯江湖',0,'zh_CN','','','','https://wx.qlogo.cn/mmopen/vi_32/SnicDUPmqpsriaDRvh8loT7oxV4bneUhQ2zsuX5DNmQO2SicicohvRJ9IuwXcJadliaOHCpD3jpqOI8zHdcvCu4GAwg/0','2018-01-14 13:34:00',NULL,2),(7,'o96Mm0XPE4Lnp1HsgNHzv-N_SEUw','奇迹就在身边',1,'zh_CN','Pudong New District','Shanghai','China','https://wx.qlogo.cn/mmopen/vi_32/DVYaj1yyicAZvt2gSDChoHV9DyNLL30ybZbr2lejJ1qTelnMpiamJajEQQtgUcGeomAxicP8roj0hBGv5aHoEl7Cg/0','2018-01-14 13:53:56',NULL,2);
/*!40000 ALTER TABLE `ddweb_user_weixins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ddweb_user_wxgroups`
--

DROP TABLE IF EXISTS `ddweb_user_wxgroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ddweb_user_wxgroups` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `openGId` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `u_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='用户微信群';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ddweb_user_wxgroups`
--

LOCK TABLES `ddweb_user_wxgroups` WRITE;
/*!40000 ALTER TABLE `ddweb_user_wxgroups` DISABLE KEYS */;
INSERT INTO `ddweb_user_wxgroups` VALUES (28,'G96Mm0X7JyMPnQosXOuJZydRXhlE',NULL),(29,'G96Mm0VAoUdvRKlDR3PjFXmBdCM4',NULL),(30,'G96Mm0T76vwTmsHSoP-Qjh1wLuCQ',NULL),(31,'tG96Mm0b0TZU3uxLGphpyu0rkqmiE',NULL),(32,'G96Mm0eyE6Tjd4h3FH9kbS8KHDEE',NULL),(33,'G96Mm0bdAIm_XsEAV8UTev0gvLtc',NULL),(34,'tG96Mm0ZWR4uHba4teP-XLeRMKpY4',NULL),(35,'tG96Mm0a8QQD30m1v1Wj6jQrLjgAE',NULL),(36,'tG96Mm0fAQFCfMw6UwLLBy2O-78Ns',NULL),(37,'G96Mm0RMdP1VF0-w1thAT6ZWEF-k',NULL),(38,'G96Mm0fJR-m9OGacyXOsnkjNeRJI',NULL),(39,'tG96Mm0Uuo7Pkal1wGI7LhT5Pj-xo',NULL),(40,'tG96Mm0eBym-DPMJyy6TE_o6RsiKI',NULL),(41,'tG96Mm0TeYEJau3fla7GrFpxozJH8',NULL),(42,'tG96Mm0WH_R6uvDSLxcaNdZtnn_KE',NULL),(43,'tG96Mm0b2XzM3jM0_4D1wMz5Wfen0',NULL);
/*!40000 ALTER TABLE `ddweb_user_wxgroups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ddweb_weixin_group`
--

DROP TABLE IF EXISTS `ddweb_weixin_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ddweb_weixin_group` (
  `uid` int(11) DEFAULT NULL,
  `gid` int(11) unsigned DEFAULT NULL,
  `time` timestamp NULL DEFAULT NULL,
  `u_id` int(11) unsigned DEFAULT NULL,
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='微及与群的关联表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ddweb_weixin_group`
--

LOCK TABLES `ddweb_weixin_group` WRITE;
/*!40000 ALTER TABLE `ddweb_weixin_group` DISABLE KEYS */;
INSERT INTO `ddweb_weixin_group` VALUES (4,28,'2018-01-14 04:19:07',NULL),(4,30,'2018-01-14 12:27:54',NULL),(5,30,'2018-01-14 13:30:43',NULL),(6,30,'2018-01-14 13:34:36',NULL),(6,32,'2018-01-14 14:01:27',NULL),(4,33,'2018-01-14 14:30:42',NULL),(4,34,'2018-01-14 14:36:30',NULL),(4,35,'2018-01-14 14:36:38',NULL),(4,36,'2018-01-14 14:37:01',NULL),(4,31,'2018-01-14 14:37:47',NULL),(6,37,'2018-01-14 14:39:59',NULL),(4,37,'2018-01-14 14:50:34',NULL),(5,37,'2018-01-14 14:51:39',NULL),(7,30,'2018-01-14 17:23:23',NULL),(7,32,'2018-01-14 17:24:00',NULL),(5,32,'2018-01-14 17:46:22',NULL),(7,29,'2018-01-14 17:52:27',NULL),(5,29,'2018-01-14 17:55:27',NULL),(6,38,'2018-01-14 17:57:34',NULL),(4,39,'2018-01-14 17:58:58',NULL),(4,40,'2018-01-14 18:02:14',NULL),(4,41,'2018-01-14 18:11:54',NULL),(4,42,'2018-01-14 18:13:13',NULL),(4,43,'2018-01-14 18:35:22',NULL),(5,38,'2018-01-14 18:40:37',NULL);
/*!40000 ALTER TABLE `ddweb_weixin_group` ENABLE KEYS */;
UNLOCK TABLES;


