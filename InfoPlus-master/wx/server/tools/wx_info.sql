/*
 Navicat Premium Data Transfer

 Source Server         : Localhost
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost
 Source Database       : wx_info

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : utf-8

 Date: 08/10/2017 22:22:52 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `cSessionInfo`
-- ----------------------------
DROP TABLE IF EXISTS `cSessionInfo`;
CREATE TABLE `cSessionInfo` (
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `skey` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `session_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_info` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`open_id`),
  KEY `openid` (`open_id`) USING BTREE,
  KEY `skey` (`skey`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会话管理用户信息';


-- ----------------------------
--  Table structure for `cGroupInfo`
-- ----------------------------
DROP TABLE IF EXISTS `cGroupInfo`;
CREATE TABLE `cGroupInfo` (
  `user_open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_by` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_by_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `group_id` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `group_name` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='群组信息';

-- ----------------------------
--  Table structure for `cGroupTask`
-- ----------------------------
DROP TABLE IF EXISTS `cGroupTask`;
CREATE TABLE `cGroupTask` (
  `task_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_by` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_by_name` varchar(100) COLLATE utf8mb4_unicode_ci,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `detail` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_single` tinyint(1) DEFAULT 0,
  `req_location` tinyint(1) DEFAULT 0,
  `req_name` tinyint(1) DEFAULT 0,
  `end_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='群任务信息';

-- ----------------------------
--  Table structure for `cTaskShare`
-- ----------------------------
DROP TABLE IF EXISTS `cTaskShare`;
CREATE TABLE `cTaskShare` (
  `task_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group_id` varchar(100) COLLATE utf8mb4_unicode_ci,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `share_ticket` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`task_id`,`share_ticket`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='群任务分享信息';

-- ----------------------------
--  Table structure for `cTaskStatus`
-- ----------------------------
DROP TABLE IF EXISTS `cTaskStatus`;
CREATE TABLE `cTaskStatus` (
  `task_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `read_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `read_count` int NOT NULL DEFAULT 0,
  `last_read_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_completed` tinyint(1) DEFAULT 0,
  `completed_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `completed_location` varchar(50) COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`task_id`,`user_open_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='群任务处理状态';

-- ----------------------------
--  Table structure for `cUserName`
-- ----------------------------
DROP TABLE IF EXISTS `cUserName`;
CREATE TABLE `cUserName` (
  `user_open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_open_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户实名信息';

-- ----------------------------
--  Table structure for `cTaskGroupInfo`
-- ----------------------------
DROP TABLE IF EXISTS `cTaskGroupInfo`;
CREATE TABLE `cTaskGroupInfo` (
  `task_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `share_ticket` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group_name` varchar(100) COLLATE utf8mb4_unicode_ci,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,  
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='任务群组信息';



SET FOREIGN_KEY_CHECKS = 1;
