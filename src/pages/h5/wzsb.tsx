import React from 'react';
import { Layout, Spin, Typography } from 'antd';
import MTitle from '../parts/MTitle';
import { getModule, getWebsite } from '../common/DataApi';
import { PageProps } from '../common/Defs';
import ProductDisplay from '../modules/ProductDisplay';
import ImageTranslator from '../modules/ImageTranslator';

const { Content } = Layout;
const { Paragraph } = Typography;

const Index = (props: PageProps) => {
  const module = props.data?.module;

  if (!props.data) {
    return <Spin></Spin>;
  }

  return (
    <div style={{ paddingBottom: '75px' }}>
      <div style={{ padding: '21px 16px' }}>
        <div
          style={{
            height: '150px',
            borderRadius: '10px 10px',
            background: `no-repeat center/100% url(${module?.poductIntroduction?.imgUrl})`,
          }}
        ></div>
      </div>
      <Content style={{ padding: '0px 15px' }}>
        {module?.productExperience?.display && (
          <ImageTranslator
            h5
            style={{ marginBottom: '40px' }}
            rules={module?.imageTranslationRules}
          />
        )}
        {module?.productDisplay?.display && (
          <ProductDisplay
            h5
            style={{ marginBottom: '40px' }}
            kind={module.productDisplay.kind}
            items={module.productDisplay.items}
          />
        )}
        {module?.poductIntroduction?.display && (
          <>
            <MTitle
              style={{ marginBottom: '20px' }}
              label={module?.poductIntroduction?.title}
            />
            <Paragraph
              style={{
                color: '#666666',
                lineHeight: '29px',
                fontSize: '16px',
              }}
            >
              {module?.poductIntroduction?.content}
            </Paragraph>
            <div
              style={{
                width: '90%',
                backgroundColor: '#FFCB52',
                borderRadius: '40px',
                color: '#fff',
                textAlign: 'center',
                height: '50px',
                lineHeight: '50px',
                fontSize: '18px',
                fontWeight: 500,
                margin: '10px auto 40px',
              }}
              onClick={() =>
                window.open(module?.poductIntroduction?.button?.url)
              }
            >
              {module?.poductIntroduction?.button?.text}
            </div>
          </>
        )}
        {module?.usageScenarios?.display && (
          <>
            <MTitle
              style={{ marginBottom: '20px' }}
              label={module?.usageScenarios?.title}
            />
            <section>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  height: '98px',
                  marginBottom: '19px',
                }}
              >
                {module?.usageScenarios?.imgUrls?.length > 0 && (
                  <div
                    style={{
                      flex: 1,
                      maxWidth: '48%',
                      background: `no-repeat center/100% url(${module?.usageScenarios?.imgUrls[0].url})`,
                    }}
                  ></div>
                )}
                {module?.usageScenarios?.imgUrls?.length > 1 && (
                  <div
                    style={{
                      flex: 1,
                      maxWidth: '48%',
                      background: `no-repeat center/100% url(${module?.usageScenarios?.imgUrls[1].url})`,
                    }}
                  ></div>
                )}
              </div>
              {module?.usageScenarios?.imgUrls?.length > 2 && (
                <div
                  style={{
                    height: '202px',
                    background: `no-repeat center/100% url(${module?.usageScenarios?.imgUrls[2].url})`,
                  }}
                ></div>
              )}
            </section>
          </>
        )}
      </Content>
    </div>
  );
};

Index.getInitialProps = async () => {
  const module = await getModule('wzsb');
  const website = await getWebsite();
  return { data: { module, website } };
};

export default Index;
