import express from 'express';
import { ResourceSchema } from '../schema/model/resources';

export function imgList(app: ReturnType<typeof express>) {
  app.get('/api/img/list', async (req: any, res) => {
    const docs = await ResourceSchema.find({ kind: 'img' });

    res.send(docs);
  });
}

export function mp3List(app: ReturnType<typeof express>) {
  app.get('/api/mp3/list', async (req: any, res) => {
    const docs = await ResourceSchema.find({ kind: 'mp3' });

    res.send(docs);
  });
}

export function mp4List(app: ReturnType<typeof express>) {
  app.get('/api/mp4/list', async (req: any, res) => {
    const docs = await ResourceSchema.find({ kind: 'mp4' });

    res.send(docs);
  });
}
