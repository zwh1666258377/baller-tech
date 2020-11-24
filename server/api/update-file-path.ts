import express from 'express';
import { ResourceSchema } from '../schema/model/resources';

export function updateFilePath(app: ReturnType<typeof express>) {
  const promiseArr: Array<Promise<any>> = [];
  app.post('/api/update-file-path', async (req, res) => {
    ResourceSchema.find((err, docs) => {
      if (err) {
        res.json({
          status: 'error',
          msg: '修正失败',
        });
        return;
      }

      docs.forEach(doc => {
        let pathSplit = doc.path.split('/');
        const index = pathSplit.findIndex(p => p === 'static');
        promiseArr.push(
          new Promise(resolve => {
            doc
              .updateOne({ path: pathSplit.slice(index).join('/') })
              .then(() => {
                resolve();
              });
          }),
        );
      });

      Promise.all(promiseArr).then(() => {
        res.json({
          status: 'ok',
          msg: '修正成功',
        });
      });
    });
  });
}
