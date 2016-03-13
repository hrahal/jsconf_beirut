var async = require('async'),
    data = [
        { color: "black" },
        { color: "red" },
        { color: "green" },
        { color: "green" },
        { color: "black" },
        { color: "red" },
    ];

async.filter(data, function (item, cb) {

    cb(item.color === "green");

}, function (results) {

    console.log(results);

});
