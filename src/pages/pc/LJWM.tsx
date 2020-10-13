import { Spin } from 'antd';
import React, { CSSProperties } from 'react';
import { getModule, getWebsite } from '../common/DataApi';
import { Module, PageProps, Website } from '../common/Defs';
import ImageCarousel from '../modules/ImageCarousel';
import ImageDisplay from '../modules/ImageDisplay';
import MTitle from '../parts/MTitle';
import PCBase from './PCBase';

const LJWM = (props: PageProps) => {
  const module = props.data?.module;
  const website = props.data?.website;

  return <PCBase kind="ljwm" content={content} website={website} />;

  function content() {
    return (
      <div style={{ width: '100%', padding: '90px 160px 70px 70px' }}>
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
        {module?.honor?.display && (
          <ImageCarousel
            style={{ marginBottom: 98 }}
            imgs={module?.honor?.imgUrls}
            label={module?.honor?.title}
            pageSize={{ normal: 5, small: 3 }}
          />
        )}
        {module?.partne?.display && (
          <ImageCarousel
            style={{ marginBottom: 98 }}
            imgs={module?.partne?.imgUrls}
            label={module?.partne?.title}
            pageSize={{ normal: 5, small: 3 }}
          />
        )}
        {module?.contact?.display && (
          <ImageCarousel
            style={{ marginBottom: 98 }}
            imgs={module?.contact?.imgUrls}
            label={module?.honor?.title}
            pageSize={{ normal: 2, small: 2 }}
          />
        )}
      </div>
    );
  }
};

LJWM.getInitialProps = async () => {
  const module = await getModule('ljwm');
  const website = await getWebsite();
  return { data: { module, website } };
};

export default LJWM;
