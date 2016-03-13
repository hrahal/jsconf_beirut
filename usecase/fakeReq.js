module.exports = {
    "categoriesDB": function (cats, cb) {
        setTimeout(function () {
            cb(null, cats.categories.length);
        }, 2000);
    },
    "featuresDB": function (feats, cb) {
        setTimeout(function () {
            cb(null, feats.features.length);
        }, 2000);
    },
    "citiesDB": function (user, cb) {
        setTimeout(function () {
            cb(null, true);
        }, 2000);
    },
    "authDB": function (user, cb) {
        setTimeout(function () {
            cb(null, true);
        }, 2000);
    },
    "catalogDB": {
        "get": function (name, cb) {
            setTimeout(function () {
                cb(null, false);
            }, 1000);
        },
        "delete": function (name, cb) {
            setTimeout(function () {
                cb(null, false);
            }, 1000);
        },
        "save": function (name, cb) {
            setTimeout(function () {
                cb(null, true);
            }, 500);
        }
    }
};
