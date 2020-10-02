import express from 'express';
import multer from 'multer';
import { resolve } from 'path';
import { ResourceSchema } from '../schema/model/resources';

const upload = multer({ dest: resolve('static/uploads/') });

export function uploadImg(app: ReturnType<typeof express>) {
  app.post('/api/upload/img', upload.single('img'), async (req: any, res) => {
    await ResourceSchema.create(req?.file);
    res.json(req?.file);
  });
}
