"use strict";
const jwt = require('jsonwebtoken');
const fs = require('fs');


let privPem = fs.readFileSync('../privatekey.pem', 'utf-8');
let accessToken = jwt.sign({
    data: { name: "shige" },
}, privPem, { header: { alg: "RS512" }, expiresIn: 1  })
console.log(accessToken);

let refreshToken = jwt.sign({
    data: { name: "shige" },
}, privPem, { header: { alg: "RS512" }, expiresIn: 60 * 1440 * 3 })
console.log(refreshToken);

sleep(2000);
let pubPem = fs.readFileSync('../pubkey.pem', 'utf-8');
let decodeToken = jwt.verify(accessToken, pubPem, {algorithms:['RS512']});
console.log(decodeToken);

let decodeRefToken = jwt.verify(refreshToken, pubPem, {algorithms:['RS512']});
console.log(decodeRefToken);

function sleep(time) {
    const d1 = new Date();
    while (true) {
        const d2 = new Date();
        if (d2 - d1 > time) {
            return;
        }
    }
}