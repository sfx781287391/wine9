-- 创建商之桥商城数据库
DROP DATABASE IF EXISTS `szq`;

CREATE DATABASE IF NOT EXISTS `szq` DEFAULT CHARACTER SET `utf8`;

USE `szq`;
-- 如果
DROP TABLE IF EXISTS `szq_person_vip`;
CREATE TABLE `szq_person_vip` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '个人用户ID，逐渐自增',
    `uname` varchar(30) NOT NULL COMMENT '用户名，唯一',
    `upwd` varchar(32) NOT NULL COMMENT '密码,MD5',
    PRIMARY KEY (`id`)
)
