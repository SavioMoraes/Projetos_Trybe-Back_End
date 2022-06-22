CREATE VIEW top_3_artistas AS
SELECT a.nome AS artista, COUNT(s.artista_id) AS seguidores
FROM SpotifyClone.artistas AS a
INNER JOIN SpotifyClone.seguindo AS s ON a.artista_id = s.artista_id
GROUP BY a.nome
ORDER BY seguidores DESC, artista ASC
LIMIT 3;
