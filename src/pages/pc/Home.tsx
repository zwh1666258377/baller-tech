import { Carousel } from 'antd';
import React, { CSSProperties } from 'react';
import { Colors, rem } from '../common/Styles';
import BTFooter from '../parts/BTFooter';
import { Motion, spring } from 'react-motion';
import MTitle from '../parts/MTitle';
import { Link, useHistory } from 'umi';
import ImageCarousel from '../modules/ImageCarousel';
import { getModule, getWebsite } from '../common/DataApi';
import { PageProps } from '../common/Defs';
import { btnImg } from '../common/Source';
import { configResponsive, useResponsive } from 'ahooks';

configResponsive({
  isPC: 750,
});

interface Props extends PageProps {
  children: React.ReactChildren;
}

const Home = (props: PageProps) => {
  const module = props.data?.module;
  const website = props.data?.website;
  const springConfig = {
    stiffness: 130,
    damping: 30,
  };

  const isPC = useResponsive()?.isPC;
  const { push } = useHistory();

  React.useEffect(() => {
    !isPC && push('/m');
  }, [isPC]);

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
          {website?.carousels?.pc?.map((url, i) => (
            <div key={i}>
              <div
                style={{
                  width: '100%',
                  height: '100vh',
                  backgroundImage: `url(${url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
            </div>
          ))}
        </Carousel>
      </div>
      <div
        style={{
          width: rem(303),
          height: rem(84),
          position: 'absolute',
          top: rem(41),
          left: rem(45),
        }}
      >
        <img src={website?.icon} style={{ width: '100%', height: '100%' }} />
      </div>
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
            maxWidth: rem(1400),
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
              width: '85%',
              maxWidth: rem(1240),
              margin: '0 auto',
            }}
          >
            <div style={{ marginBottom: rem(80), color: '#FFF' }}>
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
                      {website?.slogan?.main}
                    </div>
                    <div
                      style={{
                        marginTop: rem(10),
                        fontSize: 20,
                        transform: `translate(${-x}%)`,
                        opacity: o,
                      }}
                    >
                      {website?.slogan?.sub}
                    </div>
                  </>
                )}
              </Motion>
            </div>
            <div style={{ display: 'flex' }}>
              <ImgLabel
                style={{ marginRight: rem(20) }}
                url={btnImg.jqfy}
                to="jqfy"
              />
              <ImgLabel
                style={{ marginRight: rem(20) }}
                url={btnImg.yysb}
                to="yysb"
              />
              <ImgLabel url={btnImg.yyhc} to="yyhc" />
            </div>
            <div style={{ marginTop: rem(20), display: 'flex' }}>
              <ImgLabel
                style={{ marginRight: rem(20) }}
                url={btnImg.wzsb}
                to="wzsb"
              />
              <ImgLabel
                style={{ maxWidth: rem(820) }}
                url={btnImg.txsb}
                to="txsb"
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '85%',
              maxWidth: rem(1240),
              margin: 'auto',
            }}
          >
            <div>
              <MTitle
                style={{ fontSize: 32 }}
                label={website?.contact?.name}
                color="#FFF"
              />
            </div>
            <div
              style={{
                marginTop: rem(68),
                whiteSpace: 'pre-line',
                lineHeight: 2,
                fontSize: 20,
                color: '#FFF',
              }}
            >
              {website?.contact?.content}
            </div>
            <ImageCarousel
              imgs={module?.partne?.imgUrls}
              style={{ marginTop: rem(60) }}
              pageSize={{ normal: 5 }}
            />
          </div>
        </div>
        <BTFooter
          data={website}
          style={{ width: '100%', marginTop: rem(80) }}
        />
      </div>
    </div>
  );
};

Home.getInitialProps = async () => {
  const module = await getModule('ljwm');
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
          maxWidth: rem(400),
          maxHeight: rem(130),
          ...props.style,
        }}
      >
        <img src={props.url} style={{ width: '100%', height: '100%' }} />
      </div>
    </Link>
  );
};
