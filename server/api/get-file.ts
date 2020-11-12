import express from 'express';
import fs from 'fs';
import { ResourceSchema } from '../schema/model/resources';

export function getFile(app: ReturnType<typeof express>) {
  app.get('/api/get/file', async (req, res) => {
    const { id } = req.query;
    const doc = await ResourceSchema.findById(id);
    if (!!doc?.path) {
      if (doc.mimetype?.startsWith('video/')) {
        const path = doc?.path;
        const stat = fs.statSync(path);
        const fileSize = stat.size;
        const range = req.headers.range;
        if (range) {
          //有range头才使用206状态码
          const parts = range.replace(/bytes=/, '').split('-');
          const start = parseInt(parts[0], 10);
          let end = parts[1] ? parseInt(parts[1], 10) : start + 999999;

          // end 在最后取值为 fileSize - 1
          end = end > fileSize - 1 ? fileSize - 1 : end;

          const chunksize = end - start + 1;
          const file = fs.createReadStream(path, { start, end });
          const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
          };
          res.writeHead(206, head);
          file.pipe(res);
        } else {
          const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
          };
          res.writeHead(200, head);
          fs.createReadStream(path).pipe(res);
        }
      } else {
        const buff = fs.readFileSync(doc?.path);
        res.attachment(doc?.originalname);
        res.end(buff);
      }
    } else {
      res.end();
    }
  });
}
