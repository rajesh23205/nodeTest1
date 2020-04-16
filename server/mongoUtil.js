// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
// const url = "mongodb://localhost:27017/fagli";
const url = "mongodb+srv://root:root@cluster0-tzbzz.mongodb.net/test?retryWrites=true&w=majority"

var db;

module.exports = {

  connectToServer: function () {
    db = mongoose.createConnection(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    // .catch(error => handleError(error));
    console.log("Conection has been created");
  },

  getDb: function () {
    return db;
  },

  // createCollection: function (collectionName) {
  //   _db.createCollection(collectionName, function (err, res) {
  //     if (err) throw err;
  //     console.log("Collection created!");
  //   });
  // },

  closeConnection: function () {
    _db.close();
  },
};
