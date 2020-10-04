import React from 'react';
import AudioDisplay from '../modules/AudioDisplay';
import AudioTranslator from '../modules/AudioTranslator';
import ImageTranslator from '../modules/ImageTranslator';
import ProductIntro from '../modules/ProductIntro';
import TextTranslator from '../modules/TextTranslator';
import ImageCarousel from '../modules/ImageCarousel';
import VideoDisplay from '../modules/VideoDisplay';
import PCBase from './PCBase';

const TXSBMBJC = () => {
  return <PCBase kind="txsbmbjc" content={content} />;

  function content() {
    return (
      <div style={{ width: '100%', padding: '90px 160px 70px 70px' }}>
        <ProductIntro />
        <VideoDisplay style={{ marginTop: 100 }} />
        <ImageCarousel
          style={{ marginTop: 100 }}
          label={{ cn: '应用场景', en: 'Usage Scenarios' }}
        />
      </div>
    );
  }
};

TXSBMBJC.getInitialProps = () => {
  // fetch TXSBMBJC
  return {};
};

export default TXSBMBJC;
