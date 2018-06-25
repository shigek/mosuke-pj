'use strict';

const db = require('./db');
const passport = require('koa-passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { BasicStrategy } = require('passport-http');
const { Strategy: ClientPasswordStrategy } = require('passport-oauth2-client-password');
const { Strategy: BearerStrategy } = require('passport-http-bearer');
const validate = require('./validate');

/**
 * LocalStrategy
 *
 * ユーザー名とパスワードでの認証用
 */
passport.use(new LocalStrategy((username, password, done) => {
  db.users.findByUsername(username)
    .then(user => validate.user(user, password))
    .then(user => done(null, user))
    .catch(err => done(err));
}));

/**
 * BasicStrategy & ClientPasswordStrategy
 * ベーシック認証（'basic client_id:client_secret')
 */
passport.use(new BasicStrategy((clientId, clientSecret, done) => {
  db.clients.findByClientId(clientId)
    .then(client => validate.client(client, clientSecret))
    .then(client => done(null, client))
    .catch(err => done(err));
}));

/**
 * Client Password strategy
 *
 * クライアント認証
 */
passport.use(new ClientPasswordStrategy((clientId, clientSecret, done) => {
  db.clients.findByClientId(clientId)
    .then(client => validate.client(client, clientSecret))
    .then(client => done(null, client))
    .catch(err => done(err));
}));

/**
 * BearerStrategy
 *
 * Bearerトークン認証('bearer [access_token]')
 */
passport.use(new BearerStrategy((accessToken, done) => {
  db.accessTokens.find(accessToken)
    .then(token => validate.token(token, accessToken))
    .then(token => done(null, token, { scope: '*' }))
    .catch(err => done(null, false));
}));

// Register serialialization and deserialization functions.
//
// When a client redirects a user to user authorization endpoint, an
// authorization transaction is initiated.  To complete the transaction, the
// user must authenticate and approve the authorization request.  Because this
// may involve multiple HTTPS request/response exchanges, the transaction is
// stored in the session.
//
// An application must supply serialization functions, which determine how the
// client object is serialized into the session.  Typically this will be a
// simple matter of serializing the client's ID, and deserializing by finding
// the client by ID from the database.

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.users.find(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});
