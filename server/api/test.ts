import express from 'express';

export function test(app: ReturnType<typeof express>) {
  app.get('/test', (req, res) => {
    res.json({
      test: `输入点儿url query？ xxx?name=xxxx ${JSON.stringify(req.query)}`,
    });
  });
}
