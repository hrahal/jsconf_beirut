var async = require("async");

async.forever(
    function (next) {

        setTimeout(function () {

            console.log("this will run forever", new Date().getTime());
            //or collect data, daemon
            next();

        }, 1000);

    },

    function (err) {
        //collect err
    }
);
