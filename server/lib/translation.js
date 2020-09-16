const request = require('request');
const md5 = require('md5');
const { v4: uuidv4 } = require('uuid');

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

const org_id = '1178599239699136513';
const app_id = '1195647985144299542';
const app_key = '96fc9324d6b855eb81a912a3c51f7ebb';

function postTranslate(str) {
  const date = getGMTdate();
  const BParam = new Buffer.from(
    JSON.stringify({
      request_id: uuidv4(),
      language: 'chs-kor',
    }),
  ).toString('base64');
  const BCheckSum = md5(`${app_key}${date}${BParam}`);

  return new Promise(resolve => {
    request(
      {
        url: 'http://api.baller-tech.com/v1/service/v1/mt',
        method: 'POST',
        headers: {
          'content-type': 'application/octet-stream',
          'B-AppId': app_id,
          'B-CurTime': date,
          'B-Param': BParam,
          'B-CheckSum': BCheckSum,
        },
        body: JSON.stringify(str),
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(body);
        }
      },
    );
  });
}
module.exports = {
  postTranslate,
};
