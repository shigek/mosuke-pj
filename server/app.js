"use strict";

const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const onerror = require('koa-onerror');
const bridgeRouter = require('koa-router-bridge');   //-- import the module 
const koaRouter = require('koa-router');   // import standart koa-router 
const logger = require('koa-logger');
const serve = require('koa-static');
const views = require('koa-views');
const riot = require('riot');

const users = require('./config/users');
const routes = require('./config/routers');

const jwt = require('./libs/jwt');

let bridgedRouter = new bridgeRouter(koaRouter);   // patch the koa-router 

let _ = new bridgedRouter();  

const app = new koa();
_.use(logger());

_.use(async (ctx, next)=> {
    ctx.router = _;
    await next();
})

//動的なもの...
_.use(views(__dirname+ "/published/", { extension: "html"}));
_.use(views(__dirname+ "/service/", { extension: "js"}));
_.use(views(__dirname+ "/auth/", { extension: "js"}));

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
    _.get('/', routes.index);
   _.get('/service', routes.doGet);
   _.post('/service', routes.doPost);
});

//エラー処理
_.use(ctx => {
    var err = new Error("Not Found");
    console.log(err);
    ctx.throw(err, 404);
 });

// スタティックロード記述
app.use(serve(__dirname + "/published/", {}));
app.use(serve(__dirname + "/node_modules/riot/",{}));
app.use(serve(__dirname + "/node_modules/semantic-ui-offline/",{}));
app.use(serve(__dirname + "/node_modules/jquery/dist/",{}));
app.use(serve(__dirname + "/node_modules/semantic-ui-transition/",{}));
app.use(serve(__dirname + "/node_modules/semantic-ui-sidebar/",{}));
 
app.use(bodyParser()).use(_.routes()).use(_.allowedMethods()).on("error", console.error);

app.listen(3000, () => {
    console.log("open http://localhost:3000");
});