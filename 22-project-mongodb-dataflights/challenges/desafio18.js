db.voos.find(
  { "passageiros.pagos": { $gte: 7000 } },
  { vooId: 1, mes: 1, ano: 1, _id: 0 },
).limit(1).pretty();
