import { Carousel, Col, Image, Row } from 'antd';
import React, { CSSProperties } from 'react';
import MTitle from '../parts/MTitle';

interface Item {
  url: string;
  name: string;
}

interface Props {
  imgs: Item[];
  style?: CSSProperties;
  label?: { cn: string; en: string };
  pageSize?: { normal?: number; line?: number };
  autoplay?: boolean;
  h5?: boolean;
}

const ImageCarousel = (props: Props) => {
  if (!props.imgs || props.imgs.length === 0) {
    return null;
  }
  const pageSize = props.pageSize?.normal || 3;
  const line = props.pageSize?.line || 1;
  const list = imgList(props.imgs, pageSize);
  const autoplay = props.autoplay === undefined ? true : props.autoplay;
  return (
    <div style={props.style}>
      {props.label && (
        <MTitle
          style={{ marginBottom: props.h5 ? 20 : 52 }}
          label={props.label}
        />
      )}
      <div>
        <Carousel autoplay={autoplay} autoplaySpeed={5000}>
          {list.map((l, i) => {
            const renderRow = (data: Item[], i: number) => {
              return (
                <Row key={i}>
                  <div style={{ display: 'flex' }}>
                    {data.map((item, i) => (
                      <div
                        key={item?.url + i}
                        style={{
                          width: `${100 / (pageSize / line)}%`,
                          marginRight:
                            (i + 1) % (pageSize / line) !== 0 ? 10 : 0,
                        }}
                      >
                        {item?.url ? (
                          <Image
                            style={{ width: '100%', height: 'auto' }}
                            src={item?.url}
                          />
                        ) : (
                          <div
                            style={{
                              width: '100%',
                              height: 'auto',
                              color: '#000',
                            }}
                          ></div>
                        )}
                      </div>
                    ))}
                  </div>
                </Row>
              );
            };

            let dataList = [l];
            if (line !== 0) {
              dataList = imgList(l, pageSize / line);
            }

            return <div key={i}>{dataList.map(renderRow)}</div>;
          })}
        </Carousel>
      </div>
    </div>
  );

  function imgList(imgs: Item[], num: number) {
    const data = Array.from(imgs);
    const list: Item[][] = [];
    while (data.length > 0) {
      list.push(data.splice(0, num));
    }
    if (list.length > 0 && list[list.length - 1].length < num) {
      const last = list.pop() || [];
      const newLast: Item[] = [];
      for (let i = 0; i < pageSize; i++) {
        if (i < last?.length) {
          newLast.push(last[i]);
        } else {
          newLast.push({ url: '', name: '' });
        }
      }
      list.push(newLast);
    }
    return list;
  }
};

export default ImageCarousel;
