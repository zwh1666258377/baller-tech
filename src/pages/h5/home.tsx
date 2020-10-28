import { Carousel } from 'antd';
import React, { CSSProperties } from 'react';
import { Motion, spring } from 'react-motion';
import { Link } from 'umi';
import { getModule, getWebsite } from '../common/DataApi';
import { PageProps } from '../common/Defs';
import { btnImg, homeDefault } from '../common/Source';
import { Colors } from '../common/Styles';

const Home = (props: PageProps) => {
  const website = props.data?.website;
  const springConfig = {
    stiffness: 130,
    damping: 30,
  };

  return (
    <div style={{ flex: 1, padding: '30px 24px' }}>
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
            <div
              style={{
                width: '100%',
                height: '100vh',
                // TODO: 从接口读背景图
                backgroundImage: `url(${homeDefault.defaultbg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
          </div>
        </Carousel>
      </div>
      <Motion
        defaultStyle={{ x: 50, o: 0 }}
        style={{ o: spring(1), x: spring(0, springConfig) }}
      >
        {({ x, o }) => (
          <>
            <div
              style={{
                color: '#fff',
                fontSize: 20,
                fontWeight: 500,
                marginBottom: 10,
                transform: `translate(${x}%)`,
                opacity: o,
              }}
            >
              {website?.slogan.main}
            </div>
            <div
              style={{
                color: '#fff',
                fontSize: 14,
                marginBottom: 61,
                transform: `translate(${-x}%)`,
                opacity: o,
              }}
            >
              {website?.slogan.sub}
            </div>
          </>
        )}
      </Motion>
      <div style={{ color: '#fff' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 23,
          }}
        >
          <ImgLabel
            style={{ flex: 1, marginRight: 6 }}
            url={btnImg.jqfy}
            to="m/jqfy"
          />
          <ImgLabel
            style={{ flex: 1, marginLeft: 6 }}
            url={btnImg.yysb}
            to="m/yysb"
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 23,
          }}
        >
          <ImgLabel
            style={{ flex: 1, marginRight: 6 }}
            url={btnImg.yysb}
            to="m/yysb"
          />
          <ImgLabel
            style={{ flex: 1, marginLeft: 6 }}
            url={btnImg.wzsb}
            to="m/wzsb"
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ImgLabel style={{ width: '100%' }} url={btnImg.txsb} to="m/txsb" />
        </div>
      </div>
    </div>
  );
};

Home.getInitialProps = async () => {
  const website = await getWebsite();
  return { data: { module, website } };
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
          height: 'auto',
          ...props.style,
        }}
      >
        <img src={props.url} style={{ width: '100%', height: '100%' }} />
      </div>
    </Link>
  );
};
