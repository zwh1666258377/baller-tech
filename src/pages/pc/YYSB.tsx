import React from 'react';
import AudioTranslator from '../modules/AudioTranslator';
import ProductIntro from '../modules/ProductIntro';
import TextTranslator from '../modules/TextTranslator';
import ImageCarousel from '../modules/ImageCarousel';
import PCBase from './PCBase';
import { Module } from '../common/Defs';
import { Spin } from 'antd';
import { getModule } from '../common/DataApi';

const YYSB = (props: { data: Module }) => {
  const data = props.data;

  return <PCBase kind="yysb" content={content} />;

  function content() {
    return (
      <div style={{ width: '100%', padding: '90px 160px 70px 70px' }}>
        {data?.poductIntroduction && (
          <ProductIntro data={data.poductIntroduction} />
        )}
        <AudioTranslator style={{ marginTop: 100 }} />
        <ImageCarousel
          style={{ marginTop: 100 }}
          label={{ cn: '应用场景', en: 'Usage Scenarios' }}
        />
      </div>
    );
  }
};

YYSB.getInitialProps = async () => {
  const data = await getModule('yysb');
  return { data };
};

export default YYSB;
