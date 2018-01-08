"use strict";
const qp = require('query-parse');
const r = require('../../config/router-config');

module.exports.filter = function (array, key, value) {
    return array.filter(item => (item[key] == value));
}

module.exports.query = function (ctx) {
    return qp.toObject(ctx.req._parsedUrl.query);
}

module.exports.getApi = function (ctx) {
    let q = qp.toObject(ctx.req._parsedUrl.query);
    console.log(q);
    let api = this.filter(r.apis, "id", q.id)[0];
    api.query = q;
    return api;
}