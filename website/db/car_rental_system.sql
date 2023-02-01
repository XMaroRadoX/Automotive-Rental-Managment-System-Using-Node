-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 31, 2022 at 07:40 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `car_rental_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `car`
--

CREATE TABLE `car` (
  `car_id` char(10) NOT NULL,
  `brand` varchar(32) DEFAULT NULL,
  `model` varchar(32) DEFAULT NULL,
  `type` varchar(16) DEFAULT NULL,
  `color` varchar(16) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `seating` int(11) DEFAULT NULL,
  `powertrain` varchar(32) DEFAULT NULL,
  `transmission` varchar(16) DEFAULT NULL,
  `rate` int(11) DEFAULT NULL,
  `status` varchar(16) DEFAULT NULL,
  `plate_no` varchar(16) DEFAULT NULL,
  `region` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `car`
--

INSERT INTO `car` (`car_id`, `brand`, `model`, `type`, `color`, `year`, `seating`, `powertrain`, `transmission`, `rate`, `status`, `plate_no`, `region`) VALUES
('050fa71fa7', 'chevrolet', 'aveo', 'compact', 'black', 2022, 4, 'fuel', 'automatic', 200, 'active', '842d5', 'China'),
('0824f973fe', 'bentley', 'continental-gt', 'hatchback', 'white', 2022, 4, 'fuel', 'automatic', 2500, 'active', '149dc', 'Germany'),
('082b2451bd', 'hyundai', 'bayon', 'suv', 'black', 2022, 4, 'fuel', 'manual', 350, 'active', '64d93', 'Egypt'),
('0b7950c222', 'kia', 'sportage', 'suv', 'black', 2022, 4, 'fuel', 'automatic', 550, 'active', 'd4bf6', 'Italy'),
('0c0b9302b6', 'toyota', 'corolla', 'sedan', 'black', 2016, 4, 'fuel', 'automatic', 350, 'active', '44951', 'Germany'),
('0fb99eb830', 'toyota', 'corolla', 'sedan', 'silver', 2016, 4, 'fuel', 'automatic', 350, 'active', 'e47a3', 'Brazil'),
('1167900e7e', 'cadillac', 'ct5', 'sedan', 'black', 2022, 4, 'fuel', 'manual', 2400, 'active', '64cb0', 'Japan'),
('1d25caeb2a', 'toyota', 'corolla', 'sedan', 'white', 2016, 4, 'fuel', 'automatic', 350, 'active', '44166', 'Germany'),
('1dd55b7ee3', 'bentley', 'continental-gt', 'hatchback', 'black', 2022, 4, 'fuel', 'automatic', 2500, 'active', '84dd5', 'France'),
('20c965d144', 'bmw', 'z4', 'coupe', 'white', 2022, 2, 'fuel', 'automatic', 940, 'active', 'b47a0', 'Algeria'),
('23e56d2eab', 'chevrolet', 'cruze', 'sedan', 'silver', 2022, 4, 'fuel', 'automatic', 400, 'active', 'd4a34', 'Algeria'),
('28332ee093', 'jeep', 'wrangler', 'suv', 'black', 2022, 4, 'fuel', 'automatic', 680, 'active', '84a86', 'Italy'),
('2a73728513', 'bugatti', 'chiron', 'sport', 'black', 2022, 2, 'fuel', 'automatic', 3000, 'active', '5471b', 'Italy'),
('2bcc0b69d1', 'chevrolet', 'aveo', 'compact', 'silver', 2022, 4, 'fuel', 'automatic', 200, 'active', 'e49ff', 'Japan'),
('320feb8199', 'cadillac', 'ct5', 'sedan', 'black', 2022, 4, 'fuel', 'manual', 2400, 'active', '24273', 'France'),
('3cfbef3b0a', 'bmw', 'x3', 'suv', 'white', 2022, 4, 'fuel', 'automatic', 465, 'active', 'b451c', 'China'),
('42cca3697d', 'jeep', 'wrangler', 'suv', 'black', 2022, 4, 'fuel', 'automatic', 680, 'active', 'e4eb3', 'Germany'),
('43831f79ac', 'bmw', 'i3', 'hatchback', 'black', 2021, 4, 'electric', 'automatic', 1400, 'active', '64cb6', 'Algeria'),
('43fa707650', 'volkswagen', 'amarok', 'off-road', 'silver', 2022, 4, 'gas', 'manual', 2300, 'active', '56789e', 'Libya'),
('44742a51db', 'bentley', 'bentayga', 'suv', 'black', 2022, 4, 'fuel', 'automatic', 2000, 'active', '34895', 'Italy'),
('4822587542', 'hyundai', 'accent', 'sedan', 'silver', 2022, 4, 'fuel', 'automatic', 350, 'active', 'a4e01', 'Japan'),
('49717b02be', 'chevrolet', 'cruze', 'sedan', 'silver', 2022, 4, 'fuel', 'automatic', 400, 'active', 'c426f', 'France'),
('4be84bfbec', 'hyundai', 'accent', 'sedan', 'black', 2022, 4, 'fuel', 'automatic', 350, 'active', 'c48ff', 'Japan'),
('4ef2658e15', 'mercedes', 'e-class', 'sedan', 'black', 2022, 4, 'fuel', 'automatic', 1850, 'active', 'c45ed', 'Italy'),
('52b1cf1a64', 'kia', 'carens', 'wagon', 'black', 2018, 7, 'fuel', 'automatic', 350, 'active', 'e4ba1', 'Italy'),
('53ad3aab08', 'hyundai', 'bayon', 'suv', 'white', 2022, 4, 'fuel', 'manual', 350, 'active', 'c447e', 'Algeria'),
('5642268959', 'jeep', 'wrangler', 'suv', 'white', 2022, 4, 'fuel', 'automatic', 680, 'active', 'b4080', 'Japan'),
('5baa4751d6', 'bugatti', 'chiron', 'sport', 'silver', 2022, 2, 'fuel', 'automatic', 3000, 'active', 'c4334', 'Italy'),
('610ca73c8e', 'mercedes', 'g-class', 'suv', 'white', 2022, 4, 'fuel', 'automatic', 2400, 'active', 'b45b9', 'Algeria'),
('664a1a2676', 'chevrolet', 'camaro', 'coupe', 'silver', 2022, 2, 'fuel', 'automatic', 1200, 'active', 'b4de3', 'Argentina'),
('67ce36b4cd', 'mercedes', 'e-class', 'sedan', 'silver', 2022, 4, 'fuel', 'automatic', 1850, 'active', '847ab', 'China'),
('6c7aa01728', 'mercedes', 'e-class', 'sedan', 'black', 2022, 4, 'fuel', 'manual', 2400, 'active', '5e322', 'egypt'),
('7527fd64b0', 'toyota', 'corolla', 'sedan', 'silver', 2016, 4, 'fuel', 'automatic', 350, 'active', '74906', 'China'),
('778eeed76f', 'bugatti', 'chiron', 'sport', 'silver', 2022, 2, 'fuel', 'automatic', 3000, 'active', '842ca', 'Argentina'),
('7cadb841ba', 'toyota', 'corolla', 'sedan', 'white', 2016, 4, 'fuel', 'automatic', 350, 'active', '547d9', 'Germany'),
('7f47f18176', 'mercedes', 'g-class', 'suv', 'black', 2022, 4, 'fuel', 'automatic', 2400, 'active', 'f404a', 'China'),
('8194aa15ee', 'aston martin', 'dbx', 'suv', 'silver', 2021, 4, 'fuel', 'automatic', 850, 'reserved', '940ee', 'USA'),
('852ee45b7b', 'aston martin', 'db11', 'coupe', 'white', 2022, 2, 'fuel', 'automatic', 1500, 'active', 'f4276', 'USA'),
('86dce8aee5', 'hyundai', 'bayon', 'suv', 'silver', 2022, 4, 'fuel', 'manual', 350, 'active', 'c4e4d', 'Argentina'),
('92a8b2b13d', 'volkswagen', 'golf', 'sport', 'silver', 2020, 4, 'electric', 'automatic', 1350, 'reserved', '5er332', 'Saudi arabia'),
('98cd9ca200', 'toyota', 'corolla', 'sedan', 'white', 2016, 4, 'fuel', 'automatic', 350, 'active', 'f4df3', 'France'),
('9a5ac71a20', 'audi', 'q3', 'suv', 'black', 2022, 4, 'fuel', 'automatic', 1000, 'active', 'b422a', 'Argentina'),
('9b4641fb82', 'aston martin', 'dbx', 'suv', 'silver', 2021, 4, 'fuel', 'automatic', 850, 'active', '64dd5', 'Germany'),
('a1e963861c', 'bugatti', 'chiron', 'sport', 'black', 2022, 2, 'fuel', 'automatic', 3000, 'active', 'e4e72', 'Brazil'),
('a230c5ce89', 'kia', 'sportage', 'suv', 'black', 2022, 4, 'fuel', 'automatic', 550, 'active', 'b4526', 'Brazil'),
('a29333a397', 'mercedes', 'e-class', 'sedan', 'silver', 2022, 4, 'fuel', 'automatic', 1850, 'active', '2448f', 'Brazil'),
('a85846b746', 'toyota', 'corolla', 'sedan', 'black', 2016, 4, 'fuel', 'automatic', 350, 'active', 'c4086', 'Argentina'),
('a9101a2d9e', 'jeep', 'wrangler', 'suv', 'white', 2022, 4, 'fuel', 'automatic', 680, 'active', '74c25', 'Egypt'),
('b26e6487f1', 'bentley', 'bentayga', 'suv', 'silver', 2022, 4, 'fuel', 'automatic', 2000, 'active', 'c42b4', 'Brazil'),
('b788998247', 'toyota', 'corolla', 'sedan', 'silver', 2016, 4, 'fuel', 'automatic', 350, 'active', 'e4aeb', 'Italy'),
('be3617519c', 'bmw', 'i3', 'hatchback', 'black', 2021, 4, 'electric', 'automatic', 1400, 'active', 'd4781', 'China'),
('bf465623f0', 'aston martin', 'dbx', 'suv', 'silver', 2021, 4, 'fuel', 'automatic', 850, 'active', 'e46e4', 'Egypt'),
('c8d090aa98', 'bugatti', 'chiron', 'sport', 'black', 2022, 2, 'fuel', 'automatic', 3000, 'active', '84f5a', 'France'),
('c93968892d', 'bugatti', 'chiron', 'sport', 'silver', 2022, 2, 'fuel', 'automatic', 3000, 'active', '846df', 'Argentina'),
('ca84c6f91a', 'audi', 'a7', 'sedan', 'black', 2022, 4, 'fuel', 'automatic', 750, 'active', '1429a', 'Japan'),
('cbce4a4a4e', 'bmw', 'i8', 'sport', 'white', 2020, 2, 'gasoline', 'automatic', 1900, 'reserved', '14546', 'Brazil'),
('cfd7afd5b9', 'bugatti', 'chiron', 'sport', 'white', 2022, 2, 'fuel', 'automatic', 3000, 'active', 'a46fa', 'Spain'),
('d3fe9e9f34', 'cadillac', 'ct5', 'sedan', 'silver', 2022, 4, 'fuel', 'manual', 2400, 'active', '943d7', 'USA'),
('da7b7705cb', 'jeep', 'wrangler', 'suv', 'silver', 2022, 4, 'fuel', 'automatic', 680, 'active', 'd4b3b', 'Spain'),
('e1bae8e606', 'bentley', 'bentayga', 'suv', 'silver', 2022, 4, 'fuel', 'automatic', 2000, 'active', 'f4f82', 'Japan'),
('e27c5d1740', 'seat', 'ibiza', 'coupe', 'black', 2020, 4, 'electric', 'automatic', 700, 'active', '53229', 'Egypt'),
('e5670cf2af', 'bugatti', 'chiron', 'sport', 'black', 2022, 2, 'fuel', 'automatic', 3000, 'active', '240de', 'France'),
('eee032719c', 'bugatti', 'chiron', 'sport', 'silver', 2022, 2, 'fuel', 'automatic', 3000, 'active', 'f4985', 'Algeria'),
('f522990665', 'volkswagen', 'golf', 'sport', 'blue', 2022, 4, 'fuel', 'automatic', 1430, 'active', '5e1235', 'Egypt'),
('f628ae014c', 'bmw', 'x2', 'suv', 'silver', 2022, 4, 'fuel', 'automatic', 310, 'active', 'e4ddc', 'Egypt');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` char(10) NOT NULL,
  `email` varchar(320) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  `phone_no` char(32) DEFAULT NULL,
  `fname` varchar(64) DEFAULT NULL,
  `lname` varchar(64) DEFAULT NULL,
  `license_no` varchar(16) DEFAULT NULL,
  `region` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_id`, `email`, `password`, `phone_no`, `fname`, `lname`, `license_no`, `region`) VALUES
('0233602618', 'jessica.reid@example.com', 'a4c6e0982e33c1548320699823796e18609a0993', '08-3738-2506', 'Jessica', 'Reid', 'DDBA8C', 'Australia'),
('0795853c01', 'awyn.nkwnzr@example.com', '01f6c861bf8c1dd06b55c19af49328b66f754b46', '025-44209724', 'آوین', 'نكو نظر', 'D4816B', 'Iran'),
('0f58ad3660', 'addison.brar@example.com', '1706934abb0b33a02c947a09d03febb151e998f6', 'H64 O35-4057', 'Addison', 'Brar', 'CD27BA', 'Canada'),
('1207014c0c', 'vilma.latvala@example.com', '33a9e269dd782e92489a8e547b7ed582e0e1d42b', '04-532-009', 'Vilma', 'Latvala', 'B2B3ED', 'Finland'),
('1864211ab8', 'gregorio.parra@example.com', 'cd92815bf6273acbaf834b9faed277c722068291', '976-975-692', 'Gregorio', 'Parra', '566B5E', 'Spain'),
('1c2d3879f0', 'nym.hmdy@example.com', 'd8362a14e686eb40228b764410256a17f8ba1449', '081-90216610', 'نيما', 'احمدی', '04ACD2', 'Iran'),
('2ea8998967', 'gema.moya@example.com', '44d5369032336a51fe00c7ad691c6d370cd91c90', '918-162-640', 'Gema', 'Moya', 'C8E2D1', 'Spain'),
('3384278395', 'azra.blanchard@example.com', 'f0ae680b6c731816f42d958f1283782bd1f20204', '077 774 94 35', 'Azra', 'Blanchard', 'EC57E8', 'Switzerland'),
('365caca63b', 'jens.roger@example.com', '409e9519c66216726447bd4a07d6aed0475338cc', '077 045 96 22', 'Jens', 'Roger', '6705D8', 'Switzerland'),
('3c68989ffc', 'villads.pedersen@example.com', '4955742b2d74102e861dbbc8004c5527b3fe1337', '67612467', 'Villads', 'Pedersen', 'E26BBE', 'Denmark'),
('41a46e5f39', 'jared.kelly@example.com', 'e029e41f4e015e2ea604a0d81a05a05186f15b03', '031-089-5575', 'Jared', 'Kelly', '10DB51', 'Ireland'),
('45ee5cbb81', 'muharrem.kuntze@example.com', '18109a30a071db8f07608a633fe88306a8419f2b', '0941-6289656', 'Muharrem', 'Kuntze', '0E5823', 'Germany'),
('4db2ad2060', 'kevin.gibson@example.com', 'f90ecb2cdd602cfe77ff30f39182a9fbebbd61b4', '(667) 207-6272', 'Kevin', 'Gibson', '2D0D48', 'United States'),
('4ea4503c00', 'ludvig.skogland@example.com', 'd788956320b23c44b20204cc8ec5a505fc27a1a2', '54062134', 'Ludvig', 'Skogland', '56261A', 'Norway'),
('527ad9570d', 'alberto.calderon@example.com', '052b9bf36698a36bf641fc40a71c73a1d0d7289e', '(604) 491 7211', 'Alberto', 'Calderón', '7CB9FB', 'Mexico'),
('553df7d8e7', 'spasoje.jelacic@example.com', '2689a5aa7f3f352630b6159ebbf0200f6a50e9ea', '036-0071-315', 'Spasoje', 'Jelačić', '0E21CE', 'Serbia'),
('5db67461ff', 'arnoldo.valencia@example.com', '9a158f4d4855a3412b4d4aad4bb5689285affc37', '(651) 725 7043', 'Arnoldo', 'Valencia', '767A5B', 'Mexico'),
('64ae19bc94', 'marwan@gmail.com', '0777f54f29ae7cbcd0b65bc5ec1ca529217c2b52', '+1023949495', 'marwan', 'khaled', '5e993', 'Russia'),
('6637fef415', 'santiago.zamora@example.com', 'c2049e53550c8447e9b38a6bae2a6ef829032999', '(693) 483 9251', 'Santiago', 'Zamora', '73858E', 'Mexico'),
('713d19baec', 'ryan.williamson@example.com', 'cb640badc5f1d11bb92e4b3d157262edd38ca80f', '016977 9382', 'Ryan', 'Williamson', '5460A0', 'United Kingdom'),
('77ab40befa', 'vsevlad.onopenko@example.com', '202c6131ee8b1472f564bb062d6f9213961ca3fd', '(066) F07-1512', 'Vsevlad', 'Onopenko', 'DA1DD9', 'Ukraine'),
('7ced62a102', 'clement.giraud@example.com', '67f9e2a63e7f3c255de0793bf56ab68c91bd3385', '02-29-67-40-63', 'Clément', 'Giraud', '40CFA8', 'France'),
('856ea5abc9', 'esmeralda.olmos@example.com', 'ec4f3a4075a9fc33887d5df656f66bbe461408fb', '(604) 066 2715', 'Esmeralda', 'Olmos', 'AEB2D3', 'Mexico'),
('8af64f3037', 'am@gmail.com', '9a5d338e386950a92c16f72a36b3e9bfaeb3e099', '+201289396052', 'amr', 'yasser', '5ceee4', 'Egypt'),
('9365cd6795', 'lino.rey@example.com', '002b7ecc95217c7be04db6b72ca559d61b49eafa', '04-41-47-83-20', 'Lino', 'Rey', '7C40DA', 'France'),
('9437b1fd3a', 'joe.jones@example.com', '7d29cd70c2477a877a44aa95cac5e2e689eb3d54', '015242 55329', 'Joe', 'Jones', '816786', 'United Kingdom'),
('991aca17ad', 'iina.salminen@example.com', 'cfc07074891c9327bd257cf988f395372832db69', '03-180-255', 'Iina', 'Salminen', '180B6D', 'Finland'),
('9f3a0498a1', 'adonias.rezende@example.com', 'bb78ec0e03070828c4afc4967046e5320eaab65e', '(90) 6707-4439', 'Adónias', 'Rezende', '8B38CE', 'Brazil'),
('ab211e29d5', 'lauren.jennings@example.com', 'b5aa8ac89124145dcb777fbb399abb5709772d17', '071-115-2469', 'Lauren', 'Jennings', '124CAC', 'Ireland'),
('b7a79fe847', 'brice.moura@example.com', '6a11cd2da714e9fdfd4a362d93b9afc7b849b370', '(00) 4062-1581', 'Brice', 'Moura', '184FD4', 'Brazil'),
('bcc364b159', 'tihomir.dokic@example.com', '8e41a601f120cfb1d3c51e637fca7333f0e32691', '036-3250-265', 'Tihomir', 'Dokić', 'A2F70E', 'Serbia'),
('c9a4c3097b', 'amalia.rosvold@example.com', '7d45eb69ce5031338df92947cfd74cc220dd4aa8', '35896131', 'Amalia', 'Rosvold', '1EBACC', 'Norway'),
('ccf3a4fbf3', 'lorenzo.vicente@example.com', '2f00c48d88a6bc3b1db6e852701df043937229bb', '967-589-198', 'Lorenzo', 'Vicente', '7A793A', 'Spain'),
('cd689f0e84', 'nina.meunier@example.com', '91e38e63b890fbb214c8914809fde03c73e7f24d', '05-04-93-54-86', 'Nina', 'Meunier', 'E6A3A1', 'France'),
('e67aef7f94', 'hildegund.reinsch@example.com', '8de12281afc9d5ebc9818353e4d6122c72a0c320', '0607-9111362', 'Hildegund', 'Reinsch', 'CBA108', 'Germany'),
('e82fe53920', 'teresa.stevens@example.com', 'a4bb44eb9667ae0f20abd7dc73fe4a82d68c5bae', '00-4511-4211', 'Teresa', 'Stevens', '8CE30B', 'Australia'),
('ecb368b1b2', 'johnni.black@example.com', 'ac4280ba233116774f7a7e0510ea767c3dab018e', '(346) 614-2934', 'Johnni', 'Black', '9BD189', 'United States'),
('ee18544450', 'gabriel.sanchez@example.com', '4c1b52409cf6be3896cf163fa17b32e4da293f2e', '079 315 08 38', 'Gabriel', 'Sanchez', '61F0E6', 'Switzerland'),
('f997668291', 'victoire.sanchez@example.com', '57885c8b122bee4071870d49d185cd197f8f031b', '04-81-80-80-49', 'Victoire', 'Sanchez', '854088', 'France'),
('fcf7b3b402', 'mikael.lehtinen@example.com', '67f5eefc157032be65183fe19673939ae0a460b2', '07-600-275', 'Mikael', 'Lehtinen', '6C4756', 'Finland');

-- --------------------------------------------------------

--
-- Table structure for table `favourites`
--

CREATE TABLE `favourites` (
  `customer_id` char(10) NOT NULL,
  `car_id` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `favourites`
--

INSERT INTO `favourites` (`customer_id`, `car_id`) VALUES
('64ae19bc94', '0824f973fe'),
('64ae19bc94', '082b2451bd'),
('64ae19bc94', '44742a51db'),
('64ae19bc94', '4be84bfbec'),
('64ae19bc94', '7cadb841ba'),
('8af64f3037', '0b7950c222'),
('8af64f3037', '610ca73c8e'),
('8af64f3037', '8194aa15ee');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `date` date NOT NULL,
  `car_id` char(10) NOT NULL,
  `status` varchar(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`date`, `car_id`, `status`) VALUES
('2022-12-01', '20c965d144', 'reserved'),
('2022-12-01', 'f628ae014c', 'reserved'),
('2022-12-05', '20c965d144', 'rented'),
('2022-12-05', 'f628ae014c', 'rented'),
('2022-12-29', '20c965d144', 'active'),
('2022-12-29', 'f628ae014c', 'active'),
('2022-12-31', '20c965d144', 'active'),
('2022-12-31', '8194aa15ee', 'reserved'),
('2022-12-31', '852ee45b7b', 'active'),
('2022-12-31', '92a8b2b13d', 'reserved'),
('2022-12-31', 'cbce4a4a4e', 'reserved'),
('2022-12-31', 'f628ae014c', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `res_id` char(10) NOT NULL,
  `car_id` char(10) NOT NULL,
  `customer_id` char(10) NOT NULL,
  `return_date` date DEFAULT NULL,
  `method` varchar(32) DEFAULT NULL,
  `pay_status` varchar(64) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `pay_date` date DEFAULT NULL,
  `period` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`res_id`, `car_id`, `customer_id`, `return_date`, `method`, `pay_status`, `total`, `pay_date`, `period`) VALUES
('0222s9344e', 'f628ae014c', '8af64f3037', '2022-12-29', 'cash', 'paid', 7440, '2022-12-29', 24),
('0951s9344e', '20c965d144', '8af64f3037', '2022-12-29', 'credit card', 'paid', 22560, '2022-12-29', 24),
('1f9c4b8dbc', 'f628ae014c', '8af64f3037', '2022-12-31', 'cash', 'paid', 310, '2022-12-31', 1);

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `res_id` char(10) NOT NULL,
  `car_id` char(10) NOT NULL,
  `customer_id` char(10) NOT NULL,
  `date` date DEFAULT NULL,
  `drop_place` varchar(64) DEFAULT NULL,
  `drop_date` date DEFAULT NULL,
  `pick_place` varchar(64) DEFAULT NULL,
  `pick_date` date DEFAULT NULL,
  `res_status` varchar(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`res_id`, `car_id`, `customer_id`, `date`, `drop_place`, `drop_date`, `pick_place`, `pick_date`, `res_status`) VALUES
('0222s9344e', 'f628ae014c', '8af64f3037', '2022-12-01', 'alex', '2023-01-01', 'alex', '2022-12-05', 'returned'),
('0951a8344e', '20c965d144', '8af64f3037', '2022-12-31', 'gouna', '2023-01-29', 'sharm', '2023-01-08', 'revoked'),
('0951s9344e', '20c965d144', '8af64f3037', '2022-12-01', 'alex', '2023-01-01', 'alex', '2022-12-05', 'returned'),
('1f9c4b8dbc', 'f628ae014c', '8af64f3037', '2022-12-31', 'sahel', '2023-02-08', 'agamy', '2022-12-31', 'returned'),
('5ed1472947', '852ee45b7b', '64ae19bc94', '2022-12-31', 'Ramses', '2022-12-31', 'Smouha', '2022-12-31', 'returned'),
('6f9f9b535e', '8194aa15ee', '8af64f3037', '2022-12-31', 'Smouha', '2023-01-31', 'Sidi gaber', '2023-01-01', 'active'),
('7d4be85cc8', 'cbce4a4a4e', '8af64f3037', '2022-12-31', 'marina', '2023-02-21', 'agamy', '2023-01-07', 'active'),
('f100106e53', '92a8b2b13d', '64ae19bc94', '2022-12-31', 'fayoum', '2023-02-28', 'smouha', '2023-01-14', 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`car_id`),
  ADD UNIQUE KEY `plate_no` (`plate_no`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone_no` (`phone_no`),
  ADD UNIQUE KEY `license_no` (`license_no`);

--
-- Indexes for table `favourites`
--
ALTER TABLE `favourites`
  ADD PRIMARY KEY (`customer_id`,`car_id`),
  ADD KEY `car_id` (`car_id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`date`,`car_id`),
  ADD KEY `car_id` (`car_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`res_id`,`customer_id`,`car_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `car_id` (`car_id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`res_id`,`customer_id`,`car_id`),
  ADD KEY `car_id` (`car_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favourites`
--
ALTER TABLE `favourites`
  ADD CONSTRAINT `favourites_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favourites_ibfk_2` FOREIGN KEY (`car_id`) REFERENCES `car` (`car_id`);

--
-- Constraints for table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `history_ibfk_1` FOREIGN KEY (`car_id`) REFERENCES `car` (`car_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `reservations` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`car_id`) REFERENCES `reservations` (`car_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_3` FOREIGN KEY (`res_id`) REFERENCES `reservations` (`res_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`car_id`) REFERENCES `car` (`car_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
