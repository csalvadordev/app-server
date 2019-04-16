-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 16/04/2019 às 19:13
-- Versão do servidor: 10.1.38-MariaDB
-- Versão do PHP: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `qrestaurant`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `idRestaurant` int(11) NOT NULL,
  `plates` longtext NOT NULL,
  `combos` longtext NOT NULL,
  `lunchs` longtext NOT NULL,
  `desserts` longtext NOT NULL,
  `drinks` longtext NOT NULL,
  `adds` longtext NOT NULL,
  `joined` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `idRestaurant` int(11) NOT NULL,
  `restaurantName` varchar(100) NOT NULL,
  `idUser` int(11) DEFAULT NULL,
  `orderList` longtext NOT NULL,
  `subTotal` varchar(100) NOT NULL,
  `isFinalized` int(1) NOT NULL,
  `isPaid` int(1) NOT NULL,
  `joined` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Despejando dados para a tabela `orders`
--

INSERT INTO `orders` (`id`, `idRestaurant`, `restaurantName`, `idUser`, `orderList`, `subTotal`, `isFinalized`, `isPaid`, `joined`) VALUES
(1, 1, 'FoodComida', 0, '[{\"id\":\"1\",\"itemName\":\"Prato Um\",\"itemPrice\":\"55.00\",\"wasAdd\":false,\"qtd\":1,\"type\":\"plate\"},{\"id\":\"2\",\"itemName\":\"Prato Dois\",\"itemPrice\":\"45.00\",\"wasAdd\":false,\"qtd\":1,\"type\":\"plate\"},{\"id\":\"3\",\"itemName\":\"Prato Tres\",\"itemPrice\":\"30.00\",\"wasAdd\":false,\"qtd\":2,\"type\":\"plate\"}]', '160', 0, 0, '2019-04-11'),
(2, 1, 'FoodComida', 0, '\"null\"', 'NULL', 0, 0, '2019-04-11'),
(3, 1, 'FoodComida', 0, '\"null\"', 'NULL', 0, 0, '2019-04-11'),
(4, 1, 'FoodComida', 0, '\"null\"', 'NULL', 0, 0, '2019-04-11'),
(5, 1, 'FoodComida', 0, '\"null\"', 'NULL', 0, 0, '2019-04-11'),
(6, 1, 'FoodComida', 0, '\"null\"', 'NULL', 0, 0, '2019-04-11'),
(7, 1, 'FoodComida', 0, '\"null\"', 'NULL', 0, 0, '2019-04-11'),
(8, 1, 'FoodComida', 0, '\"null\"', 'NULL', 0, 0, '2019-04-11'),
(9, 1, 'FoodComida', 0, '\"null\"', 'NULL', 0, 0, '2019-04-11'),
(10, 1, 'FoodComida', 0, '\"null\"', 'NULL', 0, 0, '2019-04-11'),
(11, 1, 'FoodComida', 0, '\"null\"', 'NULL', 0, 0, '2019-04-11'),
(12, 1, 'FoodComida', 0, '\"null\"', 'NULL', 0, 0, '2019-04-11'),
(13, 1, 'FoodComida', 0, '\"null\"', 'NULL', 0, 0, '2019-04-11'),
(14, 1, 'FoodComida', 0, '\"null\"', 'NULL', 0, 0, '2019-04-11'),
(15, 1, 'FoodComida', 0, '\"null\"', 'NULL', 0, 0, '2019-04-14'),
(16, 1, 'FoodComida', 0, '\"null\"', 'NULL', 0, 0, '2019-04-14'),
(17, 1, 'FoodComida', 0, '\"null\"', 'NULL', 0, 0, '2019-04-14'),
(18, 1, 'FoodComida', 0, '\"null\"', 'NULL', 0, 0, '2019-04-14'),
(19, 1, 'FoodComida', 0, '\"null\"', 'NULL', 0, 0, '2019-04-14'),
(20, 1, 'FoodComida', 0, '\"null\"', 'NULL', 0, 0, '2019-04-14'),
(21, 1, 'FoodComida', 0, '\"null\"', 'NULL', 0, 0, '2019-04-14'),
(22, 1, 'FoodComida', 0, '[{\"id\":\"1\",\"itemName\":\"Prato Um\",\"itemPrice\":\"55.00\",\"wasAdd\":false,\"qtd\":2,\"type\":\"plate\"},{\"id\":\"2\",\"itemName\":\"Prato Dois\",\"itemPrice\":\"45.00\",\"wasAdd\":false,\"qtd\":1,\"type\":\"plate\"},{\"id\":\"3\",\"itemName\":\"Prato Tres\",\"itemPrice\":\"30.00\",\"wasAdd\":false,\"qtd\":1,\"type\":\"plate\"}]', 'NULL', 0, 0, '2019-04-14'),
(23, 1, 'FoodComida', 0, '[{\"id\":\"1\",\"itemName\":\"Prato Um\",\"itemPrice\":\"55.00\",\"wasAdd\":false,\"qtd\":1,\"type\":\"plate\"},{\"id\":\"2\",\"itemName\":\"Prato Dois\",\"itemPrice\":\"45.00\",\"wasAdd\":false,\"qtd\":1,\"type\":\"plate\"},{\"id\":\"3\",\"itemName\":\"Prato Tres\",\"itemPrice\":\"30.00\",\"wasAdd\":false,\"qtd\":3,\"type\":\"plate\"}]', 'NULL', 0, 0, '2019-04-15'),
(24, 1, 'FoodComida', 0, '[{\"id\":\"1\",\"itemName\":\"Prato Um\",\"itemPrice\":\"55.00\",\"wasAdd\":false,\"qtd\":1,\"type\":\"plate\"},{\"id\":\"2\",\"itemName\":\"Prato Dois\",\"itemPrice\":\"45.00\",\"wasAdd\":false,\"qtd\":1,\"type\":\"plate\"},{\"id\":\"3\",\"itemName\":\"Prato Tres\",\"itemPrice\":\"30.00\",\"wasAdd\":false,\"qtd\":2,\"type\":\"plate\"}]', 'NULL', 0, 0, '2019-04-15'),
(25, 1, 'FoodComida', 0, '[{\"id\":\"1\",\"itemName\":\"Prato Um\",\"itemPrice\":\"55.00\",\"wasAdd\":false,\"qtd\":1,\"type\":\"plate\"},{\"id\":\"2\",\"itemName\":\"Prato Dois\",\"itemPrice\":\"45.00\",\"wasAdd\":false,\"qtd\":1,\"type\":\"plate\"},{\"id\":\"3\",\"itemName\":\"Prato Tres\",\"itemPrice\":\"30.00\",\"wasAdd\":false,\"qtd\":2,\"type\":\"plate\"}]', 'NULL', 0, 0, '2019-04-15'),
(26, 1, 'FoodComida', 0, '[{\"id\":\"1\",\"itemName\":\"Prato Um\",\"itemPrice\":\"55.00\",\"wasAdd\":false,\"qtd\":1,\"type\":\"plate\"},{\"id\":\"2\",\"itemName\":\"Prato Dois\",\"itemPrice\":\"45.00\",\"wasAdd\":false,\"qtd\":1,\"type\":\"plate\"},{\"id\":\"3\",\"itemName\":\"Prato Tres\",\"itemPrice\":\"30.00\",\"wasAdd\":false,\"qtd\":2,\"type\":\"plate\"}]', 'NULL', 0, 0, '2019-04-15');

