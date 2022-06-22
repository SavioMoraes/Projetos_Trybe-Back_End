CREATE VIEW faturamento_atual AS
SELECT MIN(plano_valor) AS faturamento_minimo,
MAX(plano_valor) AS faturamento_maximo,
ROUND(SUM(plano_valor/4), 2) AS faturamento_medio,
SUM(plano_valor) AS faturamento_total
FROM SpotifyClone.planos;
