const Koa = require('koa');
const compress = require('koa-compress');
const mount = require('koa-mount');
const cors = require('koa2-cors');
const { join, extname } = require('path');
const { parseCookie, parseNavLang } = require('./serverHelper');

const isDev = process.env.NODE_ENV === 'development';

const root = join(__dirname, 'dist');

const app = new Koa();
// app.use(cors());
app.use(
  compress({
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH,
  }),
);

let render;
app.use(async (ctx, next) => {
  global._cookies = parseCookie(ctx);
  global._navigatorLang = parseNavLang(ctx);

  const ext = extname(ctx.request.path);
  if (!ext) {
    if (!render) {
      render = require('./dist/umi.server');
    }
    ctx.type = 'text/html';
    ctx.status = 200;
    const { html, error } = await render({
      path: ctx.request.url,
      mode: 'stream',
    });
    if (error) {
      console.log('----------------服务端报错-------------------', error);
      ctx.throw(500, error);
    }
    if (isDev) {
      delete require.cache[require.resolve('./dist/umi.server')];
    }
    ctx.body = html;
  } else {
    await next();
  }
});

app.use(async(ctx)=>{
    // 从request 中接收get请求
    let url = ctx.url;
    let request = ctx.request;
    let req_query = request.query;
    let req_queryString = request.querystring;

    // 从上下文中ctx 直接获取get请求
    let ctx_query = ctx.query;
    let ctx_querystring = ctx.querystring;

    ctx.body = {
        url,
        req_query,
        req_queryString,
        ctx_query,
        ctx_querystring,
    }
});

app.use(mount('/', require('koa-static')(root)));

app.listen(7001);
console.log('http://localhost:7001');

module.exports = app.callback();