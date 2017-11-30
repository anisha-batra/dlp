const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;

const database_url = 'mongodb://localhost:27017/digital_loyalty_program';

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// // Get users
// router.get('/users', (req, res) => {
//     connection((db) => {
//         db.collection('users')
//             .find()
//             .toArray()
//             .then((users) => {
//                 response.data = users;
//                 res.json(response);
//             })
//             .catch((err) => {
//                 sendError(err, res);
//             });
//     });
// });

//==============================================================
// RESTful WEB SERVICES - MEMBERS
//==============================================================

// CREATE
router.post('/member', function (req, res) {
    console.log('Executing Web Service: Create Member');

    var record = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "phone": req.body.phone,
        "email": req.body.email,
        "password": req.body.password,
        "dob": req.body.dob
    };

    MongoClient.connect(database_url, function (err, db) {
        assert.equal(null, err);
        db.collection('members').insertOne(record, function (err, result) {
            assert.equal(err, null);
            console.log("- Added Record: " + record);
            res.send({});
        });
    });
});

// RETRIEVE
router.get('/member/:id', function (req, res) {
    console.log('Executing Web Service: Retrieve Member');

    MongoClient.connect(database_url, function (err, db) {
        assert.equal(null, err);
        db.collection('members').findOne(ObjectId(req.params.id), function (err, doc) {
            assert.equal(err, null);
            console.log("- Fetched Record: " + doc);

            res.setHeader('Content-Type', 'application/json');
            res.json(doc);
        });
    });
});

// UPDATE
router.put('/member/:id', function (req, res) {
    console.log('Executing Web Service: Update Member');

    var record = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "phone": req.body.phone,
        "email": req.body.email,
        "password": req.body.password,
        "dob": req.body.dob
    };

    MongoClient.connect(database_url, function (err, db) {
        assert.equal(null, err);
        db.collection('members').updateOne({ "_id": ObjectId(req.params.id) }, { $set: record });
        console.log('- Updated Record: ' + record);
        res.send('{}');
    });
});

// DELETE
router.delete('/member/:id', function (req, res) {
    console.log('Executing Web Service: Delete Member');

    MongoClient.connect(database_url, function (err, db) {
        assert.equal(null, err);
        db.collection('members').deleteOne({ "_id": ObjectId(req.params.id) }, function () {
            console.log('- Deleted Record');
            res.send({});
        });
    });
});

// RETRIEVE ALL
router.get('/members', function (req, res) {
    console.log('Executing Web Service: Retrieve All Members');

    MongoClient.connect(database_url, function (err, db) {
        assert.equal(null, err);
        db.collection('members').find({}).toArray(function (err, arrayOfDocs) {
            assert.equal(err, null);
            console.log("- All Retieved Records: " + arrayOfDocs);

            res.setHeader('Content-Type', 'application/json');
            res.json(arrayOfDocs);
        });
    });
});

//==============================================================
// RESTful WEB SERVICES - PARTNERS
//==============================================================

// CREATE
router.post('/partner', function (req, res) {
    console.log('Executing Web Service: Create Partner');

    var record = {
        "businessName": req.body.businessName,
        "contactPersonFirstName": req.body.contactPersonFirstName,
        "contactPersonLastName": req.body.contactPersonLastName,
        "contactPersonPhone": req.body.contactPersonPhone,
        "contactPersonEmail": req.body.contactPersonEmail
    };

    MongoClient.connect(database_url, function (err, db) {
        assert.equal(null, err);
        db.collection('partners').insertOne(record, function (err, result) {
            assert.equal(err, null);
            console.log("- Added Record: " + record);
            res.send({});
        });
    });
});

// RETRIEVE
router.get('/partner/:id', function (req, res) {
    console.log('Executing Web Service: Retrieve Partner');

    MongoClient.connect(database_url, function (err, db) {
        assert.equal(null, err);
        db.collection('partners').findOne(ObjectId(req.params.id), function (err, doc) {
            assert.equal(err, null);
            console.log("- Fetched Record: " + doc);

            res.setHeader('Content-Type', 'application/json');
            res.json(doc);
        });
    });
});

