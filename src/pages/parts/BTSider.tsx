import React from 'react';
import { Colors } from '../common/Styles';

interface Props {
  kind: string;
  onTabChange: (kind: string) => void;
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
          width: '100%',
          height: 84,
          border: '1px solid #FFF',
          marginTop: 40,
          color: '#FFF',
        }}
      >
        大牛儿科技LOGO
      </div>
      <div style={{ marginTop: 100, width: '100%' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          {tabs?.map(t => {
            const active = props.kind === t.kind;
            return (
              <div
                key={t.kind}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '10px 0',
                }}
                onClick={() => {
                  props.onTabChange && props.onTabChange(t.kind);
                }}
              >
                <div
                  style={{
                    fontSize: 18,
                    padding: 20,
                    color: active ? '#FFF' : '#A4CCF7',
                  }}
                >
                  {t.label}
                </div>
                <div
                  style={{
                    height: 50,
                    width: 6,
                    backgroundColor: '#FFF',
                    opacity: active ? 1 : 0,
                    marginRight: 2,
                  }}
                />
              </div>
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
      kind: 'txsbhmbjc',
    },
    {
      label: '了解我们',
      kind: 'ljwm',
    },
  ];
}
