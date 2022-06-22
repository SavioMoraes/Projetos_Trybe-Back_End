USE SpotifyClone;
DELIMITER $$

CREATE TRIGGER trigger_usuario_delete
BEFORE DELETE ON usuarios
FOR EACH ROW
BEGIN
DELETE FROM historico_cancoes
WHERE historico_cancoes.usuario_id = old.usuario_id;
DELETE FROM seguindo
WHERE seguindo.usuario_id = old.usuario_id;
END $$

DELIMITER ;
