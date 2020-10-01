import React from 'react';
import { Button, notification } from 'antd';

export default () => {
  const test = React.useCallback(() => {
    fetch('http://localhost:8080/test?name=zdh', { method: 'GET' })
      .then(r => r.json())
      .then(r => {
        notification.info({
          message: JSON.stringify(r),
        });
      });
  }, []);

  return (
    <div style={{ border: '1px solid red' }}>
      <div>我是API-TEST页面，我被嵌套了</div>
      <Button onClick={() => test()}>测试API</Button>
    </div>
  );
};
