db.movies.aggregate([
  {
    $match: {
      awards: {
        $all: [/Won/i, /Oscar/i],
      },
    },
  },
  {
    $group: {
      _id: null,
      maior_rating: {
        $max: "$imdb.rating",
      },
      menor_rating: {
        $min: "$imdb.rating",
      },
      media: {
        $avg: "$imdb.rating",
      },
      desvio: {
        $stdDevSamp: "$imdb.rating",
      },
    },
  },
  {
    $addFields: {
      media_rating: {
        $round: ["$media", 1],
      },
      desvio_padrao: {
        $round: ["$desvio", 1],
      },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: 1,
      menor_rating: 1,
      media_rating: 1,
      desvio_padrao: 1,
    },
  },
]);

/*
* Consultei o repositório do Bruno Duarte para resolver o problema com o regex na linha 5.
* Link: https://github.com/tryber/sd-011-mongodb-aggregations/pull/55/commits/1375af42ea2959b71f90ed7010d5f116db729445
*/
