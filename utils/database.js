const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const connect = (callback) => {
    MongoClient.connect('mongodb+srv://admin:admin@mmlcasag-cvtew.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected!');
        _db = client.db();
        callback(client);
    })
    .catch(err => {
        console.log(err);
        throw err;
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