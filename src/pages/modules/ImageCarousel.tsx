import { Carousel, Col, Row } from 'antd';
import React, { CSSProperties } from 'react';
import MTitle from '../parts/MTitle';

const res = [
  {
    key: '1',
    url:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601626973766&di=cbfeaaa0d43bc1fcd855db59f93a2539&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201205%2F15%2F152011zser9o5oa9ee9xx6.jpg',
  },
  {
    key: '2',
    url:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601626973766&di=cbfeaaa0d43bc1fcd855db59f93a2539&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201205%2F15%2F152011zser9o5oa9ee9xx6.jpg',
  },
  {
    key: '3',
    url:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601626973766&di=cbfeaaa0d43bc1fcd855db59f93a2539&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201205%2F15%2F152011zser9o5oa9ee9xx6.jpg',
  },
  {
    key: '4',
    url:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601626973766&di=cbfeaaa0d43bc1fcd855db59f93a2539&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201205%2F15%2F152011zser9o5oa9ee9xx6.jpg',
  },
  {
    key: '5',
    url:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601626973766&di=cbfeaaa0d43bc1fcd855db59f93a2539&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201205%2F15%2F152011zser9o5oa9ee9xx6.jpg',
  },
  {
    key: '6',
    url:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601626973766&di=cbfeaaa0d43bc1fcd855db59f93a2539&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201205%2F15%2F152011zser9o5oa9ee9xx6.jpg',
  },
  {
    key: '7',
    url:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601626973766&di=cbfeaaa0d43bc1fcd855db59f93a2539&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201205%2F15%2F152011zser9o5oa9ee9xx6.jpg',
  },
  {
    key: '8',
    url:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601626973766&di=cbfeaaa0d43bc1fcd855db59f93a2539&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201205%2F15%2F152011zser9o5oa9ee9xx6.jpg',
  },
];

const imgList = (num: number) => {
  const data = Array.from(res);
  const list: { url: string; key: string }[][] = [];
  while (data.length > 0) {
    list.push(data.splice(0, num));
  }
  return list;
};

interface Props {
  style?: CSSProperties;
  label?: { cn: string; en: string };
  pageSize?: { normal?: number; small?: number };
  autoplay?: boolean;
}

const ImageCarousel = (props: Props) => {
  const pageSize = props.pageSize?.normal || 3;
  const list = imgList(pageSize);

  return (
    <div style={props.style}>
      {props.label && (
        <MTitle style={{ marginBottom: 58 }} label={props.label} />
      )}
      <div>
        <Carousel autoplay={props.autoplay} autoplaySpeed={5000}>
          {list.map((l, i) => {
            return (
              <div key={i}>
                <Row>
                  <div style={{ display: 'flex' }}>
                    {l.map((d, i) => (
                      <div
                        key={d.key}
                        style={{
                          width: `${100 / pageSize}%`,
                          marginRight: i != l.length - 1 ? 20 : 0,
                        }}
                      >
                        <img
                          style={{ width: '100%', height: 'auto' }}
                          src={d.url}
                        />
                      </div>
                    ))}
                  </div>
                </Row>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default ImageCarousel;
