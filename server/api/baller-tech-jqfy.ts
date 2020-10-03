import request from 'request';
import md5 from 'md5';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { app_id, app_key } from '../lib/baller-tech-env';

export function ballerTechJQFY(app: ReturnType<typeof express>) {
  app.post('/api/jqfy', async (req, res) => {
    const { str, language } = req.body;
    if (!str) {
      res.json({
        status: 'error',
        msg: '翻译内容不得为空',
      });
    }
    if (!language) {
      res.json({
        status: 'error',
        msg: '目标语言不得为空',
      });
    }
    const result = await postTranslate({ str, language });

    res.json({
      status: 'ok',
      data: result,
    });
  });
}

function getGMTdate() {
  const timezone = 0;
  const offset = new Date().getTimezoneOffset();
  const nowDate = new Date().getTime();
  const targetDate = new Date(
    nowDate + offset * 60 * 1000 + timezone * 60 * 60 * 1000,
  ).toString();
  const dateArr = targetDate.toString().split(' ');
  const week = dateArr[0];
  const month = dateArr[1];
  const day = dateArr[2];
  const year = dateArr[3];
  const date = dateArr[4];
  const dateStr = `${week}, ${day} ${month} ${year} ${date} GMT`;
  return dateStr;
}

function generateBase64Params(obj) {
  return Buffer.from(JSON.stringify(obj)).toString('base64');
}

function postTranslate(args) {
  const { str, language } = args;

  return new Promise(resolve => {
    const date = getGMTdate();
    const BParam = generateBase64Params({
      request_id: uuidv4(),
      language,
    });
    request(
      {
        url: 'http://api.baller-tech.com/v1/service/v1/mt',
        method: 'POST',
        headers: {
          'content-type': 'application/octet-stream',
          'B-AppId': app_id,
          'B-CurTime': date,
          'B-Param': BParam,
          'B-CheckSum': md5(`${app_key}${date}${BParam}`),
        },
        body: JSON.stringify(str),
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          const res = JSON.parse(body);
          if (!!res && res.code == 0) {
            const timer = setTimeout(() => {
              const { request_id } = res;
              const date = getGMTdate();
              const BParam = generateBase64Params({
                request_id,
              });

              request(
                {
                  url: 'http://api.baller-tech.com/v1/service/v1/mt',
                  headers: {
                    'B-AppId': app_id,
                    'B-CurTime': date,
                    'B-Param': BParam,
                    'B-CheckSum': md5(`${app_key}${date}${BParam}`),
                  },
                },
                function(error, response, body) {
                  if (!error && response.statusCode == 200) {
                    resolve(unescape(body.replace(/\\u/g, '%u')));
                  }
                  clearTimeout(timer);
                },
              );
            }, 1000);
          } else {
            resolve(body);
          }
        }
      },
    );
  });
}
