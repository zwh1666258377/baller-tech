const Koa = require('koa');
const compress = require('koa-compress');
const mount = require('koa-mount');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const { join, extname } = require('path');
const isDev = process.env.NODE_ENV === 'development';
const root = join(__dirname, './dist');

const app = new Koa();
app.use(cors());
app.use(bodyParser());
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

app.use(mount('/', require('koa-static')(root)));

app.listen(7001, () => {
  console.log('http://localhost:7001');
});

const parseCookie = ctx => {
  let cookies = ctx.get('cookie');
  if (!cookies) {
    return [];
  }
  cookies = cookies.split(';');
  const res = {};
  for (const item of cookies) {
    const kv = item.split('=');
    if (kv && kv.length > 0) {
      res[kv[0].trim()] = decodeURIComponent(kv[1]);
    }
  }
  return res;
};

const parseNavLang = ctx => {
  // 服务端无法获取navigator.language，所以只能通过Accept-Language来判断浏览器语言。
  let navigatorLang;
  const clientLang = ctx.get('Accept-Language');
  if (clientLang.startsWith('zh')) {
    navigatorLang = 'zh-CN';
  } else if (clientLang.startsWith('en')) {
    navigatorLang = 'en-US';
  }
  return navigatorLang;
};

module.exports = app.callback();
