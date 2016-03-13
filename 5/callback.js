"use strict";
/* 5/callback.js
 * */

function callmeMaybe(time, cb) {

    console.log("waiting for godot..");

    setTimeout(function() {
        cb(null, "godot is back! ");

    }, time);
};


callmeMaybe(5000, function (err, result) {
    console.log(result);
});
