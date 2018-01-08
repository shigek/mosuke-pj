"use strict";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usertable = require('../config/users');
const utils = require('../common/sdk/utils');
const j = require('./jwt');

module.exports = function (ctx, q, body) {

    var userInfo = utils.filter(usertable.users, "id", body.user)[0]
    if (userInfo != null) {
        ctx.status = 401
        ctx.body = {
            code: 9,
            message: "Agupig 入力したアカウントは既に登録されています。"
        };
    } else {
        let plainPassword = body.password
        //パスワードのハッシュ化
        let bcryptPassword = bcrypt.hash(body.password, 10)
            .then(encode => {
                ctx.status = 200
                ctx.body = {
                    code: 0,
                    message: "Successfully logged in!",
                    value: {
                        name: userInfo.firstname + " " + userInfo.lastname,
                        token: jwt.sign({
                            role: (userInfo.admin) ? 'admin' : 'user',
                            id: body.user,
                        }, j.getSecret(), { expiresIn: 60 * 30 })
                    }
                }
            })
            .catch(error => {
                console.log(error);
                ctx.status = 500;
                ctx.body = { "code": 9, "message": "Authentication failed" };
            })
    }
   return ctx
}
