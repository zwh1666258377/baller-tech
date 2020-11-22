import React from 'react';
import ImageTranslator from '../modules/ImageTranslator';
import ProductIntro from '../modules/ProductIntro';
import ImageCarousel from '../modules/ImageCarousel';
import { PageProps } from '../common/Defs';
import { getModule } from '../common/DataApi';
import ProductDisplay from '../modules/ProductDisplay';
import { Spin } from 'antd';
import { rem } from '../common/Styles';

const WZSB = (props: PageProps) => {
  const module = props.data?.module;

  React.useEffect(
    () => document.getElementById('bt-content-view')?.scrollTo(0, 0),
    [],
  );

  if (!props.data) {
    return (
      <div style={{ minHeight: '100vh' }}>
        <Spin></Spin>
      </div>
    );
  }
  return (
    <>
      <div style={{ width: '100%', padding: '0.9rem 0.7rem' }}>
        {module?.poductIntroduction?.display && (
          <ProductIntro
            style={{ marginBottom: rem(98) }}
            data={module.poductIntroduction}
          />
        )}
        {module?.productExperience?.display && (
          <ImageTranslator
            style={{ marginBottom: rem(98) }}
            rules={module.imageTranslationRules}
          />
        )}
        {module?.productDisplay?.display && (
          <ProductDisplay
            style={{ marginBottom: rem(98) }}
            kind={module.productDisplay.kind}
            items={module.productDisplay.items}
          />
        )}
        {module?.usageScenarios?.display && (
          <ImageCarousel
            imgs={module?.usageScenarios?.imgUrls}
            style={{ marginBottom: rem(98) }}
            label={module?.usageScenarios?.title}
          />
        )}
      </div>
    </>
  );
};

WZSB.getInitialProps = async () => {
  const module = await getModule('wzsb');
  return { data: { module } };
};

export default WZSB;
