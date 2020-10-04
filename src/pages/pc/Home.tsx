import { Carousel } from 'antd';
import React, { CSSProperties } from 'react';
import { Colors } from '../common/Styles';
import BTFooter from '../parts/BTFooter';
import { Motion, spring } from 'react-motion';
import MTitle from '../parts/MTitle';

const Home = () => {
  const springConfig = {
    stiffness: 100,
    damping: 30,
  };

  return (
    <div
      style={{
        overflowY: 'auto',
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
          }}
        >
          <div>
            <img
              src={'/api/get/file?id=5f7975ffaf9a795f27dd23f4'}
              style={{ width: '100%', height: '100vh' }}
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
        <img
          src="/api/get/file?id=5f79753aaf9a795f27dd23f3"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: 1280,
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
                      大牛儿科技 | 智能生活
                    </div>
                    <div
                      style={{
                        fontSize: 20,
                        transform: `translate(${-x}%)`,
                        opacity: o,
                      }}
                    >
                      10年服务经验积累，9种安全保障，8种服务场景，优质服务值得您信赖
                    </div>
                  </>
                )}
              </Motion>
            </div>
            <div style={{ display: 'flex' }}>
              <ImgLabel
                style={{ marginRight: 20 }}
                url="/api/get/file?id=5f7973d3af9a795f27dd23ee"
              />
              <ImgLabel
                style={{ marginRight: 20 }}
                url="/api/get/file?id=5f7973e0af9a795f27dd23f2"
              />
              <ImgLabel url="/api/get/file?id=5f7973deaf9a795f27dd23f1" />
            </div>
            <div style={{ marginTop: 20, display: 'flex' }}>
              <ImgLabel
                style={{ marginRight: 20 }}
                url="/api/get/file?id=5f7973dcaf9a795f27dd23f0"
              />
              <ImgLabel
                style={{ width: 820 }}
                url="/api/get/file?id=5f7973d8af9a795f27dd23ef"
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
                label={{ cn: '联系我们', en: 'Contact Us' }}
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
                {`北京大牛儿科技发展有限公司（Baller Tech）位于北京经济技术开发区，
是一家专业从事智能视觉、智能语音和智能语义的高科技公司，于2020年获得中关村高新技术企业认证，在图像文字识别、图像目标检测、视频目标检测、语音识别	、语音合成、机器翻译等方向，有多款成熟产品。


Baller Tech面向智能视觉、智能语音和智能语义这三大核心技术方向，组建了专业的科研、工程、产品和项目团队，倡导“专业、务实、高效、创新”的企业精神。优美的工作环境以及良好	的激励机制，吸引了一批年轻、有学识、具有实干精神的人才。高素质、高水平、高效率的人才是大牛儿科技在当今激烈的市场中立于不败之地的保障。随着人工智能时代的到来，Baller Tech将不断创新发展，让您的生活因智能而美好！`}
              </div>
            </div>
          </div>
        </div>
        <BTFooter style={{ marginTop: 80 }} />
      </div>
    </div>
  );
};

export default Home;

const ImgLabel = (props: { style?: CSSProperties; url: string }) => {
  const [shadow, setShadow] = React.useState({});

  return (
    <div
      className="home_btn"
      style={{
        borderRadius: 10,
        cursor: 'pointer',
        color: '#FFF',
        backgroundColor: Colors.btColor,
        width: 400,
        height: 130,
        ...shadow,
        ...props.style,
      }}
    >
      <img src={props.url} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};
