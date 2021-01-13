DROP TABLE IF EXISTS account;
CREATE TABLE account(
`userid` char(36) NOT NULL,
`role` int DEFAULT 1,
`username` nvarchar(100) not NULL,
`password` nvarchar(100) NOT NULL,
`displayname` nvarchar(100) DEFAULT ' ',
`birthday` DATE DEFAULT (CURRENT_DATE - INTERVAL 18 YEAR),
`gender` INT DEFAULT 0,
`phone` nvarchar(100) DEFAULT N'0',
`create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
`update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (userid,username)
);

