var MongoClient = require('mongodb').MongoClient;


MongoClient.connect('mongodb://localhost/', function(err, db) {
    if (err) {
        console.error(err);
        db.close();
        return;
    }
    
    let measurements = db.collection('measurements');
    let narratives = db.collection('narrative');
    let users = db.collection('users');

    let create = function() {
        let user = {
            username: username,
            password: password
        };

        let narrative = {
            date: date,
            title: title,
            content: content
        };

        let measurement = {
            date: date,
            content: content
        };
        measurements.insert(measurement, function(err, result) {
            if (err) {
                console.error("Could not create measurement", date);
                db.close();
                return;
            }
            console.log("Created measurement", date);
            db.close();
        });
    

        narratives.insert(narrative, function(err, result) {
            if (err) {
                console.error("Could not create narrative", title);
                db.close();
                return;
            }
            console.log("Created narrative", title);
            db.close();
        });

        users.insert(user, function(err, result) {
            if (err) {
                console.error("Could not create user", username);
                db.close();
                return;
            }
            console.log("Created user", username);
            db.close();
        });
    };

    let read = function() {
        let userQuery = {
            username: username
        };

        let narrQuery = {
            title: title
        };

        let query = {
        date: date
        };

        measurements.findOne(query, function(err, measurement) {
            if (!measurement || err) {
                console.error("Could not read measurement", date);
                db.close();
                return;
            }
            console.log("Read measurement", measurement.date);
            console.log(measurement.content);
            db.close();
        });

        narratives.findOne(narrQuery, function(err, narrative) {
            if (!measurement || err) {
                console.error("Could not read narrative", title);
                db.close();
                return;
            }
            console.log("Read narrative", narrative.title);
            console.log(narrative.content, narrative.date);
            db.close();
        });

        users.findOne(userQuery, function(err, username) {
            if (!username || err) {
                console.error("Could not read username", username);
                db.close();
                return;
            }
            console.log("Read username", user.username);
            db.close();
        });
    };

    let update = function() {
        let narrQuery = {
            title: title
        };

        let userQuery = {
            username: username
        };

        let query = {
            date: date
        };

        let update = {
            $set: {content: content}
        };

        let narrUpdate = {
            $set: {
                title: title,
                content: content 
            }
        };

        let userUpdate = {
            $set: {password: password}
        };

        measurements.findAndModify(query, null, update, function(err, result) {
            let measurement = result.value;
            if (!measurement || err) {
                console.error("Could not update measurement", date);
                db.close();
                return;
            }
            console.log("Updated measurement", measurement.date);
            db.close();
        });

        narratives.findAndModify(narrQuery, null, narrUpdate, function(err, result) {
            let narrative = result.value;
            if (!narrative || err) {
                console.error("Could not update narrative", title);
                db.close();
                return;
            }
            console.log("Updated narrative", narrative.title);
            db.close();
        });

        users.findAndModify(userQuery, null, userUpdate, function(err, result) {
            let user = result.value;
            if (!user || err) {
                console.error("Could not update user", username);
                db.close();
                return;
            }
            console.log("Updated user", user.username);
            db.close();
        });
    };

    let del = function(name, content) {
        let narrQuery = {
            title: title
        };

        let userQuery = {
            username: username
        };

        let query = {
            date: date
        };
    
        measurements.findAndRemove(query, function(err, result) {
            let measurement = result.value;
            if (!measurement || err) {
                console.error("Could not delete measurement", date);
                db.close();
                return;
            }
            console.log("Deleted measurement", measurement.date);
            db.close();
        });

        narratives.findAndRemove(narrQuery, function(err, result) {
            let narrative = result.value;
            if (!narrative || err) {
                console.error("Could not delete narrative", title);
                db.close();
                return;
            }
            console.log("Deleted narrative", narrative.title);
            db.close();
        });

        users.findAndRemove(userQuery, function(err, result) {
            let user = result.value;
            if (!user || err) {
                console.error("Could not delete user", username);
                db.close();
                return;
            }
            console.log("Deleted user", user.username);
            db.close();
        });
    };

    let main = function() {
        if (process.argv[2] == 'create') {
            create(process.argv[3], process.argv[4]);
        }
        else if (process.argv[2] == 'read') {
            read(process.argv[3]);
        }
        else if (process.argv[2] == 'update') {
            update(process.argv[3], process.argv[4]);
        }
        else if (process.argv[2] == 'delete') {
            del(process.argv[3]);
        }
        else {
            console.error('Command not recognized');
            db.close();
        }
    };

    main();
}); 