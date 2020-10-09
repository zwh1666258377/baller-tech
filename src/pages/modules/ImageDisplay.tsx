import { Col, Image, Row } from 'antd';
import React, { CSSProperties } from 'react';
import MTitle from '../parts/MTitle';

const imgList = [
  {
    label: '蒙古语样音1',
    url:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601626973766&di=cbfeaaa0d43bc1fcd855db59f93a2539&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201205%2F15%2F152011zser9o5oa9ee9xx6.jpg',
  },
  {
    label: '蒙古语样音2',
    url:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601626973766&di=cbfeaaa0d43bc1fcd855db59f93a2539&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201205%2F15%2F152011zser9o5oa9ee9xx6.jpg',
  },
  {
    label: '蒙古语样音3',
    url:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601626973766&di=cbfeaaa0d43bc1fcd855db59f93a2539&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201205%2F15%2F152011zser9o5oa9ee9xx6.jpg',
  },
];

interface Props {
  style?: CSSProperties;
  label: { cn: string; en: string };
}

const ImageDisplay = (props: Props) => {
  return (
    <div style={props.style}>
      <MTitle label={props.label} />
      <div style={{ marginTop: 52 }}>
        <Row gutter={[110, 55]}>
          {imgList.map(a => (
            <Col key={a.label} sm={24} xl={12}>
              <Image
                style={{ width: '100%', height: 'auto' }}
                src={a.url}
                alt={a.label}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ImageDisplay;
