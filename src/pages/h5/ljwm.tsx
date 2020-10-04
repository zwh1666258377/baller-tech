import React from 'react';
import { Layout, Typography } from 'antd';
import TextTranslator from '../modules/TextTranslator';
import MTitle from '../parts/MTitle';

const { Content } = Layout;
const { Paragraph } = Typography;

const Index = () => {
  return (
    <div style={{ paddingBottom: '75px' }}>
      <div style={{ padding: '21px 16px' }}>
        <div
          style={{
            height: '150px',
            border: '1px solid red',
            borderRadius: '10px 10px',
          }}
        >
          111
        </div>
      </div>
      <Content style={{ padding: '0px 15px' }}>
        <MTitle
          style={{ marginBottom: '20px' }}
          label={{ cn: '了解我们', en: 'Product introduction' }}
        />
        <Paragraph
          style={{
            color: '#666666',
            lineHeight: '29px',
            fontSize: '16px',
          }}
        >
          In the process of internal desktop applications development, many
          different design specs and implementations would be involved, which
          might cause designers and developers difficulties and duplication and
          reduce the efficiency of development.
        </Paragraph>
        <MTitle
          style={{ marginBottom: '20px' }}
          label={{ cn: '荣誉资质', en: 'Product introduction' }}
        />
        <section>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              height: '202px',
              marginBottom: '19px',
            }}
          >
            <div
              style={{ flex: 1, maxWidth: '48%', border: '1px solid red' }}
            ></div>
            <div
              style={{ flex: 1, maxWidth: '48%', border: '1px solid red' }}
            ></div>
          </div>
        </section>
        <MTitle
          style={{ marginBottom: '20px' }}
          label={{ cn: '荣誉资质', en: 'Product introduction' }}
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
            <div
              style={{ flex: 1, maxWidth: '48%', border: '1px solid red' }}
            ></div>
            <div
              style={{ flex: 1, maxWidth: '48%', border: '1px solid red' }}
            ></div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              height: '98px',
              marginBottom: '19px',
            }}
          >
            <div
              style={{ flex: 1, maxWidth: '48%', border: '1px solid red' }}
            ></div>
            <div
              style={{ flex: 1, maxWidth: '48%', border: '1px solid red' }}
            ></div>
          </div>
        </section>
        <MTitle
          style={{ marginBottom: '20px' }}
          label={{ cn: '荣誉资质', en: 'Product introduction' }}
        />
        <section>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              height: '86px',
              marginBottom: '19px',
              border: '1px solid red',
            }}
          ></div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              height: '86px',
              marginBottom: '19px',
              border: '1px solid red',
            }}
          ></div>
        </section>
      </Content>
    </div>
  );
};

export default Index;
