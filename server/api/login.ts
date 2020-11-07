import express from 'express';
import { UserSchema } from '../schema/model/user';
import { sha1 } from 'utility';

export function login(app: ReturnType<typeof express>) {
  app.post('/api/login', async (req: any, res) => {
    const data = req.body;
    const account = data?.account;
    const password = sha1(data?.password);

    const user = await UserSchema.findOne({ account });

    if (!user) {
      res.json({
        status: 'error',
        msg: '暂无此用户',
      });
    } else if (user?.password !== password) {
      res.json({
        status: 'error',
        msg: '密码错误',
      });
    } else {
      req.session['sessionId'] = req?.session?.id;
      req.session['uuid'] = user._id;

      res.json({
        status: 'ok',
        msg: '登录成功',
      });
    }
  });
}
