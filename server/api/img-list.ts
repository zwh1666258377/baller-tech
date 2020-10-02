import express from 'express';
import { ResourceSchema } from '../schema/model/resources';

export function imgList(app: ReturnType<typeof express>) {
  app.get('/api/img/list', async (req: any, res) => {
    const docs = await ResourceSchema.find({});

    res.send(docs);
  });
}
