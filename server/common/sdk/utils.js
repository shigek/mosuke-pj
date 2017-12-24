"use strict";

module.exports.filter = function (array, key, value) {
    return array.filter(item => (item[key] == value));
}