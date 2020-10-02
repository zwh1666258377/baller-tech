import express from 'express';
import { ResourceSchema } from '../schema/model/resources';
import fs from 'fs';

export function removeImg(app: ReturnType<typeof express>) {
  app.post('/api/remove/img', async (req, res) => {
    const { id } = req.body;
    const doc = await ResourceSchema.findById(id);

    if (!!doc) {
      await doc.remove();
      await fs.unlinkSync(doc.path);
    }

    res.end();
  });
}
