import express from 'express';

export function logout(app: ReturnType<typeof express>) {
  app.post('/api/logout', async (req: any, res) => {
    req?.session?.destroy();
    res.end();
  });
}
