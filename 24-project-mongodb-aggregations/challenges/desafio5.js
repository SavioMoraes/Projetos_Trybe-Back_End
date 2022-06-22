db.movies.aggregate([
  {
    $match: {
      $and: [
        { countries: { $eq: "USA" } },
        { "tomatoes.viewer.rating": { $gte: 3 } },
      ],
    },
  },
  {
    $addFields: { favorites:
        [
          "Sandra Bullock",
          "Tom Hanks",
          "Julia Roberts",
          "Kevin Spacey",
          "George Clooney",
        ],
    },
  },
  {
    $project: {
      num_favs: {
        $setIntersection: ["$cast", "$favorites"],
      },
      _id: 0,
      title: 1,
    },
  },
  {
    $match: {
      $or: [
        { num_favs: { $size: 1 } },
        { num_favs: { $size: 2 } },
        { num_favs: { $size: 3 } },
        { num_favs: { $size: 4 } },
        { num_favs: { $size: 5 } },
      ],
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  {
    $project: {
      num_favs: 0,
    },
  },
  {
    $skip: 39,
  },
  {
    $limit: 1,
  },
]);
