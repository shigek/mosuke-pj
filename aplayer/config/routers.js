"use strict";

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
  }
}
module.exports = router;
