"use strict";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const usertable = require('../config/users');
const utils = require('../common/sdk/utils');
const j = require('./jwt');

module.exports = async function (ctx, q, body) {

    var userInfo = utils.filter(usertable.users, "id", body.user)[0]
    if (userInfo == null) {
        ctx.status = 401
        ctx.body = {
            code: 9,
            message: "Agupig アカウントが見つかりませんでした。"
        };
    } else {
        let res = await bcrypt.compare(body.password, userInfo.password)
        if (res) {
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
        } else {
            ctx.status = 401
            ctx.body = {
                code: 9,
                message: "Authentication failed"
            }
        }
    }    
    return ctx
}
