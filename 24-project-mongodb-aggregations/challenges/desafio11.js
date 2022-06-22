db.trips.aggregate([
  {
    $project: {
      dia: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $group: {
      _id: "$dia",
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
      diaDaSemana: "$_id",
      total: "$soma",
    },
  },
  {
    $limit: 1,
  },
]);
