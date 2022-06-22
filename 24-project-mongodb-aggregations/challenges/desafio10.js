db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      media: {
        $avg: {
          $divide: [
            { $subtract: ["$stopTime", "$startTime"] },
            3600000,
          ],
        },
      },
    },
  },
  {
    $replaceWith: {
      tipo: "$_id",
      duracaoMedia: {
        $round: ["$media", 2],
      },
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);

/*
* Consultei o repositório do Cesar Bhering para resolver o problema com a trnasformação de
data para hora/minutos.
* Link: https://github.com/tryber/sd-011-mongodb-aggregations/pull/70/commits/fcb848ee2b31751236a92f137737069f30c60352
*/
