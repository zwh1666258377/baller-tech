import { Col, Row } from 'antd';
import React from 'react';
import MTitle from '../parts/MTitle';

const audioList = [
  { label: '蒙古语样音1', url: '' },
  { label: '蒙古语样音2', url: '' },
  { label: '蒙古语样音3', url: '' },
  { label: '蒙古语样音4', url: '' },
  { label: '蒙古语样音5', url: '' },
  { label: '蒙古语样音6', url: '' },
  { label: '蒙古语样音7', url: '' },
  { label: '蒙古语样音8', url: '' },
  { label: '蒙古语样音9', url: '' },
  { label: '蒙古语样音10', url: '' },
  { label: '蒙古语样音11', url: '' },
];

const AudioDisplay = () => {
  return (
    <div>
      <MTitle label={{ cn: '产品展示', en: 'Product Display' }} />
      <div style={{ marginTop: 52 }}>
        <Row gutter={[10, 10]}>
          {audioList.map(a => (
            <Col key={a.label} sm={12} xl={8}>
              <div style={{ marginLeft: 16 }}>{a.label}</div>
              <audio
                controls
                style={{ width: '100%', borderRadius: 0 }}
                src={a.url}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default AudioDisplay;
