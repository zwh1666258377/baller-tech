import express from 'express';
import multer from 'multer';
import { resolve } from 'path';
import { ResourceSchema } from '../schema/model/resources';

const upload = multer({ dest: resolve('static/uploads/') });

export function uploadImg(app: ReturnType<typeof express>) {
  app.post('/api/upload/img', upload.single('img'), async (req: any, res) => {
    await ResourceSchema.create({
      ...(req?.file || {}),
      kind: 'img',
    });
    res.json(req?.file || {});
  });
}

export function uploadMp3(app: ReturnType<typeof express>) {
  app.post('/api/upload/mp3', upload.single('mp3'), async (req: any, res) => {
    await ResourceSchema.create({
      ...(req?.file || {}),
      kind: 'mp3',
    });
    res.json(req?.file || {});
  });
}

export function uploadMp4(app: ReturnType<typeof express>) {
  app.post('/api/upload/mp4', upload.single('mp4'), async (req: any, res) => {
    await ResourceSchema.create({
      ...(req?.file || {}),
      kind: 'mp4',
    });
    res.json(req?.file || {});
  });
}
