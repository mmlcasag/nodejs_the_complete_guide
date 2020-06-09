const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;

const connect = (callback) => {
    MongoClient.connect('mongodb+srv://admin:admin@mmlcasag-cvtew.mongodb.net/shop?retryWrites=true&w=majority', { useUnifiedTopology: true })
        .then(client => {
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
        });
}

const getConnection = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
}

module.exports.connect = connect;
module.exports.getConnection = getConnection;