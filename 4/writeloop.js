/*  4/writeloop.js
 *
 * async ops inside a for loop
 * */

var fs = require("fs"),
    i;

for (i = 0; i < 10; i += 1) {

    fs.writeFile("test" + i, "data" + i, function (err) {
        if (err) {
            console.log(err);
            return; //to insure the stop of exec
        }

        console.log("saved", i);
    });
}
