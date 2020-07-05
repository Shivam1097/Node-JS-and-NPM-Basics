const assert = require('assert');
const { clearLine } = require('readline');


///////////////////////////////////////////////////////////////////////////////////////

// Using CALLBACKS

// exports.insertDocument = (db, document, collection, callback) => {

//     // defining the collection name from parameter
//     const coll = db.collection(collection);


//     // inserting docs
//     coll.insert(document, (err, result) => {
//         assert.equal(err, null);

//         console.log("Inserted\n");
//         console.log("Number of Documents Inserted : " + result.result.n);

//         // Now passing the result to the callback
//         callback(result);
//     })
// };

// exports.findDocument = (db, collection, callback) => {
//     const coll = db.collection(collection);

//     // finding all documents
//     coll.find({}).toArray((err, result) => {

//         // checking if no error
//         assert.equal(err, null);

//         // Simply passing the result to callbacks.
//         callback(result);
//     })

// };

// exports.removeDocument = (db, document, collection, callback) => {
//     const coll = db.collection(collection);

//     // deleting
//     coll.deleteOne(document, (err, result) => {
//         assert.equal(err, null);

//         console.log("Removed the document! ", document)
//         callback(result)
//     })

// };


// exports.updateDocument = (db, document, update, collection, callback) => {
//     const coll = db.collection(collection);

//     coll.updateOne(document, { $set: update }, null, (err, result) => {

//         assert.equal(err, null);

//         console.log("Updated document with : ", update);

//         callback(result);
//     });
// };

/////////////////////////////////////////////////////////////////////////////////////////////


// To resolve and reject PROMISES, we need to first return the promise .


exports.insertDocument = (db, document, collection, callback) => {

    // defining the collection name from parameter
    const coll = db.collection(collection);


    // inserting docs
    return coll.insert(document);
};

exports.findDocument = (db, collection, callback) => {
    const coll = db.collection(collection);

    // finding all documents
    return coll.find({}).toArray();

};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);

    // deleting
    return coll.deleteOne(document);

};


exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);

    return coll.updateOne(document, { $set: update }, null);
};