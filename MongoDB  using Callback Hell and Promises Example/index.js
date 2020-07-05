// by Shivam Shukla
const MongoClient = require('mongodb').MongoClient;
const db_operations = require('./operations');

const assert = require('assert');


// Defining connection URL
const url = "mongodb://localhost:27017/";

// Defining DB name
const dbName = 'conFusion';


/////////////////////////////////////////////////////////////////////////////////////////////////////

//========================== USING CALLBACKS ===========================================//



// MongoClient.connect(url, (err, client) => {

//     // checking if error is null i.e there is no error.
//     assert.equal(err, null);

//     console.log('Connected to server!');

//     const db = client.db(dbName);

//     db_operations.insertDocument(db, { name: "Shivam", desc: "test" }, 'dishes', (result) => {

//         console.log('Inserted Document : \n', result.ops);

//         // now finding the docs
//         db_operations.findDocument(db, 'dishes', (docs) => {

//             console.log("Found Documents : \n", docs);

//             // Now updating document
//             db_operations.updateDocument(db, { name: "Shivam" }, { desc: "Updated description" }, 'dishes', (result) => {

//                 console.log("Updated Document : \n", result.result);

//                 // Again finding all the docs
//                 db_operations.findDocument(db, 'dishes', (docs) => {

//                     console.log("Found Documents : \n", docs);

//                     // Now deleting the collection.
//                     db.dropCollection('dishes', (result) => {
//                         console.log("Dropped Collection!! ", result);
//                         client.close();
//                     });
//                 });
//             });
//         });
//     });
// });

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


/////////////////////////////////////////////////////////////////////////////////


//========================== USING PROMISES ===========================================//


MongoClient.connect(url)
    .then((client) => {


        console.log('Connected to server!');

        const db = client.db(dbName);

        // We are doing promise chaining.

        db_operations.insertDocument(db, { name: "Shivam", desc: "test" }, 'dishes')
            .then((result) => {

                console.log('Inserted Document : \n', result.ops);
                return db_operations.findDocument(db, 'dishes')

            })
            .then((docs) => {

                console.log("Found Documents : \n", docs);
                return db_operations.updateDocument(db, { name: "Shivam" }, { desc: "Updated description" }, 'dishes')

            })
            .then((result) => {

                console.log("Updated Document : \n", result.result);
                return db_operations.findDocument(db, 'dishes');

            })
            .then((docs) => {

                console.log("Found Documents : \n", docs);
                return db.dropCollection('dishes');

            })
            .then((result) => {

                console.log("Dropped Collection!! ", result);
                client.close();

            }).catch((err) => {

                console.log("Error Caught! ", err)

            });
    })
    .catch((err) => {

        console.log("Error Caught! ", err)

    });


// Output

// Inserted Document : 
//  [ { name: 'Shivam', desc: 'test', _id: 5f020e348fac5d0f51571f12 } ]
// Found Documents : 
//  [ { _id: 5f020e348fac5d0f51571f12, name: 'Shivam', desc: 'test' } ]
// Updated Document : 
//  { n: 1, nModified: 1, ok: 1 }
// Found Documents : 
//  [
//   {
//     _id: 5f020e348fac5d0f51571f12,
//     name: 'Shivam',
//     desc: 'Updated description'
//   }
// ]
// Dropped Collection!!  true