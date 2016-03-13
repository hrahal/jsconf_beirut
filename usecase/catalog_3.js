"use strict";

var catalog,
    fakeRequest = require("./fakeReq"),
    fs = require("fs"),
    async = require('async'),
    command = process.argv[2],
    fileName = process.argv[3];

function validateCats(catalog, cb) {
    console.log("validating categories..");

    fakeRequest.categoriesDB({
        categories: catalog.categories
    }, function (err, catsLength) {
        if (err) {
            return cb(err);
        }
        cb();
    });
}

function validatefeats(catalog, cb) {
    console.log("validating features..");

    fakeRequest.featuresDB({
        features: catalog.features
    }, function (err, featsLength) {
        if (err) {
            return cb(err);
        }
        cb();
    });
}

function saveCat(catalog, cb) {
    console.log("saving catalog..");

    fakeRequest.catalogDB.save({
        body: catalog
    }, function (err, saved) {
        if (err) {
            return cb(err);
        } 

        console.log("catalog saved:", saved);
        cb();
    });
}

function checkCatName(catalog, cb) {
    console.log("checking catalog name..");

    fakeRequest.catalogDB.get({
        catalog_name: catalog.catalog_name
    }, function (err, found) {
        if (err) {
            return cb(err);
        }
        cb();
    });
}

function authUser (catalog, cb) {
    console.log("authenticating user: ", catalog.username);

    fakeRequest.authDB({
        username: catalog.username
    }, function (err, valid) {
        if (err) {
            return cb(err);
        }
        cb();
    });
}

function start (catalog) {
    async.series([
        async.apply(authUser, catalog),
        async.apply(checkCatName, catalog),
        async.apply(validateCats, catalog),
        async.apply(validatefeats, catalog),
    ], function (err, results) {
        
        saveCat(catalog, function () {
            console.timeEnd("took");
        });
    });
}

if (command === "validate") {
    var catalog
    console.time("took");
    fs.readFile(fileName, function (err, catalog) {
        if (err) {
            console.log(err);
        }
        catalog = JSON.parse(catalog);
        start(catalog);
    });

} else if (command === "delete") {
    //delete 
    console.log("catalog deleted");
} else {
    console.log("unsupported command", command);
}
