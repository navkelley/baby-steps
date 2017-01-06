var MongoClient = require('mongodb').MongoClient;


MongoClient.connect('mongodb://localhost/', function(err, db) {
    if (err) {
        console.error(err);
        db.close();
        return;
    }
    console.log('Connected to MongoDB database');
    db.close();
});