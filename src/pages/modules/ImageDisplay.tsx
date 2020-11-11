import { Col, Image, Row } from 'antd';
import React, { CSSProperties } from 'react';
import { rem } from '../common/Styles';
import MTitle from '../parts/MTitle';

interface Props {
  style?: CSSProperties;
  label: { cn: string; en: string };
  items: { url: string; name: string }[];
}

const ImageDisplay = (props: Props) => {
  return (
    <div style={props.style}>
      <MTitle label={props.label} />
      <div style={{ marginTop: rem(52) }}>
        <Row gutter={[110, 55]}>
          {props.items?.map((item, i) => (
            <Col key={item.url + i} span={12}>
              <Image
                style={{ width: '100%', height: 'auto' }}
                src={item.url}
                alt={item.name}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ImageDisplay;
