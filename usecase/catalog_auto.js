"use strict";

var catalog,
    fakeRequest = require("./fakeReq"),
    fs = require("fs"),
    async = require('async'),
    command = process.argv[2],
    fileName = process.argv[3];

function validateCats(callback, results) {
    console.log("validating categories..");

    fakeRequest.categoriesDB({
        categories: results.readInput.categories
    }, function (err, catsLength) {
        
        if (err) {
            return callback(err);
        }
        //new Error('categories not valid'));
        callback();
    });
}

function validatefeats(callback, results) {
    console.log("validating features..");

    fakeRequest.featuresDB({
        features: results.readInput.features
    }, function (err, featsLength) {
        if (err) {
            return callback(err);
        }
        callback();
    });
}

function saveCat(callback, results) {
    console.log("saving catalog..");

    fakeRequest.catalogDB.save({
        body: results.catalog
    }, function (err, saved) {
        if (err) {
            return callback(err);
        }

        console.log("catalog saved:", saved);
        callback();
    });
}

function checkCatName(callback, results) {
    console.log("checking catalog name..");

    fakeRequest.catalogDB.get({
        catalog_name: results.readInput.catalog_name
    }, function (err, found) {
        if (err) {
            return callback(err);
        }
        callback();
    });
}

function authUser(callback, results) {
    console.log("authenticating user: ", results.readInput.username);

    fakeRequest.authDB({
        username: results.readInput.username
    }, function (err, valid) {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
}

function readInput(callback) {
    fs.readFile(fileName, function (err, catalog) {
        if (err) {
            return callback(err);
        }
        catalog = JSON.parse(catalog);
        callback(null, catalog);
    });
}

if (command === "validate") {

    console.time("took");

    async.auto({
        readInput: readInput,
        authUser: ['readInput', authUser],
        checkCatName: ['readInput', checkCatName],
        validateCats: ['readInput', validateCats],
        validatefeats: ['readInput', validatefeats],
        save: ['checkCatName', 'validateCats', 'validatefeats', saveCat]
    }, function (err) {
        
        if (err) {
            console.log(err); 
        }

        console.timeEnd("took");
    });

} else if (command === "delete") {
    //delete 
    console.log("catalog deleted");
} else {
    console.log("unsupported command", command);
}
