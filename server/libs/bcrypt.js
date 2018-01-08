"use strict";
const bcrypt = require('bcryptjs');

module.exports.hash = function (s, salt) {
    return new Promise((resolve, reject) => {
        bcript.hash(s, salt, (error, encode) => {
            return error ? reject(error) : resolve(encode);
        });
    });  
}
