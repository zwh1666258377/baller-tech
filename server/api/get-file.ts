import express from 'express';
import fs from 'fs';
import { ResourceSchema } from '../schema/model/resources';

export function getFile(app: ReturnType<typeof express>) {
  app.get('/api/get/file', async (req, res) => {
    const { id } = req.query;
    const doc = await ResourceSchema.findById(id);
    if (!!doc?.path) {
      const buff = fs.readFileSync(doc?.path);
      res.set(
        'Content-Disposition',
        `attachment;filename=${doc?.originalname}`,
      );
      res.end(buff);
    } else {
      res.end();
    }
  });
}
