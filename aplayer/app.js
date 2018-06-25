"use strict";

const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const bridgeRouter = require('koa-router-bridge');   //-- import the module 
const koaRouter = require('koa-router');   // import standart koa-router 
const logger = require('koa-logger');
const passport = require('koa-passport');
const session = require('koa-session');
const routes = require('./config/routers');

let bridgedRouter = new bridgeRouter(koaRouter);   // patch the koa-router 

let _ = new bridgedRouter();

const app = new koa();
_.use(logger());

require('./oauth-2/auth');
app.keys = ['secret']
app
	.use(bodyParser())
	.use(session({}, app))
	.use(passport.initialize())
	.use(passport.session())
	.use(_.routes())
	.use(_.allowedMethods())
	.on("error", console.error);

//動的コンテンツの定義
_.bridge(routes.init, (router) => {
	_.post('/oauth/token', routes.token);
	_.get('/documents/:docId', routes.documents);
});

app.listen(3000, () => {
	console.log("open http://localhost:3000");
});