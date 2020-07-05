// by Shivam Shukla
const MongoClient = require('mongodb').MongoClient;

const assert = require('assert');


// Defining connection URL
const url = "mongodb://localhost:27017/";

// Defining DB name
const dbName = 'conFusion';

/////////////////////////////////////////////////////////////////////////////////////////////////////


// Establishing Connection and performing operations using callback functions
MongoClient.connect(url, (err, client) => {

    // checking if error is null i.e there is no error.
    assert.equal(err, null);

    console.log('Connected to server!')

    // Now we can access our DB and collection and perform various operations.
    const db = client.db(dbName);
    const collection = db.collection('dishes');

    // Inserting document top dishes collection
    collection.insertOne({ "name": "Shivam", "desc": "test" }, (err, result) => {

        // Checking if there is no error
        assert.equal(err, null);

        // if no error then
        console.log('Inserted Successfully!\n');

        // printing the operation performed
        console.log(result.ops);

        collection.find({}).toArray((err, docs) => {

            assert.equal(err, null);

            console.log("Found \n");
            console.log(docs)

            // Now removing the collection.
            db.dropCollection('dishes', (err, result) => {
                assert.equal(err, null);

                client.close();
            });
        });
    });
});




/////////////////////////////////////////////////////////////////////////////////


//including operations file to make the db code separate from this file
const db_operations = require('./operations');

MongoClient.connect(url, (err, client) => {

    // checking if error is null i.e there is no error.
    assert.equal(err, null);

    console.log('Connected to server!');

    const db = client.db(dbName);

    db_operations.insertDocument(db, { name: "Shivam", desc: "test" }, 'dishes', (result) => {

        console.log('Inserted Document : \n', result.ops);

        // now finding the docs
        db_operations.findDocument(db, 'dishes', (docs) => {

            console.log("Found Documents : \n", docs);

            // Now updating document
            db_operations.updateDocument(db, { name: "Shivam" }, { desc: "Updated description" }, 'dishes', (result) => {

                console.log("Updated Document : \n", result.result);

                // Again finding all the docs
                db_operations.findDocument(db, 'dishes', (docs) => {

                    console.log("Found Documents : \n", docs);

                    // Now deleting the collection.
                    db.dropCollection('dishes', (result) => {
                        console.log("Dropped Collection!! ", result);
                        client.close();
                    });
                });
            });
        });
    });
});

// Output

// Inserted

// Number of Documents Inserted : 1
// Inserted Document : 
//  [ { name: 'Shivam', desc: 'test', _id: 5f01d8a1ac05321cd804d9d8 } ]
// Found Documents : 
//  [ { _id: 5f01d8a1ac05321cd804d9d8, name: 'Shivam', desc: 'test' } ]
// Updated document with :  { desc: 'Updated description' }
// Updated Document : 
//  { n: 1, nModified: 1, ok: 1 }
// Found Documents : 
//  [
//   {
//     _id: 5f01d8a1ac05321cd804d9d8,
//     name: 'Shivam',
//     desc: 'Updated description'
//   }
// ]
// Dropped Collection!!  null