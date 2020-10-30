import React from 'react';
import { Layout, Spin, Typography } from 'antd';
import MTitle from '../parts/MTitle';
import { getModule, getWebsite } from '../common/DataApi';
import { PageProps } from '../common/Defs';
import ImageCarousel from '../modules/ImageCarousel';

const { Content } = Layout;
const { Paragraph } = Typography;

const Index = (props: PageProps) => {
  const module = props.data?.module;
  const website = props.data?.website;

  if (!props.data) {
    return (
      <div style={{ minHeight: '100vh' }}>
        <Spin></Spin>
      </div>
    );
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
          </>
        )}
        {module?.honor?.display && (
          <>
            <ImageCarousel
              h5
              style={{ marginBottom: 20 }}
              imgs={module?.honor?.imgUrls}
              label={module?.honor?.title}
              pageSize={{ normal: 2 }}
            />
          </>
        )}
        {module?.partne?.display && (
          <ImageCarousel
            h5
            style={{ marginBottom: 20 }}
            imgs={module?.partne?.imgUrls}
            label={module?.partne?.title}
            pageSize={{ normal: 4, line: 2 }}
          />
        )}
        {module?.contact?.display && (
          <ImageCarousel
            autoplay={false}
            style={{ marginBottom: 20 }}
            imgs={module?.contact?.imgUrls}
            label={module?.honor?.title}
            pageSize={{ normal: 2 }}
          />
        )}
      </Content>
    </div>
  );
};

Index.getInitialProps = async () => {
  const module = await getModule('ljwm');
  const website = await getWebsite();

  return { data: { module, website } };
};

export default Index;
