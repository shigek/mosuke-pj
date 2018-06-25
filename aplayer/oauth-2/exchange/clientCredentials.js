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
  let grant = req.body.grant_type;
  
  if (scope) {
    if (typeof scope !== 'string') {
      ctx.body = { error: 'invalid_request', error_description: 'Invalid parameter: scope must be a string' };
      return;
    }
  }
  if (grant) {
    if (grant !== 'client_credentials') {
      ctx.body = {error: 'invalid_grant', error_description: 'Invalid client credentials'}
      return;
    }
  } else {
    ctx.body = { error: 'invalid_request', error_description: 'Invalid parameter: grant_type is required' };
    return;
}

  const token = utils.createToken({ sub: client.id, exp: config.token.expiresIn });
  const expiration = config.token.calculateExpirationDate();
  //揮発性ストアにトークンを保持
  db.accessTokens.save(token, expiration, null, client.id, scope);

  var tok = {};
  tok.access_token = token;
  tok.token_type = tok.token_type || 'Bearer';
  tok.expires_in = config.token.expiresIn;
  ctx.headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
    "Pragma": "no-cache"
  };
  ctx.body = tok;
}
