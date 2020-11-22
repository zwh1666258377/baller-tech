import {
  LeftCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Carousel, Col, Image, Row } from 'antd';
import React, { CSSProperties } from 'react';
import { rem } from '../common/Styles';
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

  const carousel = React.useRef<Carousel>(null);

  const pageSize = props.pageSize?.normal || 3;
  const line = props.pageSize?.line || 1;
  const list = imgList(props.imgs, pageSize);
  const autoplay = props.autoplay === undefined ? true : props.autoplay;
  return (
    <div style={props.style}>
      {props.label && (
        <MTitle
          style={{
            fontSize: props.h5 ? 22 : rem(32),
            marginBottom: props.h5 ? 20 : rem(52),
          }}
          label={props.label}
        />
      )}
      <div style={{ position: 'relative' }}>
        <Carousel ref={carousel} autoplay={autoplay} autoplaySpeed={5000}>
          {list?.map((l, i) => {
            const renderRow = (data: Item[], i: number) => {
              return (
                <Row key={i} style={{ marginBottom: rem(10) }}>
                  <div style={{ display: 'flex', width: '100%' }}>
                    {data?.map((item, i) => (
                      <div
                        key={item?.url + i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          width: `${100 / (pageSize / line)}%`,
                          marginRight:
                            (i + 1) % (pageSize / line) !== 0 ? rem(10) : 0,
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

            return <div key={i}>{dataList?.map(renderRow)}</div>;
          })}
        </Carousel>
        {list.length > 1 && (
          <>
            <div className="carousel_btn_prev_container">
              <div
                className="carousel_btn_prev"
                onClick={() => {
                  carousel.current?.prev();
                }}
              >
                <LeftOutlined style={{ fontSize: rem(38), color: '#fff' }} />
              </div>
            </div>
            <div className="carousel_btn_next_container">
              <div
                className="carousel_btn_next"
                onClick={() => {
                  carousel.current?.next();
                }}
              >
                <RightOutlined style={{ fontSize: rem(38), color: '#fff' }} />
              </div>
            </div>
          </>
        )}
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
