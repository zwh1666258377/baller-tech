import express from 'express';
import { UserSchema } from '../schema/model/user';
import { sha1 } from 'utility';

export function uploadUser(app: ReturnType<typeof express>) {
  app.post('/api/update-user', async (req: any, res) => {
    const { password } = req.body;
    if (!password) {
      res.json({ status: 'error', msg: '密码不得为空' });
      return;
    }
    const uuid = req.session['uuid'];
    const user = await UserSchema.findById(uuid);

    if (!user) {
      res.json({ status: 'error', msg: '未找到目标用户' });
      return;
    }
    await user.updateOne({
      password: sha1(password),
    });
    res.json({ status: 'ok', msg: '修改成功' });
  });
}
