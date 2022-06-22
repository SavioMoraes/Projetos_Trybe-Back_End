SELECT CONCAT(employees.FIRST_NAME, ' ', employees.LAST_NAME) AS 'Nome completo funcionário 1',
employees.SALARY AS 'Salário funcionário 1',
employees.PHONE_NUMBER AS 'Telefone funcionário 1',
CONCAT(E.FIRST_NAME, ' ', E.LAST_NAME) AS 'Nome completo funcionário 2',
E.SALARY AS 'Salário funcionário 2',
E.PHONE_NUMBER AS 'Telefone funcionário 2'
FROM hr.employees AS employees
INNER JOIN hr.employees AS E ON employees.JOB_ID = E.JOB_ID
WHERE CONCAT(employees.FIRST_NAME, ' ', employees.LAST_NAME) <> CONCAT(E.FIRST_NAME, ' ', E.LAST_NAME)
ORDER BY CONCAT(employees.FIRST_NAME, ' ', employees.LAST_NAME) ASC, CONCAT(E.FIRST_NAME, ' ', E.LAST_NAME) ASC;
