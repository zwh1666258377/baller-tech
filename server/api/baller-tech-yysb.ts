import request from 'request';
import md5 from 'md5';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { app_id, app_key } from '../lib/baller-tech-env';
import multer from 'multer';
import { resolve } from 'path';
import fs from 'fs';

const upload = multer({ dest: resolve('static/baller-tech/') });

export function ballerTechYYSB(app: ReturnType<typeof express>) {
  app.post('/api/yysb', upload.any(), async (req, res) => {
    const { language } = req.body;
    const file = req.files[0];

    if (!language) {
      res.json({
        status: 'error',
        msg: '目标语言不得为空',
      });
    }

    if (!file) {
      res.json({
        status: 'error',
        msg: '语音文件不得为空',
      });
    }
    const formData = {
      my_field: file.fieldname,
      my_file: fs.createReadStream(file.path),
    };

    postTranslate({ language, formData }).then(result => {
      fs.unlinkSync(file.path);
      res.json({
        status: 'ok',
        data: result,
      });
    });
    // let data = '';
    // const readerStream = fs.createReadStream(file.path);
    // readerStream.setEncoding('UTF8');
    // readerStream.on('data', chunk => (data += chunk));
    // readerStream.on('end', function () {
    //   const formData = {
    //     my_field: file.fieldname,
    //     my_file: fs.createReadStream(file.path),
    //   };

    //   postTranslate({ language, formData }).then(result => {
    //     res.json({
    //       status: 'ok',
    //       data: result
    //     });
    //   });
    // });
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
  const { formData, language } = args;

  return new Promise(resolve => {
    const date = getGMTdate();
    const BParam = generateBase64Params({
      request_id: uuidv4(),
      language,
      sample_format: 'audio/L16;rate=16000',
      audio_format: 'raw',
      input_mode: 'once',
      service_type: 'sentence',
      dynamic_correction: 'on',
      vad: 'off',
    });
    console.log({
      'content-type': 'application/octet-stream',
      'B-AppId': app_id,
      'B-CurTime': date,
      'B-Param': BParam,
      'B-CheckSum': md5(`${app_key}${date}${BParam}`),
    });
    request(
      {
        url: 'http://api.baller-tech.com/v1/service/v1/asr',
        method: 'POST',
        headers: {
          'content-type': 'application/octet-stream',
          'B-AppId': app_id,
          'B-CurTime': date,
          'B-Param': BParam,
          'B-CheckSum': md5(`${app_key}${date}${BParam}`),
        },
        formData,
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          const res = JSON.parse(body);
          if (!!res && res.code == 0) {
            const val: any[] = [];
            const timer = setInterval(() => {
              const { request_id } = res;
              const date = getGMTdate();
              const BParam = generateBase64Params({
                request_id,
              });
              console.log({
                'B-AppId': app_id,
                'B-CurTime': date,
                'B-Param': BParam,
                'B-CheckSum': md5(`${app_key}${date}${BParam}`),
              });
              request(
                {
                  url: 'http://api.baller-tech.com/v1/service/v1/asr',
                  headers: {
                    'B-AppId': app_id,
                    'B-CurTime': date,
                    'B-Param': BParam,
                    'B-CheckSum': md5(`${app_key}${date}${BParam}`),
                  },
                },
                function(error, response, body) {
                  if (!error && response.statusCode == 200) {
                    if (JSON.parse(body)?.is_end === 1) {
                      val.push(JSON.parse(body));
                      clearInterval(timer);
                      resolve(val);
                    } else {
                      val.push(JSON.parse(body));
                    }
                    // resolve(unescape(body.replace(/\\u/g, '%u')));
                  }
                },
              );
            }, 40);
          } else {
            resolve(body);
          }
        }
      },
    );
  });
}