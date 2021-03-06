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
import { DownOutlined } from '@ant-design/icons';

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
            alignItems: 'center',
            maxWidth: rem(1400),
            margin: 'auto',
          }}
        >
          <div style={{ margin: '0 100px' }}>
            <div
              style={{
                zIndex: 99,
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                maxWidth: rem(1240),
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
                          fontSize: rem(36),
                          transform: `translate(${x}%)`,
                          opacity: o,
                        }}
                      >
                        {website?.slogan?.main}
                      </div>
                      <div
                        style={{
                          marginTop: rem(10),
                          fontSize: rem(20),
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
                  to="mt"
                />
                <ImgLabel
                  style={{ marginRight: rem(20) }}
                  url={btnImg.yysb}
                  to="asr"
                />
                <ImgLabel url={btnImg.yyhc} to="tts" />
              </div>
              <div style={{ marginTop: rem(20), display: 'flex' }}>
                <ImgLabel
                  style={{ marginRight: rem(20) }}
                  url={btnImg.wzsb}
                  to="ocr"
                />
                <ImgLabel
                  style={{ maxWidth: rem(820) }}
                  url={btnImg.txsb}
                  to="od"
                />
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: rem(48),
                  left: 0,
                  right: 0,
                  textAlign: 'center',
                }}
              >
                <DownOutlined
                  className="bt-anim-opacity"
                  style={{
                    fontSize: rem(80),
                    color: '#fff',
                    opacity: 0.6,
                    transform: 'scaleX(1.5) scaleY(1)',
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: rem(1240),
                minHeight: '60vh',
                paddingTop: rem(20),
              }}
            >
              <div>
                <MTitle
                  style={{ fontSize: rem(32) }}
                  label={website?.contact?.name}
                  color="#FFF"
                />
              </div>
              <div
                style={{
                  marginTop: rem(68),
                  whiteSpace: 'pre-line',
                  lineHeight: 2,
                  fontSize: rem(20),
                  color: '#FFF',
                }}
              >
                {website?.contact?.content}
              </div>
              <ImageCarousel
                preview={false}
                imgs={module?.partne?.imgUrls}
                style={{ marginTop: rem(60) }}
                pageSize={{ normal: 5 }}
              />
            </div>
          </div>
        </div>
        <BTFooter
          // useRem
          data={website}
          style={{
            width: '100%',
            marginTop: rem(80),
            padding: '0.6rem 0rem 0.04rem',
          }}
          innerStyle={{
            maxWidth: rem(1240),
            margin: 'auto',
          }}
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
