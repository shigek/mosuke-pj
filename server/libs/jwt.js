"use strict";
const jwt = require('jsonwebtoken');

let secret = {
    secret: 'A very secret key'    //ハードコーディングはだめぽ
};

module.exports.authenticate = function (token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret.secret, (error, decoded) => {
            return error ? reject(error) : resolve(decoded);
        });
    });  
}
module.exports.getSecret = function () {
    return secret.secret;
}
