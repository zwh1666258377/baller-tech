import React from 'react';
import ImageTranslator from '../modules/ImageTranslator';
import ProductIntro from '../modules/ProductIntro';
import ImageCarousel from '../modules/ImageCarousel';
import PCBase from './PCBase';
import { PageProps } from '../common/Defs';
import { getModule, getWebsite } from '../common/DataApi';

const WZSB = (props: PageProps) => {
  const module = props.data?.module;
  const website = props.data?.website;

  return <PCBase kind="wzsb" content={content} website={website} />;

  function content() {
    return (
      <div style={{ width: '100%', padding: '90px 160px 70px 70px' }}>
        {module?.poductIntroduction && (
          <ProductIntro data={module.poductIntroduction} />
        )}
        <ImageTranslator style={{ marginTop: 98 }} />
        {module?.usageScenarios?.display && (
          <ImageCarousel
            imgs={module?.usageScenarios?.imgUrls}
            style={{ marginTop: 98 }}
            label={module?.usageScenarios?.title}
          />
        )}
      </div>
    );
  }
};

WZSB.getInitialProps = async () => {
  const module = await getModule('wzsb');
  const website = await getWebsite();
  return { data: { module, website } };
};

export default WZSB;
