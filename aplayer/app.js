"use strict";

const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaRouter = require('koa-router');   // import standart koa-router 
const logger = require('koa-logger');
const passport = require('koa-passport');
const session = require('koa-session');
const exchange = require('./oauth-2/exchange');

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

_oauth2.post('/oauth/token', (ctx) => {
	return passport.authenticate(['basic', 'oauth2-client-password'], { session: false }, (err, client) => {
		//クライアントの情報を使って、JWTトークンをつくっちゃいます。
		return exchange.clientCredentials(ctx, client);

	})(ctx)
});

app.listen(3000, () => {
	console.log("open http://localhost:3000");
});