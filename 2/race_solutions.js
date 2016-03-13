/* 2/race_solution.js */
var fs = require('fs');
var fileName = 'input.txt';

/* read async */
fs.readFile(fileName, 'utf8', function(err, data) {
    if (err) {
        return console.log(err);
    }
    console.log("read 1 finished> ",  data || "EMPTY");

    /* write async */
    fs.writeFile(fileName, 'updated text', 'utf8', function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("write finished ");

        /* read async */
        fs.readFile(fileName, 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }
            console.log("read 2 finished> ",  data || "EMPTY");
            console.log('done');
        });
    });
});
