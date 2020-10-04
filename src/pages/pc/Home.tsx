import { Carousel } from 'antd';
import React, { CSSProperties } from 'react';
import BTFooter from '../parts/BTFooter';

const img =
  'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/0A/0C/ChMkJlwbaPmIfjr8AAHXNlQ9tyQAAt5PAMXql0AAddO522.jpg';

const Home = () => {
  return (
    <div
      style={{
        overflowY: 'auto',
        backgroundSize: '100% 100%',
        backgroundImage: `url(${img})`,
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <div
        style={{
          width: 303,
          height: 84,
          border: '1px solid #000',
          position: 'absolute',
          top: 41,
          left: 45,
        }}
      >
        大牛儿科技LOGO
      </div>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ImgLabel style={{ marginRight: 20 }} lebal="机器翻译" />
          <ImgLabel style={{ marginRight: 20 }} lebal="语音识别" />
          <ImgLabel lebal="语音合成" />
        </div>
      </div>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div></div>
        <BTFooter />
      </div>
    </div>
  );
};

export default Home;

const ImgLabel = (props: { style?: CSSProperties; lebal: string }) => {
  return (
    <div style={props.style}>
      <div style={{ width: 400, height: 130, border: '1px solid #000' }}>
        {props.lebal}
      </div>
    </div>
  );
};
