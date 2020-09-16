import React from 'react';
import { isBrowser } from 'umi';
import { Button, Typography } from 'antd';
const { Text, Title } = Typography;

export default () => {
  return (
    <button
      onClick={() => {
        fetch('http://localhost:7001/translate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({
            str: '您好',
          }),
        })
          .then(r => r.json())
          .then(console.log);
      }}
    >
      翻译‘您好’
    </button>
  );
};
