// const { MongoClient } = require('mongodb');
// require('dotenv');

// const OPTIONS = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// const MONGO_DB_URL = `mongodb://${process.env.HOST || 'mongodb'}:27017/Cookmaster`;
// let DB_NAME = null;

// function connection() {
//   return DB_NAME
//   ? Promise.resolve(DB_NAME)
//   : MongoClient.connect(MONGO_DB_URL, OPTIONS)
//   .then((conn) => {
//   DB_NAME = conn.db('Cookmaster');
//   return DB_NAME;
//   });
// }

// module.exports = connection;

// const { MongoClient } = require('mongodb');

// const OPTIONS = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// };

// const MONGO_DB_URL = 'mongodb://127.0.0.1:27017/Cookmaster';

// let db = null;

// function connection() {
//     return db
//     ? Promise.resolve(db)
//     : MongoClient.connect(MONGO_DB_URL, OPTIONS)
//     .then((conn) => {
//     db = conn.db('Cookmaster');
//     return db;
//     });
// }

// module.exports = connection;

const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_DB_URL = `mongodb://${process.env.HOST || 'mongodb'}:27017/Cookmaster`;
const DB_NAME = 'Cookmaster';

const connection = () =>
  MongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = connection;