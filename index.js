const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';
/**
 * The Node MongoDB Driver
 */
//Access Server
MongoClient.connect(url, (err, client) => {
    assert.strictEqual(err, null);

    console.log('Connected correctly to server');
    //connect to DB
    const db = client.db(dbname);

    dboper.insertDocument(db, { name: "Vadonut", description: 'Test' }, 'dishes', (result) => {
        //ops tells you how many operations have been carried out
        console.log('Insert Document:\n', result.ops);

        dboper.findDocuments(db, 'dishes', (docs) => {
            console.log('Found Documents:\n', docs);

            dboper.updateDocument(db, { name: "Vadonut"}, {description: 'Updated Test' }, 'dishes', (result) => {
                console.log('Updated Document:\n', result.result);

                dboper.findDocuments(db, 'dishes', (docs) => {
                    console.log('Found Documents:\n', docs);

                    db.dropCollection('dishes', (result) => {
                        console.log('Dropped Collection:\n ', result);

                        client.close();
                    });
                });
            });

        });
    });
});