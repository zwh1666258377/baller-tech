import { Col, Row } from 'antd';
import React, { CSSProperties } from 'react';
import MTitle from '../parts/MTitle';

const audioList = [
  { label: '蒙古语样音1', url: 'https://cdn.applysquare.net/a2/blog/blog.mp4' },
  { label: '蒙古语样音2', url: 'https://cdn.applysquare.net/a2/blog/blog.mp4' },
  { label: '蒙古语样音3', url: 'https://cdn.applysquare.net/a2/blog/blog.mp4' },
];

interface Props {
  style?: CSSProperties;
}

const VideoDisplay = (props: Props) => {
  return (
    <div style={props.style}>
      <MTitle label={{ cn: '产品展示', en: 'Product Display' }} />
      <div style={{ marginTop: 52 }}>
        <Row gutter={[100, 35]}>
          {audioList.map(a => (
            <Col key={a.label} sm={24} xl={12}>
              <video controls style={{ width: '100%', borderRadius: 0 }}>
                <source src={a.url} type="video/mp4" />
              </video>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default VideoDisplay;
