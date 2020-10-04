import React from 'react';
import AudioDisplay from '../modules/AudioDisplay';
import AudioTranslator from '../modules/AudioTranslator';
import ProductIntro from '../modules/ProductIntro';
import TextTranslator from '../modules/TextTranslator';
import ImageCarousel from '../modules/ImageCarousel';
import PCBase from './PCBase';

const YYHC = () => {
  return <PCBase kind="yyhc" content={content} />;

  function content() {
    return (
      <div style={{ width: '100%', padding: '90px 160px 70px 70px' }}>
        <ProductIntro />
        <AudioDisplay style={{ marginTop: 100 }} />
        <ImageCarousel
          style={{ marginTop: 100 }}
          label={{ cn: '应用场景', en: 'Usage Scenarios' }}
        />
      </div>
    );
  }
};

YYHC.getInitialProps = () => {
  // fetch yyhc
  return {};
};

export default YYHC;