-- --------------------------------------------------------

--
-- Estrutura para tabela `restaurant`
--

CREATE TABLE `restaurant` (
  `id` int(11) NOT NULL,
  `idAndress` int(11) NOT NULL,
  `idMenu` int(11) DEFAULT NULL,
  `restaurantName` varchar(255) NOT NULL,
  `ownerName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `secondaryEmail` varchar(50) NOT NULL,
  `cnpj` varchar(50) NOT NULL,
  `isConfirmed` tinyint(1) NOT NULL,
  `joined` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `email` varchar(100) NOT NULL,
  `data_nasc` date NOT NULL,
  `password` varchar(255) NOT NULL,
  `isConfirmed` int(11) NOT NULL,
  `isAcceptedTerms` int(11) NOT NULL,
  `joined` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `data_nasc`, `password`, `isConfirmed`, `isAcceptedTerms`, `joined`) VALUES
(1, 'Cleberson Carlos de Oliveira Salvador', 'cleberson@westudyou.com', '0000-00-00', '$2a$10$yY0TyB/cOqnKp9tzwDY4LuH0ugoRBsI/go3u/AVy/rPOCBbw5sf1u', 0, 0, '2019-04-09');

--
-- Índices de tabelas apagadas
--

--
-- Índices de tabela `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas apagadas
--

--
-- AUTO_INCREMENT de tabela `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de tabela `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
