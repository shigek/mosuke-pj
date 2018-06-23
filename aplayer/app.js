"use strict";

const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const bridgeRouter = require('koa-router-bridge');   //-- import the module 
const koaRouter = require('koa-router');   // import standart koa-router 
const logger = require('koa-logger');
const passport = require('koa-passport');
const session = require('koa-session');

const oauth2 = require('./oauth-2/oauth2');
const user = require('./oauth-2/user');
const utils = require('./oauth-2/utils');

const routes = require('./config/routers');

let bridgedRouter = new bridgeRouter(koaRouter);   // patch the koa-router 

let _ = new bridgedRouter();

let _oauth2 = new koaRouter();

const app = new koa();
_.use(logger());

_.use(async (ctx, next)=> {
    ctx.router = _;
    await next();
})

_.use((ctx, next) => {
    return next().catch(err => {
        ctx.status = err.status || 500;
        return　ctx.render('index', {
            message: err.message,
            error: err
        });
    })
})

//動的コンテンツの定義
_.bridge(routes.init, (router) => {
});
_oauth2.post('/oauth/token', oauth2.token);

//エラー処理
_.use(ctx => {
    var err = new Error("Not Found");
    console.log(err);
    ctx.throw(err, 404);
 });
 
app.keys = ['secret']
app
    .use(bodyParser())
    .use(session({}, app))
    .use(passport.initialize())
    .use(passport.session())
    .use(_.routes())
    .use(_oauth2.routes())
    .use(_.allowedMethods())
    .on("error", console.error);

require('./oauth-2/auth');

app.listen(3000, () => {
    console.log("open http://localhost:3000");
});