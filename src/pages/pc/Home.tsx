import { Carousel } from 'antd';
import React, { CSSProperties } from 'react';
import { Colors } from '../common/Styles';
import BTFooter from '../parts/BTFooter';
import { Motion, spring } from 'react-motion';
import MTitle from '../parts/MTitle';
import { Link } from 'umi';
import ImageCarousel from '../modules/ImageCarousel';
import { getWebsite } from '../common/DataApi';
import { Website } from '../common/Defs';
import { btnImg, website } from '../common/Source';

const Home = (props: { data: Website }) => {
  const data = props.data;
  const springConfig = {
    stiffness: 130,
    damping: 30,
  };

  return (
    <div
      style={{
        overflow: 'auto',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <div
        style={{
          zIndex: -99,
          overflowY: 'auto',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      >
        <Carousel
          autoplay
          dots={false}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            height: '100%',
          }}
        >
          <div>
            <img
              style={{ height: '100vh', width: '100%' }}
              src={website.defaultbg}
            />
          </div>
        </Carousel>
      </div>
      <div
        style={{
          width: 303,
          height: 84,
          position: 'absolute',
          top: 41,
          left: 45,
        }}
      >
        <img src={data?.icon} style={{ width: '100%', height: '100%' }} />
      </div>
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: 1400,
            margin: 'auto',
          }}
        >
          <div
            style={{
              zIndex: 99,
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: 1240,
              margin: 'auto',
            }}
          >
            <div style={{ marginBottom: 80, color: '#FFF' }}>
              <Motion
                defaultStyle={{ x: 50, o: 0 }}
                style={{ o: spring(1), x: spring(0, springConfig) }}
              >
                {({ x, o }) => (
                  <>
                    <div
                      style={{
                        fontSize: 36,
                        transform: `translate(${x}%)`,
                        opacity: o,
                      }}
                    >
                      {data.slogan.main}
                    </div>
                    <div
                      style={{
                        fontSize: 20,
                        transform: `translate(${-x}%)`,
                        opacity: o,
                      }}
                    >
                      {data.slogan.sub}
                    </div>
                  </>
                )}
              </Motion>
            </div>
            <div style={{ display: 'flex' }}>
              <ImgLabel
                style={{ marginRight: 20 }}
                url={btnImg.jqfy}
                to="jqfy"
              />
              <ImgLabel
                style={{ marginRight: 20 }}
                url={btnImg.yysb}
                to="yysb"
              />
              <ImgLabel url={btnImg.yyhc} to="yyhc" />
            </div>
            <div style={{ marginTop: 20, display: 'flex' }}>
              <ImgLabel
                style={{ marginRight: 20 }}
                url={btnImg.wzsb}
                to="wzsb"
              />
              <ImgLabel
                style={{ width: 820 }}
                url={btnImg.txsb}
                to="txsbmbjc"
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <MTitle
                style={{ fontSize: 32 }}
                label={data?.contact?.name}
                color="#FFF"
              ></MTitle>
              <div
                style={{
                  marginTop: 68,
                  whiteSpace: 'pre-line',
                  lineHeight: 1.7,
                  fontSize: 20,
                  color: '#FFF',
                }}
              >
                {data.contact.content}
              </div>
              <ImageCarousel
                imgs={[]}
                style={{ marginTop: 60 }}
                pageSize={{ normal: 5 }}
              />
            </div>
          </div>
        </div>
        <BTFooter style={{ marginTop: 80 }} />
      </div>
    </div>
  );
};

Home.getInitialProps = async () => {
  const data = await getWebsite();
  return { data };
};

export default Home;

const ImgLabel = (props: {
  style?: CSSProperties;
  to: string;
  url: string;
}) => {
  return (
    <Link to={props.to}>
      <div
        className="home_btn"
        style={{
          borderRadius: 10,
          cursor: 'pointer',
          color: '#FFF',
          backgroundColor: Colors.btColor,
          width: 400,
          height: 130,
          ...props.style,
        }}
      >
        <img src={props.url} style={{ width: '100%', height: '100%' }} />
      </div>
    </Link>
  );
};
