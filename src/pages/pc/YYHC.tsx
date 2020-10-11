import React from 'react';
import AudioDisplay from '../modules/AudioDisplay';
import ProductIntro from '../modules/ProductIntro';
import ImageCarousel from '../modules/ImageCarousel';
import PCBase from './PCBase';
import { PageProps } from '../common/Defs';
import { getModule, getWebsite } from '../common/DataApi';

const YYHC = (props: PageProps) => {
  const module = props.data?.module;
  const website = props.data?.website;

  return <PCBase kind="yyhc" content={content} website={website} />;

  function content() {
    return (
      <div style={{ width: '100%', padding: '90px 160px 70px 70px' }}>
        {module?.poductIntroduction && (
          <ProductIntro data={module.poductIntroduction} />
        )}
        <AudioDisplay style={{ marginTop: 100 }} />
        {module?.usageScenarios?.display && (
          <ImageCarousel
            imgs={module?.usageScenarios?.imgUrls}
            style={{ marginTop: 100 }}
            label={
              module?.usageScenarios?.title || {
                cn: '应用场景',
                en: 'Usage Scenarios',
              }
            }
          />
        )}
      </div>
    );
  }
};

YYHC.getInitialProps = async () => {
  const module = await getModule('yyhc');
  const website = await getWebsite();
  return { data: { module, website } };
};

export default YYHC;
