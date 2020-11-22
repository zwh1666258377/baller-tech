import { Col, Row } from 'antd';
import React, { CSSProperties } from 'react';
import { rem } from '../common/Styles';
import MTitle from '../parts/MTitle';

interface Props {
  style?: CSSProperties;
  h5?: boolean;
  label: { cn: string; en: string };
  items: { url: string; name: string }[];
}

const VideoDisplay = (props: Props) => {
  if (props?.h5) {
    return (
      <div style={props.style}>
        <MTitle label={props.label} />
        <div style={{ marginTop: rem(52) }}>
          <Row gutter={[100, 35]}>
            {props.items?.map(item => (
              <Col key={item.url} sm={24} xl={12}>
                <video controls style={{ width: '100%', borderRadius: 0 }}>
                  <source src={item.url} type="video/mp4" />
                </video>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    );
  }
  return (
    <div style={props.style}>
      <MTitle style={{ fontSize: rem(32) }} label={props.label} />
      <div style={{ marginTop: 52 }}>
        <Row gutter={[100, 35]}>
          {props.items?.map(item => (
            <Col key={item.url} sm={24} xl={12}>
              <video controls style={{ width: '100%', borderRadius: 0 }}>
                <source src={item.url} type="video/mp4" />
              </video>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default VideoDisplay;
