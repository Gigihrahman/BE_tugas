-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 23, 2024 at 10:46 AM
-- Server version: 8.0.30
-- PHP Version: 8.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testing12`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `item_details`
--

CREATE TABLE `item_details` (
  `id` int NOT NULL,
  `payment_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `item_details`
--

INSERT INTO `item_details` (`id`, `payment_id`, `user_id`, `product_id`, `quantity`, `total_price`, `createdAt`, `updatedAt`) VALUES
(1, '5fec1073-35fe-4abb-981e-f87d2ab13c55', 1, 4, 25, 2000000.00, '2024-07-17 07:22:11', '2024-07-17 07:22:11'),
(2, '5fec1073-35fe-4abb-981e-f87d2ab13c55', 1, 5, 4, 2300000.00, '2024-07-17 07:22:11', '2024-07-17 07:22:11'),
(3, '5fec1073-35fe-4abb-981e-f87d2ab13c55', 1, 5, 1, 2300000.00, '2024-07-17 07:22:11', '2024-07-17 07:22:11'),
(4, '36a8f422-eb9a-4deb-a0fc-59ccf1fd12b2', 1, 5, 16, 2300000.00, '2024-07-17 07:24:27', '2024-07-17 07:24:27'),
(5, '5f83f2a2-0098-466c-81aa-6b6827dfdc38', 1, 5, 16, 2300000.00, '2024-07-17 07:24:58', '2024-07-17 07:24:58'),
(6, 'b0e00400-95f0-425f-b2e7-fad40bc0ac01', 1, 5, 16, 2300000.00, '2024-07-17 07:25:12', '2024-07-17 07:25:12'),
(7, '8ce5f1a4-e7ec-42c4-9605-9b8b04fe0b1d', 1, 5, 16, 2300000.00, '2024-07-17 07:25:45', '2024-07-17 07:25:45'),
(8, '9bc22573-5040-4844-b1b0-c86f5ce842ba', 1, 5, 16, 2300000.00, '2024-07-18 16:01:12', '2024-07-18 16:01:12'),
(11, '98cd8728-4dfa-421c-b0af-3327f9d6811e', NULL, 3, 16, 100000.00, '2024-07-22 15:59:39', '2024-07-22 15:59:39');

-- --------------------------------------------------------

--
-- Table structure for table `merks`
--

CREATE TABLE `merks` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `merks`
--

