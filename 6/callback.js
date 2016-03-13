// this example is **STILL BROKEN**..
// // 6/callback.js
var fs = require("fs");

function read(filePath, callback) {  
    fs.readFile(filePath, function(err, data) {
        // here we check, if an error happened
        if (err) {
            callback(err);
        }

        callback(null, data);
    });
}

read("", function (err, data) {
    if (err) {
        return console.log(err);
    }

    console.log(data);
    
});
