db.trips.aggregate([
  {
    $addFields: {
      dia: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $match: {
      dia: 5,
    },
  },
  {
    $group: {
      _id: "$startStationName",
      soma: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      soma: -1,
    },
  },
  {
    $replaceWith: {
      nomeEstacao: "$_id",
      total: "$soma",
    },
  },
  {
    $limit: 1,
  },
]);
