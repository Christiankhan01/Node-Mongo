const MongoClient = require('mongodb').MongoClient; 
const assert = require('assert'); 

const url = 'mongodb://localhost:27017/'; 
const dbname = 'conFusion'; 

//Access Server
MongoClient.connect(url, (err, client) => {
    assert.equal(err, null); 

    console.log('Connected correctly to server'); 
//connect to DB
    const db = client.db(dbname); 
    const collection = db.collection('dishes'); 
/**
 * Two Arguements: Insert a document & a callback function
 */
    collection.insertOne({"name": "Uthappizza", "description": "test"},(err, result) => {
        assert.strictEqual(err, null); 

        console.log('After Insert:\n'); 
        console.log(result.ops); 

        collection.find({}).toArray((err, docs) => {
            //check to make sure that error is not null
            assert.strictEqual(err, null); 

            console.log('Found:\n'); 
            console.log(docs); 
            
            db.dropCollection('dishes', (err,result) => {
                assert.strictEqual(err, null); 

                client.close(); 
            });
        });
    }); 
});