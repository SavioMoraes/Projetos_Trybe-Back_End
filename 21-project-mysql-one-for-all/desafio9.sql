USE SpotifyClone;
DELIMITER $$

CREATE PROCEDURE albuns_do_artista(IN name VARCHAR(50))
BEGIN
SELECT ar.nome AS artista, al.titulo AS album
FROM artistas AS ar
INNER JOIN albuns AS al ON ar.artista_id = al.artista_id
WHERE ar.nome = name
ORDER BY album;
END $$

DELIMITER ;

CALL albuns_do_artista('Walter Phoenix');
