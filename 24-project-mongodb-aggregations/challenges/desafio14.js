db.trips.aggregate([

  {
    $group: {
      _id: "$bikeid",
      media: {
        $avg: {
          $divide: [
            { $subtract: ["$stopTime", "$startTime"] },
            60000,
          ],
        },
      },
    },
  },
  {
    $replaceWith: {
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: "$media",
      },
    },
  },
  {
    $sort: {
      duracaoMedia: -1,
    },
  },
  {
    $limit: 5,
  },
]);
