import express from 'express';
import { WebsiteSchema } from '../schema/model/website';

export function updateWebsite(app: ReturnType<typeof express>) {
  app.post('/api/update-website', async (req, res) => {
    const data = req.body;
    const module = await WebsiteSchema.findOne({ kind: data?.kind });
    if (!!module) {
      WebsiteSchema.updateOne({ kind: module['kind'] }, data).then(r => {
        res.json(r || {});
      });
    } else {
      WebsiteSchema.create(data).then(r => {
        res.json(r || {});
      });
    }
  });
}
