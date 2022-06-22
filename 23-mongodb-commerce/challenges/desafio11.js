db.produtos.updateMany(
  {},
  { $push: { tags: { $each: ["combo", "tasty"], $sort: 1 } } },
);
/* 
** busquei ajuda para resolução do desafio em:
** https://docs.mongodb.com/manual/reference/operator/update/sort/
*/

db.produtos.find(
  {}, 
  { _id: 0, nome: 1, tags: 1 },
);