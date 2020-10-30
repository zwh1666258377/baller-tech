import React from 'react';
import { configResponsive, useResponsive } from 'ahooks';
import { Link, useHistory, useLocation } from 'umi';
import { Colors } from '../common/Styles';
import { getWebsite } from '../common/DataApi';
import { PageProps } from '../common/Defs';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';

configResponsive({
  isPC: 750,
});

const routes = [
  {
    path: '/m/jqfy',
    name: '机器翻译',
  },
  {
    path: '/m/yysb',
    name: '语音识别',
  },
  {
    path: '/m/yyhc',
    name: '语音合成',
  },
  {
    path: '/m/wzsb',
    name: '文字识别',
  },
  {
    path: '/m/txsb',
    name: '图像识别和目标检测',
  },
  {
    path: '/m/ljwm',
    name: '了解我们',
  },
];

interface Props {
  children: any;
}
const Layout = (props: Props & PageProps) => {
  const website = props.data?.website;
  const isPC = useResponsive()?.isPC;
  const { push } = useHistory();
  const { pathname } = useLocation();
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    isPC && push('/');
  }, [isPC]);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <div
        style={{
          height: '99px',
          padding: '26px 11px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: Colors.nav,
        }}
      >
        <img
          src={website?.icon}
          style={{ height: '120%' }}
          onClick={() => push('/')}
        />
        {!show ? (
          <MenuOutlined
            style={{ fontSize: 30, color: '#FFF' }}
            onClick={() => setShow(!show)}
          />
        ) : (
          <CloseOutlined
            style={{ fontSize: 30, color: '#FFF' }}
            onClick={() => setShow(!show)}
          />
        )}
      </div>
      {show && (
        <div
          style={{
            paddingTop: '40px',
            flex: 1,
            backgroundColor: '#041a2f',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: '20px',
            position: 'absolute',
            bottom: 0,
            top: 98,
            left: 0,
            right: 0,
            zIndex: 99,
          }}
        >
          {routes?.map(({ path, name }, idx) => {
            const onSelected = pathname.includes(path);
            return (
              <Link
                onClick={() => setShow(!show)}
                to={path}
                key={idx}
                style={{
                  marginBottom: '12px',
                  height: '55px',
                  ...(onSelected
                    ? {
                        borderBottom: '1px solid #fff',
                        color: '#fff',
                      }
                    : { color: '#C8DFF7' }),
                }}
              >
                <div
                  style={{
                    padding: '10px 30px',
                  }}
                >
                  {name}
                </div>
              </Link>
            );
          })}
        </div>
      )}
      <>
        {props.children}
        <div
          style={{
            backgroundColor: '#041a2f',
            padding: '18px 23px 0px',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <section>
            {website?.companyName?.cn && (
              <div style={{ fontSize: 16, marginBottom: 16 }}>
                {`${website?.companyName?.cn}（${website?.companyName?.en}）`}
              </div>
            )}
            {website?.info?.map((info, i) => (
              <div key={info + i} style={{ fontSize: 12, marginBottom: 6 }}>
                {info}
              </div>
            ))}
          </section>
          <div
            style={{
              textAlign: 'center',
              padding: '29px 0 16px',
              color: '#C2C7CC',
            }}
          >
            <a
              style={{ color: '#C2C7CC' }}
              href={website?.icpUrl}
              target="__blank"
            >
              <span>{website?.icp}</span>
            </a>
          </div>
        </div>
      </>
    </div>
  );
};

Layout.getInitialProps = async () => {
  const website = await getWebsite();
  return { data: { website } };
};

export default Layout;
