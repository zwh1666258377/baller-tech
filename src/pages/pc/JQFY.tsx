import React from 'react';
import ProductIntro from '../modules/ProductIntro';
import TextTranslator from '../modules/TextTranslator';
import ImageCarousel from '../modules/ImageCarousel';
import PCBase from './PCBase';
import { getModule } from '../common/DataApi';
import { Spin } from 'antd';
import { Module } from '../common/Defs';

const JQFY = (props: { data: Module }) => {
  const data = props.data;

  return <PCBase kind="jqfy" content={content} />;

  function content() {
    return (
      <div style={{ width: '100%', padding: '90px 160px 70px 70px' }}>
        {data?.poductIntroduction && (
          <ProductIntro data={data.poductIntroduction} />
        )}
        <TextTranslator style={{ marginTop: 100 }} />
        <ImageCarousel
          imgs={[]}
          style={{ marginTop: 100 }}
          label={{ cn: '应用场景', en: 'Usage Scenarios' }}
        />
      </div>
    );
  }
};

JQFY.getInitialProps = async () => {
  const data = await getModule('jqfy');
  return { data };
};

export default JQFY;
