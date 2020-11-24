import request from 'request';
import md5 from 'md5';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { app_id, app_key } from '../lib/baller-tech-env';
import multer from 'multer';
import fs from 'fs';

const upload = multer({ dest: 'static/baller-tech/' });

const mapping = [
  { mimetype: ['/ogg'], audio_format: 'ogg' },
  { mimetype: ['/mpeg', '/mp3'], audio_format: 'mp3' },
  { mimetype: ['/wave'], audio_format: 'wav' },
  { mimetype: ['/octet-stream'], audio_format: 'raw' },
];

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

    let audioFormat: string | undefined = undefined;

    for (const i in mapping) {
      const { mimetype, audio_format } = mapping[i];

      const match = mimetype.find(t => {
        return String(file?.mimetype)?.endsWith(t);
      });

      if (!!match) {
        audioFormat = audio_format;
      }
    }

    if (!audioFormat) {
      res.json({
        status: 'error',
        msg: `mimetype:${file?.mimetype},originalname:${file?.originalname},该文件格式不支持`,
      });
    }

    const body = fs.createReadStream(file.path);

    postTranslate({ language, body, audioFormat }).then(result => {
      fs.unlinkSync(file.path);
      res.json({
        status: 'ok',
        data: result,
      });
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
  const { body, language, audioFormat } = args;

  return new Promise(resolve => {
    const date = getGMTdate();
    const BParam = generateBase64Params({
      request_id: uuidv4(),
      language,
      sample_format: 'audio/L16;rate=16000',
      audio_format: audioFormat,
      input_mode: 'once',
      service_type: 'sentence',
      dynamic_correction: 'off',
      vad: 'on',
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
        body,
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          const res = JSON.parse(body);
          if (!!res && res.code == 0) {
            let val = '';
            const timer = setInterval(() => {
              const { request_id } = res;
              const date = getGMTdate();
              const BParam = generateBase64Params({
                request_id,
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
                    val += unescape(
                      JSON.parse(body)?.data.replace(/\\u/g, '%u'),
                    );
                    if (JSON.parse(body)?.is_end === 1) {
                      clearInterval(timer);
                      resolve(val);
                    }
                  } else {
                    clearInterval(timer);
                    resolve(JSON.stringify(body));
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
