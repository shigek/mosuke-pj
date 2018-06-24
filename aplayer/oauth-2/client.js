'use strict';

const passport = require('passport');
const compose = require("koa-compose");

/*
 * Simple informational end point, if you want to get information
 * about a particular client.  You would call this with an access token
 * in the body of the message according to OAuth 2.0 standards
 * http://tools.ietf.org/html/rfc6750#section-2.1
 *
 * Example would be using the endpoint of
 * https://localhost:3000/api/userinfo
 *
 * With a GET using an Authorization Bearer token similar to
 * GET /api/userinfo
 * Host: https://localhost:3000
 * Authorization: Bearer someAccessTokenHere
 */
exports.info = compose([
	passport.authenticate('bearer', { session: false }),
	() => {
		// req.authInfo is set using the `info` argument supplied by
		// `BearerStrategy`.  It is typically used to indicate scope of the token,
		// and used in access control checks.  For illustrative purposes, this
		// example simply returns the scope in the response.
		this.body = { client_id: req.user.id, name: req.user.name, scope: req.authInfo.scope };
	},
]);