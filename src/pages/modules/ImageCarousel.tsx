import { Carousel, Col, Image, Row } from 'antd';
import React, { CSSProperties } from 'react';
import MTitle from '../parts/MTitle';

const imgList = (imgs: string[], num: number) => {
  const data = Array.from(imgs);
  const list: string[][] = [];
  while (data.length > 0) {
    list.push(data.splice(0, num));
  }
  return list;
};

interface Props {
  imgs?: string[];
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
                    {l.map((url, i) => (
                      <div
                        key={url}
                        style={{
                          width: `${100 / pageSize}%`,
                          marginRight: i != l.length - 1 ? 20 : 0,
                        }}
                      >
                        <Image
                          style={{ width: '100%', height: 'auto' }}
                          src={url}
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
