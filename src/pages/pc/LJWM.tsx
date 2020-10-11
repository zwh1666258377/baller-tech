import { Spin } from 'antd';
import React, { CSSProperties } from 'react';
import { Module } from '../common/Defs';
import ImageCarousel from '../modules/ImageCarousel';
import ImageDisplay from '../modules/ImageDisplay';
import MTitle from '../parts/MTitle';
import PCBase from './PCBase';

interface Props {
  style?: CSSProperties;
  data: Module;
}

const LJWM = (props: Props) => {
  const data = props.data;
  if (!data) {
    return <Spin></Spin>;
  }
  const intro = `北京大牛儿科技发展有限公司（Baller Tech）位于北京经济技术开发区，
  是一家专业从事智能视觉、智能语音和智能语义的高科技公司，于2020年获得中关村高新技术企业认证，在图像文字识别、图像目标检测、视频目标检测、语音识别、语音合成、机器翻译等方向，有多款成熟产品。
  Baller Tech面向智能视觉、智能语音和智能语义这三大核心技术方向，组建了专业的科研、工程、产品和项目团队，倡导“专业、务实、高效、创新”的企业精神。优美的工作环境以及良好
  的激励机制，吸引了一批年轻、有学识、具有实干精神的人才。高素质、高水平、高效率的人才是大牛儿科技在当今激烈的市场中立于不败之地的保障。随着人工智能时代的到来，Baller Tech将不断创新发展，让您的生活因智能而美好！`;
  return <PCBase kind="ljwm" content={content} />;

  function content() {
    return (
      <div style={{ width: '100%', padding: '90px 160px 70px 70px' }}>
        <MTitle label={{ cn: '公司简介', en: 'Company Introduction' }} />
        <div
          style={{
            marginTop: 50,
            whiteSpace: 'pre-line',
            color: '#333',
            fontSize: 18,
          }}
        >
          {intro}
        </div>
        <ImageCarousel
          autoplay
          style={{ marginTop: 100 }}
          label={{ cn: '荣誉资质', en: 'Honor & Qualification' }}
          pageSize={{ normal: 5, small: 3 }}
        />
        <ImageCarousel
          autoplay
          style={{ marginTop: 100 }}
          label={{ cn: '合作伙伴', en: 'Cooperative Partner' }}
          pageSize={{ normal: 5, small: 3 }}
        />
        <ImageCarousel
          autoplay
          style={{ marginTop: 100 }}
          label={{ cn: '合作伙伴', en: 'Cooperative Partner' }}
          pageSize={{ normal: 5, small: 3 }}
        />
        <ImageCarousel
          style={{ marginTop: 100 }}
          label={{ cn: '联系我们', en: 'Contact Us' }}
          pageSize={{ normal: 2, small: 2 }}
        />
      </div>
    );
  }
};

LJWM.getInitialProps = () => {
  return {};
};

export default LJWM;
