import express from 'express';

export function authCheck(app: ReturnType<typeof express>) {
  app.get('/api/auth/check', async (req: any, res) => {
    res.json({
      logged: !!req.session.sessionId,
    });
  });
}
