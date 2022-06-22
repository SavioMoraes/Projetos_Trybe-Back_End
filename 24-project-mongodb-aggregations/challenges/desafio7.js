db.movies.aggregate([
  {
    $match: {
      languages: { $all: ["English"] },
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      media: { $avg: "$imdb.rating" },
    },
  },
  {
    $addFields: {
      mediaIMDB: {
        $round: ["$media", 1],
      },
    },
  },
  {
    $sort: {
      numeroFilmes: -1,
      _id: -1,
    },
  },
  {
    $project: {
      media: 0,
    },
  },
]);
