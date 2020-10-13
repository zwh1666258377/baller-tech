import React from 'react';
import ProductIntro from '../modules/ProductIntro';
import TextTranslator from '../modules/TextTranslator';
import ImageCarousel from '../modules/ImageCarousel';
import PCBase from './PCBase';
import { getModule, getWebsite } from '../common/DataApi';
import { PageProps } from '../common/Defs';

const JQFY = (props: PageProps) => {
  const module = props.data?.module;
  const website = props.data?.website;

  return <PCBase kind="jqfy" content={content} website={website} />;

  function content() {
    return (
      <div style={{ width: '100%', padding: '90px 160px 70px 70px' }}>
        {module?.poductIntroduction?.display && (
          <ProductIntro
            style={{ marginBottom: 98 }}
            data={module?.poductIntroduction}
          />
        )}
        <TextTranslator style={{ marginBottom: 98 }} />
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

JQFY.getInitialProps = async () => {
  const module = await getModule('jqfy');
  const website = await getWebsite();
  return { data: { module, website } };
};

export default JQFY;
