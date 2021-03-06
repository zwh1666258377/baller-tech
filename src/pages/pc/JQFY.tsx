import React from 'react';
import ProductIntro from '../modules/ProductIntro';
import TextTranslator from '../modules/TextTranslator';
import ImageCarousel from '../modules/ImageCarousel';
import { getModule, getWebsite } from '../common/DataApi';
import { PageProps } from '../common/Defs';
import ProductDisplay from '../modules/ProductDisplay';
import { Spin } from 'antd';
import { rem } from '../common/Styles';

const JQFY = (props: PageProps) => {
  const module = props.data?.module;
  const website = props.data?.website;

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
            data={module?.poductIntroduction}
          />
        )}
        {module?.productExperience?.display && (
          <TextTranslator
            data={website}
            style={{ marginBottom: rem(98) }}
            rules={module.textTranslationRules}
            langRules={module.langRegRules}
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

JQFY.getInitialProps = async () => {
  const module = await getModule('jqfy');
  const website = await getWebsite();
  return { data: { module, website } };
};

export default JQFY;
