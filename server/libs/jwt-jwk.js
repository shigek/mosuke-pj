"use strict";
const jwt = require('jsonwebtoken');
const fs = require('fs');


let privPem = fs.readFileSync('../privatekey.pem', 'utf-8');
let accessToken = jwt.sign({
    data: { name: "shige" },
}, privPem, { header: { alg: "RS512" }, expiresIn: 3  })
console.log(accessToken);

let refreshToken = jwt.sign({
    data: { name: "shige" },
}, privPem, { header: { alg: "RS512" }, expiresIn: 60 * 1440 * 3 })
console.log(refreshToken);

sleep(2000);
//let pubPem = fs.readFileSync('../pubkey.pem', 'utf-8');
let pubPem = '-----BEGIN PUBLIC KEY-----\n' +
'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEdQ5+yOP7i6mBRmoDPE7K4Ep9Fmfd\n' +
'us9MwQs3/bIvoqnVJEZx9dY4bt5WUawXh8EUndkBdy2uPHkXwTCw7M6X+g==\n' +
'-----END PUBLIC KEY-----\n'

let decodeToken = jwt.verify(accessToken, pubPem, { algorithms: ['RS512'] }
    , (err, decode) => {
        if (err) {
            if (err.name == 'TokenExpiredError') {
                console.log('有効期限超過'); 
            } else {
                throw new Error(err);
            }
        } else {
            return decode;
        }
    }    
);


bcriptHash("shipper_1");

console.log(decodeToken);
let decodeRefToken = jwt.verify(refreshToken, pubPem, {algorithms:['RS512']});
console.log(decodeRefToken);

console.log(new Buffer('eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9', 'Base64').toString());

async function bcriptHash(id) {
    const bcrypt = require('bcryptjs');
    let bcriptClientId = await bcrypt.hash("shipper_1", 10)
    console.log(bcriptClientId);
    return bcriptClientId;
}
function sleep(time) {
    const d1 = new Date();
    while (true) {
        const d2 = new Date();
        if (d2 - d1 > time) {
            return;
        }
    }
}