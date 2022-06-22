SELECT customer.ContactName AS 'Nome',
customer.Country AS 'País',
COUNT(C.Country) AS 'Número de compatriotas'
FROM w3schools.customers AS customer
INNER JOIN w3schools.customers AS C ON customer.Country = C.Country
WHERE customer.CustomerID <> C.CustomerID
GROUP BY customer.CustomerID
ORDER BY customer.ContactName ASC;
