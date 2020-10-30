import { Col, Row } from 'antd';
import React, { CSSProperties } from 'react';
import MTitle from '../parts/MTitle';

interface Props {
  style?: CSSProperties;
  h5?: boolean;
  label: { cn: string; en: string };
  items: { url: string; name: string }[];
}

const AudioDisplay = (props: Props) => {
  if (!!props.h5) {
    return (
      <div style={props.style}>
        <MTitle label={props.label} />
        <div style={{ marginTop: 24 }}>
          <Row gutter={[30, 30]}>
            {props.items?.map(item => (
              <Col key={item.url} span={24}>
                <div style={{ marginLeft: 16, marginBottom: 8 }}>
                  {item.name}
                </div>
                <audio
                  controls
                  style={{ width: '100%', borderRadius: 0 }}
                  src={item.url}
                />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    );
  }
  return (
    <div style={props.style}>
      <MTitle label={props.label} />
      <div style={{ marginTop: 52 }}>
        <Row gutter={[30, 30]}>
          {props.items?.map(item => (
            <Col key={item.url} sm={12} xl={8}>
              {item.name && (
                <div style={{ marginLeft: 16, marginBottom: 8 }}>
                  {item.name}
                </div>
              )}
              <audio
                controls
                style={{ width: '100%', borderRadius: 0 }}
                src={item.url}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default AudioDisplay;
