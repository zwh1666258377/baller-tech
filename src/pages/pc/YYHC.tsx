import React from 'react';
import ProductIntro from '../modules/ProductIntro';
import ImageCarousel from '../modules/ImageCarousel';
import PCBase from './PCBase';
import { PageProps } from '../common/Defs';
import { getModule, getWebsite } from '../common/DataApi';
import ProductDisplay from '../modules/ProductDisplay';

const YYHC = (props: PageProps) => {
  const module = props.data?.module;
  const website = props.data?.website;

  return <PCBase kind="yyhc" content={content} website={website} />;

  function content() {
    return (
      <div style={{ width: '100%', padding: '90px 160px 70px 70px' }}>
        {module?.poductIntroduction && (
          <ProductIntro
            style={{ marginBottom: 98 }}
            data={module.poductIntroduction}
          />
        )}
        {module?.productDisplay?.display && (
          <ProductDisplay
            style={{ marginBottom: 98 }}
            kind={module.productDisplay.kind}
            items={module.productDisplay.items}
          />
        )}
        {module?.usageScenarios?.display && (
          <ImageCarousel
            imgs={module?.usageScenarios?.imgUrls}
            style={{ marginBottom: 98 }}
            label={module?.usageScenarios?.title}
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
