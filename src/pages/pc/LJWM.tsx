import { Spin } from 'antd';
import React from 'react';
import { getModule } from '../common/DataApi';
import { PageProps } from '../common/Defs';
import ImageCarousel from '../modules/ImageCarousel';
import MTitle from '../parts/MTitle';

const LJWM = (props: PageProps) => {
  const module = props.data?.module;

  if (!props.data) {
    return (
      <div style={{ minHeight: '100vh' }}>
        <Spin></Spin>
      </div>
    );
  }
  return (
    <>
      <div style={{ width: '100%', padding: '90px 160px 70px 70px' }}>
        {module?.poductIntroduction?.display && (
          <>
            <MTitle label={module?.poductIntroduction?.title} />
            <div
              style={{
                marginTop: 52,
                marginBottom: 98,
                whiteSpace: 'pre-line',
                color: '#333',
                fontSize: 18,
              }}
            >
              {module?.poductIntroduction?.content}
            </div>
          </>
        )}
        {module?.honor?.display && (
          <ImageCarousel
            style={{ marginBottom: 98 }}
            imgs={module?.honor?.imgUrls}
            label={module?.honor?.title}
            pageSize={{ normal: 5 }}
          />
        )}
        {module?.partne?.display && (
          <ImageCarousel
            style={{ marginBottom: 98 }}
            imgs={module?.partne?.imgUrls}
            label={module?.partne?.title}
            pageSize={{ normal: 5 }}
          />
        )}
        {module?.contact?.display && (
          <ImageCarousel
            autoplay={false}
            style={{ marginBottom: 98 }}
            imgs={module?.contact?.imgUrls}
            label={module?.honor?.title}
            pageSize={{ normal: 2 }}
          />
        )}
      </div>
    </>
  );
};

LJWM.getInitialProps = async () => {
  const module = await getModule('ljwm');
  return { data: { module } };
};

export default LJWM;
