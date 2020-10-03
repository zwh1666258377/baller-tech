import express from 'express';
import { WebsiteSchema } from '../schema/model/website';

export function getWebsite(app: ReturnType<typeof express>) {
  app.post('/api/get-website', async (req, res) => {
    const data = req.body;
    const module = await WebsiteSchema.findOne({ kind: data?.kind });
    res.json(module);
  });
}
