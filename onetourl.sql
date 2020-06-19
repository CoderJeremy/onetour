/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50729
Source Host           : localhost:3306
Source Database       : onetour

Target Server Type    : MYSQL
Target Server Version : 50729
File Encoding         : 65001

Date: 2020-05-20 16:34:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tour_ad
-- ----------------------------
DROP TABLE IF EXISTS `tour_ad`;
CREATE TABLE `tour_ad` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `ad_position_id` smallint(5) unsigned NOT NULL DEFAULT '0',
  `media_type` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `name` varchar(60) NOT NULL DEFAULT '',
  `link` varchar(255) NOT NULL DEFAULT '',
  `image_url` text NOT NULL,
  `content` varchar(255) NOT NULL DEFAULT '',
  `end_time` int(11) NOT NULL DEFAULT '0',
  `enabled` tinyint(3) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `position_id` (`ad_position_id`),
  KEY `enabled` (`enabled`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tour_address
-- ----------------------------
DROP TABLE IF EXISTS `tour_address`;
CREATE TABLE `tour_address` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `user_id` varchar(50) NOT NULL DEFAULT '0',
  `address` varchar(120) NOT NULL DEFAULT '',
  `mobile` varchar(60) NOT NULL DEFAULT '',
  `is_default` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `address_detail` varchar(120) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tour_attribute
-- ----------------------------
DROP TABLE IF EXISTS `tour_attribute`;
CREATE TABLE `tour_attribute` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `attribute_category_id` int(11) unsigned NOT NULL DEFAULT '0',
  `name` varchar(60) NOT NULL DEFAULT '',
  `input_type` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `values` text NOT NULL,
  `sort_order` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `cat_id` (`attribute_category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tour_cart
-- ----------------------------
DROP TABLE IF EXISTS `tour_cart`;
CREATE TABLE `tour_cart` (
  `id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL DEFAULT '0',
  `goods_id` int(11) unsigned NOT NULL DEFAULT '0',
  `goods_name` varchar(120) NOT NULL DEFAULT '',
  `retail_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `number` int(5) unsigned NOT NULL DEFAULT '0',
  `list_pic_url` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=138 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tour_category
-- ----------------------------
DROP TABLE IF EXISTS `tour_category`;
CREATE TABLE `tour_category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(90) DEFAULT '',
  `keywords` varchar(255) DEFAULT '',
  `front_desc` varchar(255) DEFAULT '',
  `parent_id` int(11) unsigned DEFAULT '0',
  `sort_order` tinyint(1) unsigned DEFAULT '50',
  `show_index` tinyint(1) DEFAULT '0',
  `banner_url` varchar(255) DEFAULT '',
  `icon_url` varchar(255) DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `wap_banner_url` varchar(255) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT '0',
  `front_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_id` (`parent_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10052003 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tour_channel
-- ----------------------------
DROP TABLE IF EXISTS `tour_channel`;
CREATE TABLE `tour_channel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL DEFAULT '',
  `url` varchar(255) NOT NULL DEFAULT '',
  `icon_url` varchar(255) NOT NULL DEFAULT '',
  `sort_order` int(4) unsigned NOT NULL DEFAULT '10',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1010001 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tour_collect
-- ----------------------------
DROP TABLE IF EXISTS `tour_collect`;
CREATE TABLE `tour_collect` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL DEFAULT '0',
  `goods_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `add_time` int(11) unsigned NOT NULL DEFAULT '0',
  `is_attention` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否是关注',
  `type_id` int(2) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `goods_id` (`goods_id`),
  KEY `is_attention` (`is_attention`)
) ENGINE=MyISAM AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tour_country
-- ----------------------------
DROP TABLE IF EXISTS `tour_country`;
CREATE TABLE `tour_country` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `list_pic_url` varchar(255) NOT NULL DEFAULT '',
  `simple_desc` varchar(255) NOT NULL DEFAULT '',
  `pic_url` varchar(255) NOT NULL DEFAULT '',
  `sort_order` tinyint(3) unsigned NOT NULL DEFAULT '50',
  `is_show` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `floor_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `app_list_pic_url` varchar(255) NOT NULL DEFAULT '',
  `is_new` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `new_pic_url` varchar(255) NOT NULL DEFAULT '',
  `new_sort_order` tinyint(2) unsigned NOT NULL DEFAULT '10',
  PRIMARY KEY (`id`),
  KEY `is_show` (`is_show`)
) ENGINE=MyISAM AUTO_INCREMENT=1046012 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tour_goods
-- ----------------------------
DROP TABLE IF EXISTS `tour_goods`;
CREATE TABLE `tour_goods` (
  `id` int(11) unsigned NOT NULL,
  `category_id` int(11) unsigned NOT NULL DEFAULT '0',
  `goods_sn` varchar(60) NOT NULL DEFAULT '',
  `name` varchar(120) NOT NULL DEFAULT '',
  `brand_id` int(11) unsigned NOT NULL DEFAULT '0',
  `goods_number` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `keywords` varchar(255) NOT NULL DEFAULT '',
  `goods_brief` varchar(255) NOT NULL DEFAULT '',
  `goods_desc` text,
  `is_on_sale` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `add_time` int(10) unsigned NOT NULL DEFAULT '0',
  `sort_order` smallint(4) unsigned NOT NULL DEFAULT '100',
  `is_delete` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `attribute_category` int(11) unsigned NOT NULL DEFAULT '0',
  `counter_price` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '专柜价格',
  `extra_price` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '附加价格',
  `is_new` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `goods_unit` varchar(45) NOT NULL COMMENT '商品单位',
  `primary_pic_url` varchar(255) NOT NULL COMMENT '商品主图',
  `list_pic_url` varchar(255) NOT NULL COMMENT '商品列表图',
  `retail_price` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '零售价格',
  `is_hot` tinyint(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `goods_sn` (`goods_sn`),
  KEY `cat_id` (`category_id`),
  KEY `brand_id` (`brand_id`),
  KEY `goods_number` (`goods_number`),
  KEY `sort_order` (`sort_order`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tour_goods_attribute
-- ----------------------------
DROP TABLE IF EXISTS `tour_goods_attribute`;
CREATE TABLE `tour_goods_attribute` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `goods_id` int(11) unsigned NOT NULL DEFAULT '0',
  `attribute_id` int(11) unsigned NOT NULL DEFAULT '0',
  `value` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `goods_id` (`goods_id`),
  KEY `attr_id` (`attribute_id`)
) ENGINE=MyISAM AUTO_INCREMENT=872 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tour_goods_gallery
-- ----------------------------
DROP TABLE IF EXISTS `tour_goods_gallery`;
CREATE TABLE `tour_goods_gallery` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `goods_id` int(11) unsigned NOT NULL DEFAULT '0',
  `img_url` varchar(255) NOT NULL DEFAULT '',
  `img_desc` varchar(255) NOT NULL DEFAULT '',
  `sort_order` int(11) unsigned NOT NULL DEFAULT '5',
  PRIMARY KEY (`id`),
  KEY `goods_id` (`goods_id`)
) ENGINE=MyISAM AUTO_INCREMENT=684 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tour_goods_issue
-- ----------------------------
DROP TABLE IF EXISTS `tour_goods_issue`;
CREATE TABLE `tour_goods_issue` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goods_id` varchar(11) DEFAULT NULL,
  `question` text,
  `answer` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tour_keywords
-- ----------------------------
DROP TABLE IF EXISTS `tour_keywords`;
CREATE TABLE `tour_keywords` (
  `keyword` varchar(90) NOT NULL DEFAULT '',
  `is_hot` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `is_default` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `is_show` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `sort_order` int(11) unsigned NOT NULL DEFAULT '100',
  `scheme _url` varchar(255) NOT NULL DEFAULT '' COMMENT '关键词的跳转链接',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`keyword`,`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COMMENT='热闹关键词表';

-- ----------------------------
-- Table structure for tour_order
-- ----------------------------
DROP TABLE IF EXISTS `tour_order`;
CREATE TABLE `tour_order` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL DEFAULT '0',
  `goods_id` varchar(50) DEFAULT 'true',
  `allprice` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tour_search_history
-- ----------------------------
DROP TABLE IF EXISTS `tour_search_history`;
CREATE TABLE `tour_search_history` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `keyword` char(50) NOT NULL,
  `from` varchar(45) NOT NULL DEFAULT '' COMMENT '搜索来源，如PC、小程序、APP等',
  `add_time` int(11) NOT NULL DEFAULT '0' COMMENT '搜索时间',
  `user_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tour_topic
-- ----------------------------
DROP TABLE IF EXISTS `tour_topic`;
CREATE TABLE `tour_topic` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '''''',
  `content` text,
  `avatar` varchar(255) DEFAULT '',
  `item_pic_url` varchar(255) DEFAULT '',
  `subtitle` varchar(255) DEFAULT '''',
  `topic_category_id` int(11) unsigned DEFAULT '0',
  `price_info` decimal(10,2) unsigned DEFAULT '0.00',
  `read_count` varchar(255) DEFAULT '0',
  `scene_pic_url` varchar(255) DEFAULT '',
  `topic_template_id` int(11) unsigned DEFAULT '0',
  `topic_tag_id` int(11) unsigned DEFAULT '0',
  `sort_order` int(11) unsigned DEFAULT '100',
  `is_show` tinyint(1) unsigned DEFAULT '1',
  KEY `topic_id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=316 DEFAULT CHARSET=utf8mb4;
