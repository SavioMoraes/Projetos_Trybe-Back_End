USE SpotifyClone;
DELIMITER $$

CREATE FUNCTION quantidade_musicas_no_historico(id INT)
RETURNS INT READS SQL DATA
BEGIN
    DECLARE total_songs INT;
    SELECT COUNT(usuario_id)
    FROM SpotifyClone.historico_cancoes
    WHERE usuario_id = id INTO total_songs;
    RETURN total_songs;
END $$

DELIMITER ;

SELECT quantidade_musicas_no_historico(3);
