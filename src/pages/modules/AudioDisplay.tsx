import { Col, Row } from 'antd';
import React, { CSSProperties } from 'react';
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

interface Props {
  style?: CSSProperties;
}

const AudioDisplay = (props: Props) => {
  return (
    <div style={props.style}>
      <MTitle label={{ cn: '产品展示', en: 'Product Display' }} />
      <div style={{ marginTop: 52 }}>
        <Row gutter={[30, 30]}>
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
