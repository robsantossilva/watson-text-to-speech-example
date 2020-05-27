CREATE DATABASE IF NOT EXISTS teste_watson;
CREATE TABLE IF NOT EXISTS `teste_watson`.`comentarios` (
  `id` VARCHAR(255) NOT NULL,
  `message` VARCHAR(255) NOT NULL,
  `audio` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`)
);