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

  //RESTfulな...
  service: async (ctx, next) => {
    try {
      let url = ctx.req._parsedUrl;
      ctx.body = { "share": { "comment_count": 0, "share_count":150 } };
      await next;
    } catch (e) {
      console.log(e);
      ctx.throw(e, 500);
    }
  }
  
}
module.exports = router;
