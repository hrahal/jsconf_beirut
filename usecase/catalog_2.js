"use strict";

var fakeRequest = require("./fakeReq"),
    fs = require("fs"),
    command = process.argv[2],
    fileName = process.argv[3];

function validateCats(catalog) {
    console.log("validating categories..");

    fakeRequest.categoriesDB({
        categories: catalog.categories
    }, function (err, catsLength) {
        if (err) {
            console.log(err);
        }
        validatefeats(catalog);
    });
}

function validatefeats(catalog) {
    console.log("validating features..");

    fakeRequest.featuresDB({
        features: catalog.features
    }, function (err, featsLength) {
        if (err) {
            console.log(err);
        }
        saveCat(catalog);
    });
}

function saveCat(catalog) {
    console.log("saving catalog..");

    fakeRequest.catalogDB.save({
        body: catalog
    }, function (err, saved) {
        if (err) {
            console.log(err);
        } else {
            console.log("catalog saved:", saved);
            console.timeEnd("took");
        }
    });
}

function checkCatName(catalog) {
    console.log("checking catalog name..");

    fakeRequest.catalogDB.get({
        catalog_name: catalog.catalog_name
    }, function (err, found) {
        if (err) {
            console.log(err);
        }
        validateCats(catalog);
    });
}

function authenUser(catalog) {
    console.log("authenticating user: ", catalog.username);

    fakeRequest.authDB({
        username: catalog.username
    }, function (err, valid) {
        if (err) {
            return console.log(err);
        }
        checkCatName(catalog);
    });
}

if (command === "validate") {
    console.time("took");
    fs.readFile(fileName, function (err, catalog) {
        if (err) {
            console.log(err);
        }
        catalog = JSON.parse(catalog);
        authenUser(catalog);
    });

} else if (command === "delete") {
    //delete 
    console.log("catalog deleted");
} else {
    console.log("unsupported command", command);
}
