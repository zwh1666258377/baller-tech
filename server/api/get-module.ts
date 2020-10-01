import express from 'express';
import { ModuleSchema } from '../schema/model/module';

export function getModule(app: ReturnType<typeof express>) {
  app.post('/api/get-module', async (req, res) => {
    const data = req.body;
    const module = await ModuleSchema.findOne({ kind: data?.kind });
    res.json(module);
  });
}
