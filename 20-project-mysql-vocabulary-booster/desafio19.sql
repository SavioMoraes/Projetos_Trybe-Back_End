DELIMITER $$

CREATE FUNCTION exibir_quantidade_pessoas_contratadas_por_mes_e_ano(mes VARCHAR(2), ano VARCHAR(4))
RETURNS INT READS SQL DATA
BEGIN
DECLARE qtd_pessoas_contratadas INT;
SELECT COUNT(HIRE_DATE) AS 'Qtd_contratados'
FROM hr.employees 
WHERE mes = MONTH(HIRE_DATE) && ano = YEAR(HIRE_DATE) INTO qtd_pessoas_contratadas;
RETURN qtd_pessoas_contratadas;
END $$

DELIMITER ;

SELECT exibir_quantidade_pessoas_contratadas_por_mes_e_ano(6, 1987);
