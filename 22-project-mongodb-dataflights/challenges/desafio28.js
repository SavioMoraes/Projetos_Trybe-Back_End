db.resumoVoos.insertOne(
  { 
    empresa: "LATAM AIRLINES BRASIL", 
    totalVoosDomesticos: 20026,
  },
);

db.resumoVoos.findOne(
  { empresa: "LATAM AIRLINES BRASIL" }, 
  {
    _id: 0, 
    empresa: 1, 
    totalVoosDomesticos: 1,
  },
);