INSERT INTO `merks` (`id`, `name`, `image`, `url`, `createdAt`, `updatedAt`) VALUES
(1, 'hmns', '', '', '2024-07-13 12:35:36', '2024-07-13 12:35:36'),
(2, 'hamble', '', '', '2024-07-13 12:35:36', '2024-07-13 12:35:36'),
(3, 'alt', '', 'http://localhost:5000/images/[object Object].png', '2024-07-21 13:08:05', '2024-07-21 13:08:05'),
(4, 'alt', '', 'http://localhost:5000/images/[object Object].png', '2024-07-21 13:09:19', '2024-07-21 13:09:19'),
(5, 'cob', '0aa20ff89110c5a90e4687c9994ecfa8.png', 'http://localhost:5000/images/0aa20ff89110c5a90e4687c9994ecfa8.png', '2024-07-21 13:09:58', '2024-07-21 14:22:31'),
(6, 'coba-co2', '', 'http://localhost:5000/images/', '2024-07-21 13:45:20', '2024-07-21 13:47:49'),
(7, 'coba-co2', '', 'http://localhost:5000/images/', '2024-07-21 13:52:32', '2024-07-21 13:52:45'),
(8, 'coba-co2', '', 'http://localhost:5000/images/', '2024-07-21 13:55:11', '2024-07-21 13:58:40'),
(9, 'cob', '0aa20ff89110c5a90e4687c9994ecfa8.png', 'http://localhost:5000/images/0aa20ff89110c5a90e4687c9994ecfa8.png', '2024-07-21 14:05:30', '2024-07-21 14:06:53');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` int DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `gross_amount` decimal(10,2) NOT NULL,
  `bank` varchar(255) DEFAULT NULL,
  `transaction_status` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `user_id`, `transaction_id`, `gross_amount`, `bank`, `transaction_status`, `token`, `createdAt`, `updatedAt`) VALUES
('36a8f422-eb9a-4deb-a0fc-59ccf1fd12b2', 1, NULL, 9269000.00, NULL, 'Pending', '6f723dbd-d904-4d33-ad90-6f09373b8f7d', '2024-07-17 07:24:27', '2024-07-17 07:24:27'),
('5f83f2a2-0098-466c-81aa-6b6827dfdc38', 1, NULL, 9269000.00, NULL, 'Pending', 'f254dd06-6d1a-4260-8af2-e2ccf82e6be7', '2024-07-17 07:24:58', '2024-07-17 07:24:58'),
('5fec1073-35fe-4abb-981e-f87d2ab13c55', 1, NULL, 17245000.00, NULL, 'Pending', 'fd8b6684-841b-4cfd-9870-06d48b7dfb3c', '2024-07-17 07:22:11', '2024-07-17 07:22:11'),
('8ce5f1a4-e7ec-42c4-9605-9b8b04fe0b1d', 1, NULL, 9269000.00, NULL, 'Pending', '8e8ad828-5947-4ad9-b989-0c92e0ccab76', '2024-07-17 07:25:45', '2024-07-17 07:25:45'),
('98cd8728-4dfa-421c-b0af-3327f9d6811e', 1, NULL, 952000.00, NULL, 'Pending', '6ea6be80-be20-4eac-b76c-a79db77dfdf2', '2024-07-22 15:59:39', '2024-07-22 15:59:39'),
('9bc22573-5040-4844-b1b0-c86f5ce842ba', 1, NULL, 9269000.00, NULL, 'Success', 'd770caaa-f517-4203-814e-fb41544f719a', '2024-07-18 16:01:12', '2024-07-18 16:01:12'),
('b0e00400-95f0-425f-b2e7-fad40bc0ac01', 1, NULL, 9269000.00, NULL, 'Pending', 'eb64551a-6a07-4dc3-81fd-4c157ec2a207', '2024-07-17 07:25:12', '2024-07-17 07:25:12');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `berat` int DEFAULT NULL,
  `merkId` int DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `stock` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `price`, `description`, `berat`, `merkId`, `url`, `stock`, `createdAt`, `updatedAt`) VALUES
(3, 'halooajaaku', '4a883374ce93995d90803227f8fc6eb6.jpg', 100000, 'loram ipsum 222312312311111', 2000, 2, 'http://localhost:5000/images/4a883374ce93995d90803227f8fc6eb6.jpg', 0, '2022-05-23 15:22:08', '2024-07-22 13:37:15'),
(4, 'Aigner X Limited', '10a3320314d749bfd11f2480baaa4ae5.jpg', 2000000, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur necessitatibus labore eos dignissimos fugit error, aliquam beatae quaerat. Dignissimos asperiores itaque amet odit magnam nobis nam harum repellat soluta ad.\r\n', 800, 1, 'http://localhost:5000/images/10a3320314d749bfd11f2480baaa4ae5.jpg', 0, '2022-05-24 01:50:31', '2022-05-25 21:30:58'),
(5, '212 Sexy Men', '', 2300000, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur necessitatibus labore eos dignissimos fugit error, aliquam beatae quaerat. Dignissimos asperiores itaque amet odit magnam nobis nam harum repellat soluta ad.\r\n', 200, 2, 'http://localhost:5000/images/', 0, '2022-05-24 02:36:32', '2024-07-21 13:24:41'),
(7, 'Aigner No 1 OUD', 'aa256da03a5eae1f969787f212996af8.jpg', 213333, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur necessitatibus labore eos dignissimos fugit error, aliquam beatae quaerat. Dignissimos asperiores itaque amet odit magnam nobis nam harum repellat soluta ad.\r\n', 300, 1, 'http://localhost:5000/images/aa256da03a5eae1f969787f212996af8.jpg', 0, '2022-05-24 02:38:13', '2022-05-25 21:31:33'),
(8, 'Aigner Platinum', 'c454370ed7cc1bcd9c1b47cabc5b70b3.jpg', 3444444, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur necessitatibus labore eos dignissimos fugit error, aliquam beatae quaerat. Dignissimos asperiores itaque amet odit magnam nobis nam harum repellat soluta ad.\r\n', 200, 1, 'http://localhost:5000/images/c454370ed7cc1bcd9c1b47cabc5b70b3.jpg', 0, '2022-05-25 21:32:01', '2022-05-25 21:34:29'),
(9, 'Aigner Pur Home', '2623de7f063ee72f4eca495ff1a90169.jpg', 544443, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur necessitatibus labore eos dignissimos fugit error, aliquam beatae quaerat. Dignissimos asperiores itaque amet odit magnam nobis nam harum repellat soluta ad.\r\n', 200, 2, 'http://localhost:5000/images/2623de7f063ee72f4eca495ff1a90169.jpg', 0, '2022-05-25 21:35:04', '2022-05-25 21:35:04'),
(10, 'Bulgari White', '5c060424c5c6956be047c830733d91c7.jpg', 200000, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur necessitatibus labore eos dignissimos fugit error, aliquam beatae quaerat. Dignissimos asperiores itaque amet odit magnam nobis nam harum repellat soluta ad.\r\n', 200, 1, 'http://localhost:5000/images/5c060424c5c6956be047c830733d91c7.jpg', 0, '2022-05-25 21:35:45', '2022-05-25 21:35:45'),
(11, 'Bulgari Home Soir', '99f518ec6a505089f50b9352c3649990.jpg', 500000, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur necessitatibus labore eos dignissimos fugit error, aliquam beatae quaerat. Dignissimos asperiores itaque amet odit magnam nobis nam harum repellat soluta ad.\r\n', 400, 1, 'http://localhost:5000/images/99f518ec6a505089f50b9352c3649990.jpg', 0, '2022-05-25 21:36:20', '2022-05-25 21:36:20'),
(12, 'Lacoste Black', 'ea7a85c8e38401b2416e679cee4412e3.jpg', 6000000, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur necessitatibus labore eos dignissimos fugit error, aliquam beatae quaerat. Dignissimos asperiores itaque amet odit magnam nobis nam harum repellat soluta ad.\r\n', 6000, 1, 'http://localhost:5000/images/ea7a85c8e38401b2416e679cee4412e3.jpg', 0, '2022-05-25 21:53:45', '2022-05-25 21:53:45'),
(13, 'Bulgari Men', 'b50095152339425fa77783100f35bc9d.jpg', 700000, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur necessitatibus labore eos dignissimos fugit error, aliquam beatae quaerat. Dignissimos asperiores itaque amet odit magnam nobis nam harum repellat soluta ad.\r\n', 252, 2, 'http://localhost:5000/images/b50095152339425fa77783100f35bc9d.jpg', 0, '2022-05-25 21:54:08', '2022-05-25 21:54:08'),
(14, 'Bulgari Jasmine', '0541bf43a8994e6f30ffa43bd2d73ee3.jpg', 9000000, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur necessitatibus labore eos dignissimos fugit error, aliquam beatae quaerat. Dignissimos asperiores itaque amet odit magnam nobis nam harum repellat soluta ad.\r\n', 567, 1, 'http://localhost:5000/images/0541bf43a8994e6f30ffa43bd2d73ee3.jpg', 0, '2022-05-25 21:54:32', '2022-05-25 21:54:32'),
(15, 'Charlie Revlon', '7ed29fbf6adb1454ffd34ca3639d58b3.jpg', 1000000, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur necessitatibus labore eos dignissimos fugit error, aliquam beatae quaerat. Dignissimos asperiores itaque amet odit magnam nobis nam harum repellat soluta ad.\r\n', 120, 1, 'http://localhost:5000/images/7ed29fbf6adb1454ffd34ca3639d58b3.jpg', 0, '2022-05-25 21:54:51', '2022-05-25 21:54:51');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `province_code` int DEFAULT NULL,
  `city_code` int DEFAULT NULL,
  `subdistricts_code` int DEFAULT NULL,
  `full_address` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `province_code`, `city_code`, `subdistricts_code`, `full_address`, `createdAt`, `updatedAt`) VALUES
(1, 'password', '', '$2a$10$h4XfrXXyK/2i0EjouwFkjuCpYy4/DGda17VoSwj9MEsfcjdmZE8qu', NULL, NULL, 114, '', '2024-07-01 06:03:50', '2024-07-01 06:03:50'),
(2, 'akuaja', 'akuu@mail.com', '$2a$11$SBXmKjNwjBqaTsitYyL5OeTTi8M9YEA8YnG/Uf8VUs33bojlRMmly', 0, 0, 0, '', '2024-07-13 14:54:50', '2024-07-13 14:54:50'),
(4, 'akuaja123', 'akuu123@mail.com', '$2b$10$ksA1tSc4EELJee5.NFBp5egcwD/jV6WTtkemaxhHB1jNjxoD3jKCu', 0, 0, 0, '', '2024-07-13 15:09:10', '2024-07-13 15:09:10'),
(5, 'akuaja1233', 'akuu12333@mail.com', '$2b$10$5pcOWUkIddaytqaSMwNjAu0JRRjEJ723704/54gHG86FWVVw9xlSm', 0, 0, 0, '', '2024-07-13 15:19:27', '2024-07-13 15:19:27'),
(6, 'akuaja1234', 'akuu1234@mail.com', '$2b$10$5r0A46kzk/0kmc2vmvq5YeBb4nSlXHBTyQVD7ix97UhdZehnbqocW', 0, 0, 0, '', '2024-07-13 15:24:16', '2024-07-13 15:24:16'),
(7, 'akuaja1235', 'akuu1235@mail.com', '$2b$10$NFIM2362AkPPiizf9Dguguj8bZeJ9qtqvv6SwI14HjehPS6vDZiEW', 0, 0, 0, '', '2024-07-13 15:26:08', '2024-07-13 15:26:08'),
(8, 'akuaja12356', 'akuu12356@mail.com', '$2b$10$KRraWdcjfdWlXMOVtR6DzuCITV3CbsNm1m3bapko.93HEsszy6/5O', 0, 0, 0, '', '2024-07-13 15:26:41', '2024-07-13 15:26:41'),
(9, 'akuaja123567', 'akuu123567@mail.com', '$2b$10$qxyCicCuO1U03MJBzAbnvedZBn4la6nyM1F67fsDaXx1ag9CGwe9y', 0, 0, 0, '', '2024-07-13 15:28:46', '2024-07-13 15:28:46'),
(10, 'akuaja1235678', 'akuu1235678@mail.com', '$2b$10$tlB7Rl74kiGV8L6.ztzhCejTDBTV9yAZOgUXlkmdP7QUcX32GNUrW', 0, 0, 0, '', '2024-07-13 15:36:53', '2024-07-13 15:36:53'),
(12, 'akuhebat', 'akuhebat@mail.com', '$2b$10$h10eVxxoXc0aeXR1rE/aiuCTMj1uZWU6qwED181crOQm4i5r82nMq', 10, 250, 3532, '', '2024-07-13 15:58:58', '2024-07-13 15:58:58'),
(13, 'gigih rahmandita', '111202013169@mhs.dinus.ac.id', '$2b$10$GoEY7O6GXReLozF0SfrMte..ogH17/RpedgnZQoK9Sdx.T902kkme', 10, 380, 5296, '', '2024-07-13 16:01:42', '2024-07-13 16:01:42'),
(14, 'oioi', 'oioi@mail.com', '$2b$10$K4E.OU5whaOB.ZJBfxhLs.jLEFuUCIbPzyeBxTcpoh4.PU8T2bny.', 16, 257, 3652, '', '2024-07-13 16:03:52', '2024-07-13 16:03:52'),
(15, 'akuaja12356789', 'akuu12356789@mail.com', '$2b$10$HtagU0SWf7Ej6Dz84ruSnuCP295Hi.3bTrWjK/DVLMmBCs4sQ4YHO', 0, 0, 0, '', '2024-07-13 16:04:30', '2024-07-13 16:04:30'),
(16, 'oi213', 'oi123@mail.com', '$2b$10$QiE1XhFN8C2OEpGuc/8nCeS1iGNFZGUxyx5Z1RtyivSAusicnfkLS', 0, 0, 0, '', '2024-07-13 16:05:45', '2024-07-13 16:05:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `item_details`
--
ALTER TABLE `item_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payment_id` (`payment_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `merks`
--
ALTER TABLE `merks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `transaction_id` (`transaction_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_id` (`id`),
  ADD KEY `merkId` (`merkId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `item_details`
--
ALTER TABLE `item_details`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `merks`
--
ALTER TABLE `merks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `item_details`
--
ALTER TABLE `item_details`
  ADD CONSTRAINT `item_details_ibfk_1` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `item_details_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `item_details_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`merkId`) REFERENCES `merks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
