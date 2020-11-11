import React from 'react';
import { Link } from 'umi';
import { rem } from '../common/Styles';

interface Props {
  icon: string;
}

const BTSider = (props: Props) => {
  const [tabs, setTabs] = React.useState<{ label: string; kind: string }[]>();
  React.useEffect(() => {
    fetchDashboard().then(r => {
      setTabs(r);
    });
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          height: rem(84),
          marginTop: rem(40),
          color: '#FFF',
          marginLeft: rem(40),
          marginRight: rem(40),
        }}
      >
        <Link to="/">
          <img
            style={{ width: rem(300), height: 'auto' }}
            src={props.icon}
            alt=""
          />
        </Link>
      </div>
      <div style={{ marginTop: rem(65), width: '100%' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          {tabs?.map(t => {
            const active = window.location.pathname.includes(t.kind);
            return (
              <Link key={t.kind} to={t.kind}>
                <div
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: '10px 0',
                  }}
                >
                  <div
                    style={{
                      fontSize: active ? rem(20) : rem(18),
                      padding: rem(20),
                      color: active ? '#FFF' : '#A4CCF7',
                    }}
                  >
                    {t.label}
                  </div>
                  <div
                    style={{
                      height: rem(50),
                      width: rem(6),
                      backgroundColor: '#FFF',
                      opacity: active ? 1 : 0,
                      marginRight: rem(2),
                    }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BTSider;

async function fetchDashboard() {
  return [
    {
      label: '机器翻译',
      kind: 'jqfy',
    },
    {
      label: '语音识别',
      kind: 'yysb',
    },
    {
      label: '语音合成',
      kind: 'yyhc',
    },
    {
      label: '文字识别',
      kind: 'wzsb',
    },
    {
      label: '图像识别和目标检测',
      kind: 'txsb',
    },
    {
      label: '了解我们',
      kind: 'ljwm',
    },
  ];
}
