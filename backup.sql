-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           12.1.2-MariaDB - MariaDB Server
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para escola
CREATE DATABASE IF NOT EXISTS `escola` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `escola`;

-- Copiando estrutura para tabela escola.alunos
CREATE TABLE IF NOT EXISTS `alunos` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NOME` varchar(120) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela escola.alunos: ~5 rows (aproximadamente)
INSERT INTO `alunos` (`ID`, `NOME`) VALUES
	(2, 'VITOR'),
	(3, 'ARTHUR'),
	(4, 'KAUAN'),
	(5, 'MARÇAL'),
	(7, 'ISAC'),
	(8, 'OLIVIA'),
	(9, 'Isac'),
	(10, 'Coelho');

-- Copiando estrutura para tabela escola.cursos
CREATE TABLE IF NOT EXISTS `cursos` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NOME_CURSO` varchar(120) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela escola.cursos: ~6 rows (aproximadamente)
INSERT INTO `cursos` (`ID`, `NOME_CURSO`) VALUES
	(1, 'Desenvolvedor'),
	(2, 'Informatica'),
	(3, 'Mecânica'),
	(4, 'Eletônica'),
	(5, 'Administração'),
	(6, 'Informatica'),
	(7, 'Pintor');

-- Copiando estrutura para tabela escola.matriculas
CREATE TABLE IF NOT EXISTS `matriculas` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ALUNO_ID` int(11) DEFAULT NULL,
  `CURSOS_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ALUNO_ID` (`ALUNO_ID`),
  KEY `CURSOS_ID` (`CURSOS_ID`),
  CONSTRAINT `1` FOREIGN KEY (`ALUNO_ID`) REFERENCES `alunos` (`ID`),
  CONSTRAINT `2` FOREIGN KEY (`CURSOS_ID`) REFERENCES `cursos` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela escola.matriculas: ~7 rows (aproximadamente)
INSERT INTO `matriculas` (`ID`, `ALUNO_ID`, `CURSOS_ID`) VALUES
	(3, 2, 5),
	(4, 3, 2),
	(5, 4, 3),
	(6, 5, 6),
	(9, 10, 7),
	(10, 9, 6);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
