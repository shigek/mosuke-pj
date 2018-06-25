"use strict";
const passport = require('koa-passport');
const exchange = require('../oauth-2/exchange');
const TokenError = require('../oauth-2/errors/tokenerror');
const ValidateError = require('../oauth-2/errors/validateerror');

let router = {
  init: async (ctx, next) => {
    let url = ctx.req._parsedUrl;
    let pathname = url.pathname;
    var checkExt = /.*[\.(xml|html|json)]$/;
    if (pathname.search(checkExt) < 0 && pathname.substr(-1) !== '/') {
      ctx.redirect((pathname + '/') + (url.search || ''));
      return;
    }
    ctx.$$ = {};
    await next;
  },

  index: async (ctx, next) => {
    await ctx.render('index', {});
  },

  /**
   * システム認証
   */
  token: async (ctx, next) => {
    passport.authenticate(['basic', 'oauth2-client-password'], { session: false }, (err, client) => {
      if (!checkAuthenticate(ctx, err, client)) {
        return;
      }
      exchange.clientCredentials(ctx, client);
    })(ctx, next)
  },

  /**
   * リソース利用許可チェック＆CALL
   */
  documents: async (ctx, next) => {
    passport.authorize('bearer', { session: false }, (err, token, scope) => {
      if (!checkAuthorize(ctx, token, scope)) {
        return;
      }
      ctx.status = 200;
      ctx.body = { token: token };
 
    })(ctx, next)
  }
}

/**
 * 認証できるかをチェックする
 * 
 * @param {object} ctx 
 * @param {object} err 
 * @param {object} client 
 */
function checkAuthenticate(ctx, err, client) {
  if (err) {
    //認証失敗
    ctx.status = err.status;
    ctx.body = { error: err.code, error_description: err.message };
    return false;
  }

  if (!client) {
    //Bad Request(間違いがあるか必要なパラメータがない)
    ctx.status = 400;
    ctx.body = { error: 'invalid_request', error_description: 'Request parameters is missing or incorrect.' };
    return false;
  }

  return true;
}

/**
 * 許可できるかをチェックする
 * 
 * @param {object} ctx 
 * @param {object} token 
 * @param {object} scope 
 */
function checkAuthorize(ctx, token, scope) {
  //scopeについては、利用方法を決められます
  if (!token) {
    //認可できず
    ctx.status = 400;
    ctx.body = { error: 'invalid_token', error_description: 'Access Token is invalid or Expiried.' };
    return false;
  }
  return true;
}
module.exports = router;
