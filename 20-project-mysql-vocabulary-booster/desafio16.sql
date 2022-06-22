USE hr;
DELIMITER $$

CREATE FUNCTION buscar_quantidade_de_empregos_por_funcionario(email_funcionario VARCHAR(100))
RETURNS INT READS SQL DATA
BEGIN
DECLARE qtd_empregos INT;
SELECT COUNT(jh.EMPLOYEE_ID) AS 'Qtd_empregos'
FROM hr.job_history AS jh
INNER JOIN hr.employees AS e ON jh.EMPLOYEE_ID = e.EMPLOYEE_ID 
WHERE EMAIL = email_funcionario INTO qtd_empregos;
RETURN qtd_empregos;
END $$

DELIMITER ;

SELECT buscar_quantidade_de_empregos_por_funcionario('NKOCHHAR');
