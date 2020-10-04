import React from 'react';

export default () => {
  return (
    <div style={{ flex: 1, padding: '30px 24px', backgroundColor: 'black' }}>
      <div
        style={{
          fontSize: '20px',
          fontWeight: 500,
          marginBottom: '10px',
          color: '#fff',
        }}
      >
        安全稳定企业服务
      </div>
      <div
        style={{
          fontSize: '14px',
          marginBottom: '61px',
          color: '#fff',
          lineHeight: '20px',
        }}
      >
        10年服务经验积累，9种安全保障，8种服务场景，优质服务值得您信赖
      </div>
      <div style={{ color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div
            style={{
              width: '48%',
              textAlign: 'center',
              border: '1px solid #fff',
            }}
          >
            机器翻译
          </div>
          <div
            style={{
              width: '48%',
              textAlign: 'center',
              border: '1px solid #fff',
            }}
          >
            语音识别
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div
            style={{
              width: '48%',
              textAlign: 'center',
              border: '1px solid #fff',
            }}
          >
            语音合成
          </div>
          <div
            style={{
              width: '48%',
              textAlign: 'center',
              border: '1px solid #fff',
            }}
          >
            文字识别
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              border: '1px solid #fff',
            }}
          >
            图像识别和目标检测
          </div>
        </div>
      </div>
    </div>
  );
};
