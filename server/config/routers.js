"use strict";

const utils = require('../common/sdk/utils');
const jwt = require('../libs/jwt');

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

  //RESTfulな...doGet
  doGet: async (ctx, next) => {
    try {
      let api = utils.getApi(ctx);
      let service = require(api.dir + "/" + api.id);
      if (!api.authenticate) {
        ctx.body = await service(ctx, api.query);
        await next;
      } else {
        let token = ctx.request.body.token || ctx.request.headers['x-access-token'];
        if (!token) {
          ctx.status = 403;
          ctx.body = { "code": 9, "message": "No token provided." };
        } else {
          jwt.authenticate(token)
            .then(decoded => {
              console.log(decoded);
              let service = require(api.dir + "/" + api.id);
              ctx.body = service(ctx, api.query);
            })
            .catch(error => {
              console.log(error);
              ctx.status = 500;
              ctx.body = { "code": 9, "message": "Invalid token." };
            })
        }
      }
    } catch (e) {
      ctx.body = { "code": 9, "message": e.message };
      await next;
    }
  },

  //RESTfulな...doPost
  doPost: async (ctx, next) => {
    try {
      let api = utils.getApi(ctx);
      let service = require(api.dir + "/" + api.id);
      if (!api.authenticate) {
        await service(ctx, api.query, ctx.request.body);
        await next;
      } else {
        let token = ctx.request.body.token || ctx.request.headers['x-access-token'];
        if (!token) {
          ctx.status = 403;
          ctx.body = { "code": 9, "message": "No token provided." };
        } else {
          jwt.authenticate(token)
            .then(decoded => {
              console.log(decoded);
              let service = require(api.dir + "/" + api.id);
              service(ctx, api.query, ctx.request.body);
            })
            .catch(error => {
              console.log(error);
              ctx.status = 500;
              ctx.body = { "code": 9, "message": "Invalid token." };
            })
        }
      }
    } catch (e) {
      ctx.body = { "code": 9, "message": e.message };
      await next;
    }
  }
}
module.exports = router;
