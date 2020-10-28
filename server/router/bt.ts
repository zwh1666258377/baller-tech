import express from 'express';
import path from 'path';
import { Stream } from 'stream';

export function bt(app: ReturnType<typeof express>) {
  app.use(async (req, res, next) => {
    let render = require(path.resolve('dist/umi.server'));

    const ext = path.extname(req.path);
    if (!ext) {
      if (!render) {
        render = require(path.resolve('dist/umi.server'));
      }

      res.setHeader('Content-Type', 'text/html');
      res.type('text/html');
      res.status(200);
      const context = {};
      const { html, error, rootContainer } = await render({
        // 有需要可带上 query
        path: req.url,
        context,
        // 可自定义 html 模板
        // htmlTemplate: defaultHtml,
        // 启用流式渲染
        mode: 'stream',
        // html 片段静态标记（适用于静态站点生成）
        // staticMarkup: false,
        // 扩展 getInitialProps 在服务端渲染中的参数
        // getInitialPropsCtx: {},
        // manifest，正常情况下不需要
      });

      if (error) {
        console.log('----------------服务端报错-------------------', error);
        res.status(500).send(error);
        return;
      }

      // 目前dev暂不使用此方式，所以不设计更改代码强刷缓存的逻辑，暂时注释
      // if (false) {
      //     delete require.cache[require.resolve('./dist/umi.server')];
      // }

      if (html instanceof Stream) {
        html.pipe(res);
        html.on('end', function() {
          res.end();
        });
      } else {
        res.send(res);
      }
    } else {
      await next();
    }
  });
}
