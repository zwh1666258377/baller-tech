import React from 'react';
import { configResponsive, useResponsive } from 'ahooks';
import { Link, useHistory, useLocation } from 'umi';

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
    path: '/m/txsbhmbjc',
    name: '图像识别和目标检测',
  },
  {
    path: '/m/ljwm',
    name: '了解我们',
  },
];

export default ({ children }) => {
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
        }}
      >
        <div onClick={() => push('/')}>logo</div>
        <div onClick={() => setShow(!show)}>btn</div>
      </div>
      {show ? (
        <div
          style={{
            paddingTop: '40px',
            flex: 1,
            backgroundColor: '#041a2f',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: '20px',
          }}
        >
          {routes.map(({ path, name }, idx) => {
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
      ) : (
        <>
          {children}
          <div
            style={{
              backgroundColor: '#041a2f',
              padding: '18px 23px 65px',
              color: '#fff',
            }}
          >
            <div
              style={{
                fontSize: '16px',
                marginBottom: '16px',
                fontWeight: 500,
              }}
            >
              北京大牛儿科技发展有限公司（Baller Tech）
            </div>
            <div style={{ fontSize: '12px', marginBottom: '6px' }}>
              地址：北京市朝阳区三元桥时间国际8号楼
            </div>
            <div style={{ fontSize: '12px', marginBottom: '6px' }}>
              电话：010-00000000
            </div>
            <div style={{ fontSize: '12px', marginBottom: '6px' }}>
              邮箱：support@modao.cc
            </div>
          </div>
        </>
      )}
    </div>
  );
};
