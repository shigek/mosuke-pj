"use strict";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const usertable = require('../config/users');
const utils = require('../common/sdk/utils');
const j = require('./jwt');

module.exports = async function (ctx, q, body) {

    var userInfo = utils.filter(usertable.users, "id", body.user)[0]
    if (userInfo != null) {
        ctx.status = 401
        ctx.body = {
            code: 9,
            message: "Agupig 入力したアカウントは既に登録されています。"
        };
    } else {
        //パスワードのハッシュ化
        let bcryptPassword = await bcrypt.hash(body.password, 10)
        ctx.status = 200
        ctx.body = {
            code: 0,
            message: "Successfully logged in!",
            value: {
                name: " ",
                token: jwt.sign({
                    role: 'user',
                    id: body.user,
                }, j.getSecret(), { expiresIn: 60 * 30 })
            }
        }
    }
   return ctx
}
