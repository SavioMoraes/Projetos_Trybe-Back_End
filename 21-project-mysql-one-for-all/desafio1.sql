DROP DATABASE IF EXISTS SpotifyClone;

CREATE DATABASE SpotifyClone;

USE SpotifyClone;

CREATE TABLE planos(
plano_id INT PRIMARY KEY AUTO_INCREMENT,
plano VARCHAR(50) NOT NULL,
plano_valor DECIMAL(4, 2) NOT NULL
) ENGINE=InnoDB;

INSERT INTO planos (plano, plano_valor)
VALUES
('gratuito', 0),
('universitário', 5.99),
('familiar', 7.99);

CREATE TABLE usuarios(
usuario_id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50) NOT NULL,
idade INT,
plano_id INT NOT NULL,
FOREIGN KEY (plano_id) REFERENCES planos (plano_id)    
) ENGINE=InnoDB;

INSERT INTO usuarios (nome, idade, plano_id)
VALUES
('Thati', 23, 1),
('Cintia', 35, 3),
('Bill', 20, 2),
('Roger', 45, 1);

CREATE TABLE artistas(
artista_id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

INSERT INTO artistas (nome)
VALUES
('Walter Phoenix'),
('Peter Strong'),
('Lance Day'),
('Freedie Shannon');

CREATE TABLE albuns(
album_id INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(100) NOT NULL,
artista_id INT NOT NULL,
FOREIGN KEY (artista_id) REFERENCES artistas (artista_id)
) ENGINE=InnoDB;

INSERT INTO albuns (titulo, artista_id)
VALUES
("Envious", 1),
("Exuberant", 1),
("Hallowed Steam", 2),
("Incandescent", 3),
("Temporary Culture", 4);

CREATE TABLE cancoes(
cancao_id INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(100) NOT NULL,
artista_id INT NOT NULL,
album_id INT NOT NULL,
FOREIGN KEY (artista_id) REFERENCES artistas (artista_id),
FOREIGN KEY (album_id) REFERENCES albuns (album_id)
) ENGINE=InnoDB;

INSERT INTO cancoes (titulo, artista_id, album_id)
VALUES
("Soul For Us", 1, 1),
("Reflections Of Magic", 1, 1),
("Dance With Her Own", 1, 1),
("Troubles Of My Inner Fire", 1, 2),
("Time Fireworks", 1, 2),
("Magic Circus", 2, 3),
("Honey, So do I", 2, 3),
("Sweetie, Let's Go Wild", 2, 3),
("She Knows", 2, 3),
("Fantasy For Me", 3, 4),
("Celebration Of More", 3, 4),
("Rock His Everything", 3, 4),
("Home Forever", 3, 4),
("Diamond Power", 3, 4),
("Honey, Let's Be Silly", 3, 4),
("Thang Of Thunder", 4, 5),
("Words Of Her Life", 4, 5),
("Without My Streets", 4, 5);

CREATE TABLE seguindo(
usuario_id INT NOT NULL,
artista_id INT NOT NULL,

CONSTRAINT PRIMARY KEY (usuario_id, artista_id),

FOREIGN KEY (usuario_id) REFERENCES usuarios (usuario_id),
FOREIGN KEY (artista_id) REFERENCES artistas (artista_id)
) ENGINE=InnoDB;

INSERT INTO seguindo (usuario_id, artista_id)
VALUES
(1, 1),
(1, 3),
(1, 4),
(2, 1),
(2, 3),
(3, 1),
(3, 2),
(4, 4);

CREATE TABLE historico_cancoes(
usuario_id INT NOT NULL,
cancao_id INT NOT NULL,

CONSTRAINT PRIMARY KEY (usuario_id, cancao_id),

FOREIGN KEY (usuario_id) REFERENCES usuarios (usuario_id),
FOREIGN KEY (cancao_id) REFERENCES cancoes (cancao_id)
) ENGINE=InnoDB;

INSERT INTO historico_cancoes (usuario_id, cancao_id)
VALUES
(1, 1),
(1, 6),
(1, 14),
(1, 16),
(2, 2),
(2, 13),
(2, 15),
(2, 17),
(3, 4),
(3, 6),
(3, 16),
(4, 3),
(4, 11),
(4, 18);
