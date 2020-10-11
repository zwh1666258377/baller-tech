import React from 'react';
import AudioDisplay from '../modules/AudioDisplay';
import AudioTranslator from '../modules/AudioTranslator';
import ImageTranslator from '../modules/ImageTranslator';
import ProductIntro from '../modules/ProductIntro';
import TextTranslator from '../modules/TextTranslator';
import ImageCarousel from '../modules/ImageCarousel';
import VideoDisplay from '../modules/VideoDisplay';
import PCBase from './PCBase';
import { Module } from '../common/Defs';
import { Spin } from 'antd';
import { getModule } from '../common/DataApi';

const TXSBMBJC = (props: { data: Module }) => {
  const data = props.data;

  return <PCBase kind="txsbmbjc" content={content} />;

  function content() {
    return (
      <div style={{ width: '100%', padding: '90px 160px 70px 70px' }}>
        {data?.poductIntroduction && (
          <ProductIntro data={data.poductIntroduction} />
        )}
        <VideoDisplay style={{ marginTop: 100 }} />
        <ImageCarousel
          style={{ marginTop: 100 }}
          label={{ cn: '应用场景', en: 'Usage Scenarios' }}
        />
      </div>
    );
  }
};

TXSBMBJC.getInitialProps = async () => {
  const data = await getModule('txsb');
  return { data };
};

export default TXSBMBJC;
