const Koa = require('koa');
const compress = require('koa-compress');
const mount = require('koa-mount');
const { postTranslate } = require('./lib/translation');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const { join, extname } = require('path');
const { parseCookie, parseNavLang } = require('./serverHelper');
const isDev = process.env.NODE_ENV === 'development';
const root = join(__dirname, '../dist');

const app = new Koa();
app.use(cors());
app.use(bodyParser());
app.use(
  compress({
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH,
  }),
);

app.use(async (ctx, next) => {
  if (ctx.request.path === '/translate') {
    const { str } = ctx.request.body;
    const res = await postTranslate(str);
    ctx.body = res;
  } else {
    await next();
  }
});

let render;
app.use(async (ctx, next) => {
  global._cookies = parseCookie(ctx);
  global._navigatorLang = parseNavLang(ctx);

  const ext = extname(ctx.request.path);

  if (!ext) {
    if (!render) {
      render = require('../dist/umi.server');
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

app.use(mount('/', require('koa-static')(root)));

app.listen(7001);
console.log('http://localhost:7001');

module.exports = app.callback();
