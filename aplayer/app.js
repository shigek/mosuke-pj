"use strict";

const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaRouter = require('koa-router');   // import standart koa-router 
const logger = require('koa-logger');
const passport = require('koa-passport');
const session = require('koa-session');

const client = require('./oauth-2/client');
const config = require('./oauth-2/config');
const db = require('./oauth-2/db');
const token = require('./oauth-2/token');
const user = require('./oauth-2/user');

let _oauth2 = new koaRouter();

const app = new koa();
_oauth2.use(logger());


require('./oauth-2/auth');
app.keys = ['secret']
app
	.use(bodyParser())
	.use(session({}, app))
	.use(passport.initialize())
	.use(passport.session())
	.use(_oauth2.routes())
	.use(_oauth2.allowedMethods())
	.on("error", console.error);

_oauth2.post('/oauth/token',
		passport.authenticate('oauth2-client-password')
);

app.listen(3000, () => {
	console.log("open http://localhost:3000");
});