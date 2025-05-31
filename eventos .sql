-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 30, 2025 at 10:39 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eventos_bd`
--

-- --------------------------------------------------------

--
-- Table structure for table `eventos`
--

CREATE TABLE `eventos` (
  `id` int(11) NOT NULL,
  `nombre_evento` varchar(100) NOT NULL,
  `fecha_inicio` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fecha_termino` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `descripcion` varchar(100) DEFAULT NULL,
  `ubicacion` varchar(100) DEFAULT NULL,
  `URL` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `eventos`
--

INSERT INTO `eventos` (`id`, `nombre_evento`, `fecha_inicio`, `fecha_termino`, `descripcion`, `ubicacion`, `URL`) VALUES
(1, 'Caminata canina', '2025-05-12 04:00:00', '2025-05-12 04:00:00', 'Participa en familia junto con tus mascotas de una agradable actividad', 'Viña del Mar', 'link'),
(2, 'Maraton 10k', '2025-06-29 04:00:00', '2025-06-29 04:00:00', 'Nueva Maratón desde con con hasta Viña, inscripciones desde mañana a las 12 del día', 'Con Con', 'link'),
(3, 'Triatlon', '2025-10-13 03:00:00', '2025-10-13 03:00:00', '', 'Viña del Mar', 'link'),
(4, 'Maratón 21k', '2025-12-13 03:00:00', '2025-12-13 03:00:00', '', 'Viña del Mar', 'link'),
(5, 'Maratón Puma 10km', '2025-10-05 03:00:00', '2025-10-06 02:59:00', 'El Puma Maratón de Viña del Mar se celebra con un recorrido cuya distancia abarca el borde costero d', 'Viña del Mar', 'https://corre.cl/evento/11375'),
(6, 'Maratón Puma 21km', '2025-10-05 03:00:00', '2025-10-06 02:59:00', 'El Puma Maratón de Viña del Mar se celebra con un recorrido cuya distancia abarca el borde costero d', 'Viña del Mar', 'https://corre.cl/evento/11375'),
(7, 'Maratón Puma 42km', '2025-10-05 03:00:00', '2025-10-06 02:59:00', 'El Puma Maratón de Viña del Mar se celebra con un recorrido cuya distancia abarca el borde costero d', 'Viña del Mar', 'https://corre.cl/evento/11375');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