// UPDATE
router.put('/partner/:id', function (req, res) {
    console.log('Executing Web Service: Update Partner');

    var record = {
        "businessName": req.body.businessName,
        "contactPersonFirstName": req.body.contactPersonFirstName,
        "contactPersonLastName": req.body.contactPersonLastName,
        "contactPersonPhone": req.body.contactPersonPhone,
        "contactPersonEmail": req.body.contactPersonEmail
    };

    MongoClient.connect(database_url, function (err, db) {
        assert.equal(null, err);
        db.collection('partners').updateOne({"_id": ObjectId(req.params.id)}, { $set: record });
        console.log('- Updated Record: ' + record);
        res.send('{}');
    });
});

// DELETE
router.delete('/partner/:id', function (req, res) {
    console.log('Executing Web Service: Delete Partner');

    MongoClient.connect(database_url, function (err, db) {
        assert.equal(null, err);
        console.log(req.params.id);
        db.collection('partners').deleteOne({"_id": ObjectId(req.params.id)}, function () {
            console.log('- Deleted Record');
            res.send({});
        });
    });
});

// RETRIEVE ALL
router.get('/partners', function (req, res) {
    console.log('Executing Web Service: Retrieve All Partners');

    MongoClient.connect(database_url, function (err, db) {
        assert.equal(null, err);
        db.collection('partners').find({}).toArray(function (err, arrayOfDocs) {
            assert.equal(err, null);
            console.log("- All Retieved Records: " + arrayOfDocs);

            res.setHeader('Content-Type', 'application/json');
            res.json(arrayOfDocs);
        });
    });
});

//==============================================================
// RESTful WEB SERVICES - REDEMPTION ITEMS
//==============================================================

// CREATE
router.post('/redemptionItem', function (req, res) {
    console.log('Executing Web Service: Create Redemption Item');

    var record = {
        "name": req.body.name,
        "description": req.body.description,
        "costInPoints": req.body.costInPoints,
        "displayImage": {
            "filename": req.body.displayImage.filename,
            "filetype": req.body.displayImage.filetype,
            "value": req.body.displayImage.value
        }
    };

    MongoClient.connect(database_url, function (err, db) {
        assert.equal(null, err);
        db.collection('redemptionItems').insertOne(record, function (err, result) {
            assert.equal(err, null);
            console.log("- Added Record: " + record);
            res.send({});
        });
    });
});

// RETRIEVE
router.get('/redemptionItem/:id', function (req, res) {
    console.log('Executing Web Service: Retrieve Redemption Item');

    MongoClient.connect(database_url, function (err, db) {
        assert.equal(null, err);
        db.collection('redemptionItems').findOne(ObjectId(req.params.id), function (err, doc) {
            assert.equal(err, null);
            console.log("- Fetched Record: " + doc);

            res.setHeader('Content-Type', 'application/json');
            res.json(doc);
        });
    });
});

// UPDATE
router.put('/redemptionItem/:id', function (req, res) {
    console.log('Executing Web Service: Update Redemption Item');

    var record = {
        "name": req.body.name,
        "description": req.body.description,
        "costInPoints": req.body.costInPoints,
        "displayImage": {
            "filename": req.body.displayImage.filename,
            "filetype": req.body.displayImage.filetype,
            "value": req.body.displayImage.value
        }
    };

    MongoClient.connect(database_url, function (err, db) {
        assert.equal(null, err);
        db.collection('redemptionItems').updateOne({"_id": ObjectId(req.params.id)}, { $set: record });
        console.log('- Updated Record: ' + record);
        res.send('{}');
    });
});

// DELETE
router.delete('/redemptionItem/:id', function (req, res) {
    console.log('Executing Web Service: Delete Redemption Item');

    MongoClient.connect(database_url, function (err, db) {
        assert.equal(null, err);
        console.log(req.params.id);
        db.collection('redemptionItems').deleteOne({"_id": ObjectId(req.params.id)}, function () {
            console.log('- Deleted Record');
            res.send({});
        });
    });
});

// RETRIEVE ALL
router.get('/redemptionItems', function (req, res) {
    console.log('Executing Web Service: Retrieve All Redemption Items');

    MongoClient.connect(database_url, function (err, db) {
        assert.equal(null, err);
        db.collection('redemptionItems').find({}).toArray(function (err, arrayOfDocs) {
            assert.equal(err, null);
            console.log("- All Retieved Records: " + arrayOfDocs);

            res.setHeader('Content-Type', 'application/json');
            res.json(arrayOfDocs);
        });
    });
});

module.exports = router;