const utils = require('../utils')
const TokenError = require('../errors/tokenerror');
const config = require('../config');
const db = require('../db');

/**
 * クライアント認証に成功した場合に呼びます。
 * 
 * @param {*} ctx 　　コンテキスト
 * @param {*} client　クライアントの情報 
 */
module.exports = (ctx, client) => {
  let req = ctx.request;
  let scope = req.body.scope;

  if (scope) {
    if (typeof scope !== 'string') {
      return next(new TokenError('Invalid parameter: scope must be a string', 'invalid_request'));
    }
  }
  const token = utils.createToken({ sub: client.id, exp: config.token.expiresIn });
  const expiration = config.token.calculateExpirationDate();
  //揮発性ストアにトークンを保持
  db.accessTokens.save(token, expiration, null, client.id, scope);

  var tok = {};
  tok.access_token = token;
  tok.token_type = tok.token_type || 'Bearer';
  tok.expires_in = expiration;
  var json = JSON.stringify(tok);
  ctx.headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
    "Pragma": "no-cache"
  };
  ctx.body = tok;
}
