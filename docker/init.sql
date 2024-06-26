CREATE DATABASE IF NOT EXISTS database01;

USE database01;
CREATE TABLE IF NOT EXISTS table1 (
    `column1` int NOT NULL, 
    `column2` int NOT NULL, 
    `column3` varchar(256) NOT NULL, 
    `column4` int NOT NULL,
    `dateColumn` date NOT NULL);

INSERT INTO table1 (`column1`, `column2`, `column3`, `column4`, `dateColumn`) VALUES
(1,	2,'abc', 5,	'2020-01-01'),
(11, 12, 'abc',	5,	'2021-01-01'),
(21, 22, 'abc',	5,	'2022-01-01'),
(21, 22, 'abc',	3,	'2022-01-01'),
(31, 32, 'def',	5, '2023-01-01');
