"use strict";

let router = {
  init: async (ctx, next) => {
    let url = ctx.req._parsedUrl;
    let pathname = url.pathname;
    var checkExt = /.*[\.(xml|html|json)]$/;
    if (pathname.search(checkExt) < 0 && pathname.substr(-1) !== '/') {
      ctx.redirect((pathname+'/')+(url.search||''));
      return;
    }
    ctx.$$ = {};
    await next;
  },
  
  index: async (ctx, next) => {
    console.log(ctx);
    await ctx.render('index',{});
  },

  //RESTfullな...doGet
  doGet: async (ctx, next) => {
    try {
      let url = ctx.req._parsedUrl;
      //?id=を解析して、jsを呼び出す。
      // 何故か、pathが解決している　^^);
      var value = 'Report';
      var service = require('../service/api/' + value + ".js");
      ctx.body = service.execute(url.query, ctx);
      await next;
    } catch (e) {
      console.log(e);
      ctx.body = { "code": 9, "message": e.message };
      await next;
    }
  },

  //RESTfullな...doPut
  doPut: async (ctx, next) => {
    try {
      let url = ctx.req._parsedUrl;
      //?id=を解析して、jsを呼び出す。
      // &key=valueは、 requestパラメータとして渡す
      ctx.body = { "code": 0, "message":"", "share": { "comment_count": 0, "share_count": 150 } };
      await next;
    } catch (e) {
      console.log(e);
      ctx.body = { "code": 9, "message": e.message };
      await next;
    }
  }
}
module.exports = router;
