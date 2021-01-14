DROP TABLE IF EXISTS account;
CREATE TABLE account(
`userid` varchar(36) NOT NULL,
`username` nvarchar(100) NOT NULL,
`password` nvarchar(100) NOT NULL,
`displayname` nvarchar(100) NOT NULL,
`birthday` DATE DEFAULT (CURRENT_DATE - INTERVAL 18 YEAR),
`gender` INT DEFAULT 0,
`phone` nvarchar(100) DEFAULT N'0',
`avatar` nvarchar(200) DEFAULT 'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png',
`create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
`update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (userid,username)
);

DROP TABLE IF EXISTS `group`;
CREATE TABLE `group`(
  `groupid` varchar(36) NOT NULL,
  `groupname` nvarchar(100) NOT NULL,
  `group_image` nvarchar(200) DEFAULT 'https://thebusinesscore.com/wp-content/themes/community-builder/assets/images/avatars/group-default-avatar.png',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (groupid)
);

DROP TABLE IF EXISTS `groupdetail`;
CREATE TABLE `groupdetail`(
  `groupid` varchar(36) NOT NULL,
  `userid` varchar(36) NOT NULL,
  `join_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (groupid) REFERENCES `group`(groupid),
  FOREIGN KEY (userid) REFERENCES account(userid)
);

DROP TABLE IF EXISTS `message`;
CREATE TABLE `message`(
  `messageid` varchar(36) NOT NULL,
  `type` nvarchar(100) DEFAULT 'TEXT',
  `content` nvarchar(1000) NOT NULL,
  `sender` varchar(36) NOT NULL,
  `groupid` varchar(36) NOT NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (sender) REFERENCES account(userid),
  FOREIGN KEY (groupid) REFERENCES `group`(groupid)
);