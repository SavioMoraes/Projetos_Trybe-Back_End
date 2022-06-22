CREATE VIEW cancoes_premium AS
SELECT c.titulo AS nome, COUNT(h.cancao_id) AS reproducoes
FROM SpotifyClone.historico_cancoes AS h
INNER JOIN SpotifyClone.cancoes AS c
ON h.cancao_id = c.cancao_id
INNER JOIN SpotifyClone.usuarios AS u
ON h.usuario_id = u.usuario_id
WHERE u.plano_id <> 1
GROUP BY c.titulo
ORDER BY nome ASC;
