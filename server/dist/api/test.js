'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.test = void 0;
function test(app) {
  app.get('/test', (req, res) => {
    res.json({
      test: `输入点儿url query？ xxx?name=xxxx ${JSON.stringify(req.query)}`,
    });
  });
}
exports.test = test;
