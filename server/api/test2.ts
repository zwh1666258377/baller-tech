import express from 'express';

export function test2(app: ReturnType<typeof express>) {
  app.get('/test2', (req, res) => {
    res.json({
      test: `输入点儿url query？ xxx?name=xxxx ${JSON.stringify(req.query)}`,
    });
  });
}
