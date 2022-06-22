USE hr;
DELIMITER $$
CREATE PROCEDURE exibir_historico_completo_por_funcionario(IN email VARCHAR(100))
BEGIN
SELECT CONCAT(e.FIRST_NAME, ' ', e.LAST_NAME) AS 'Nome completo',
d.DEPARTMENT_NAME AS 'Departamento',
j.JOB_TITLE AS 'Cargo'
FROM hr.job_history AS jh
INNER JOIN hr.employees AS e ON jh.EMPLOYEE_ID = e.EMPLOYEE_ID
INNER JOIN hr.departments AS d ON jh.DEPARTMENT_ID = d.DEPARTMENT_ID
INNER JOIN hr.jobs AS j ON jh.JOB_ID = j.JOB_ID
WHERE e.EMAIL = email
ORDER BY d.DEPARTMENT_NAME ASC, j.JOB_TITLE;
END $$

DELIMITER ;

CALL exibir_historico_completo_por_funcionario('NKOCHHAR');
