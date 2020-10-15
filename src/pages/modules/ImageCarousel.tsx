import { Carousel, Col, Image, Row } from 'antd';
import React, { CSSProperties } from 'react';
import MTitle from '../parts/MTitle';

interface Item {
  url: string;
  name: string;
}

const imgList = (imgs: Item[], num: number) => {
  const data = Array.from(imgs);
  const list: Item[][] = [];
  while (data.length > 0) {
    list.push(data.splice(0, num));
  }
  if (num - list[list.length - 1].length > 0) {
    for (let i = 0; i < num - list[list.length - 1].length; i++) {
      list[list.length - 1].push({ url: '', name: '' });
    }
  }
  return list;
};

interface Props {
  imgs: Item[];
  style?: CSSProperties;
  label?: { cn: string; en: string };
  pageSize?: { normal?: number; small?: number };
  autoplay?: boolean;
}

const ImageCarousel = (props: Props) => {
  if (!props.imgs || props.imgs.length === 0) {
    return null;
  }
  const pageSize = props.pageSize?.normal || 3;
  const list = imgList(props.imgs, pageSize);
  const autoplay = props.autoplay === undefined ? true : props.autoplay;
  return (
    <div style={props.style}>
      {props.label && (
        <MTitle style={{ marginBottom: 52 }} label={props.label} />
      )}
      <div>
        <Carousel autoplay={autoplay} autoplaySpeed={5000}>
          {list.map((l, i) => {
            return (
              <div key={i}>
                <Row>
                  <div style={{ display: 'flex' }}>
                    {l.map((item, i) => (
                      <div
                        key={item.url + i}
                        style={{
                          width: `${100 / pageSize}%`,
                          marginRight: (i + 1) % pageSize !== 0 ? 20 : 0,
                        }}
                      >
                        {item.url ? (
                          <Image
                            style={{ width: '100%', height: 'auto' }}
                            src={item.url}
                          />
                        ) : (
                          <div style={{ width: '100%', height: 'auto' }} />
                        )}
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
