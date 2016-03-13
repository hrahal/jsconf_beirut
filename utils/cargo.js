"use strict";

var async = require("async"),
    array = ['2', '%', '4', '$', '8', '+', '^', '!', 'm', '8', '~'];

//do bulk operations
var cargo = async.cargo(function (tasks, cb) {

    setTimeout(function () {
        console.log();
        cb();
    }, 1000);

}, 2);

async.each(array, function (item, cb) {

    cargo.push(item, function () {

        console.log("item", item, "pushed");
        cb();

    });
}, function () {

    console.log('data pushed to db');

});
