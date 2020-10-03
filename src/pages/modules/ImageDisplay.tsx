import { Col, Row } from 'antd';
import React from 'react';
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

const ImageDisplay = () => {
  return (
    <div>
      <MTitle label={{ cn: '产品展示', en: 'Product Display' }} />
      <div style={{ marginTop: 52 }}>
        <Row gutter={[110, 55]}>
          {imgList.map(a => (
            <Col key={a.label} sm={24} xl={12}>
              <img
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
