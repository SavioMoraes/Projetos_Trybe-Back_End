db.trips.aggregate([
  {
    $addFields: {
      dia: { $dayOfMonth: "$startTime" },
      mes: { $month: "$startTime" },
      ano: { $year: "$startTime" },
    },
  },
  {
    $match: {
      dia: 10,
      mes: 3,
      ano: 2016,
    },
  },
  {
    $group: {
      _id: "$dia",
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
      duracaoMediaEmMinutos: {
        $ceil: "$media",
      },
    },
  },
]);
