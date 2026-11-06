-- Contact List Database Schema
-- Import this file into MySQL/MariaDB (e.g. via phpMyAdmin) before using the app.

CREATE DATABASE IF NOT EXISTS `contactlist` DEFAULT CHARACTER SET utf8mb4;
USE `contactlist`;

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `contact_id` INT(11) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `contact_number` VARCHAR(15) NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`contact_id`),
  UNIQUE KEY `unique_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Sample data (optional - matches the original static demo contacts)
--

INSERT INTO `contacts` (`first_name`, `last_name`, `email`, `contact_number`) VALUES
('Nathan Braxton', 'Ares', 'nbchares@gmail.com', '09228765476'),
('Khugo', 'Auditor', 'k.auditor@gmail.com', '09184271738'),
('Andrea Keisha', 'To Chip', 'tochipandrea@gmail.com', '09177201945');
