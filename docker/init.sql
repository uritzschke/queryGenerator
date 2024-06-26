CREATE DATABASE IF NOT EXISTS database01;

USE database01;
CREATE TABLE IF NOT EXISTS table1 (
    `column1` int NOT NULL, 
    `column2` int NOT NULL, 
    `column3` varchar(256) NOT NULL, 
    `column4` int NOT NULL,
    `dateColumn` date NOT NULL);

INSERT INTO table1 (`column1`, `column2`, `column3`, `column4`, `dateColumn`) VALUES
(1,	2,'abc', 4,	'2000-01-01'),
(11, 12, 'abc',	14,	'2001-01-01'),
(21, 22, 'abc',	24,	'2002-01-01'),
(31, 32, 'def',	34, '2003-01-01');
