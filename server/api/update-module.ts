import express from 'express';
import { ModuleSchema } from '../schema/model/module';

export function updateModule(app: ReturnType<typeof express>) {
  app.post('/api/update-module', async (req, res) => {
    const data = req.body;
    const module = await ModuleSchema.findOne({ kind: data?.kind });

    if (!!module) {
      ModuleSchema.updateOne({ kind: module['kind'] }, data).then(r => {
        res.json(r || {});
      });
    } else {
      ModuleSchema.create(data).then(r => {
        res.json(r || {});
      });
    }
  });
}
