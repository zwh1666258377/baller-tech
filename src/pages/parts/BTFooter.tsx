import React, { CSSProperties } from 'react';
import { Link } from 'umi';
import { Website } from '../common/Defs';
import { Colors, rem } from '../common/Styles';

interface Props {
  style?: CSSProperties;
  data: Website;
}

const BTFooter = (props: Props) => {
  const data = props.data;
  return (
    <div
      style={{
        color: '#FFF',
        textAlign: 'center',
        backgroundColor: Colors.btFooterBackground,
        padding: '0.6rem 0.6rem 0.04rem',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...props.style,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          maxWidth: 1400,
        }}
      >
        <div style={{ textAlign: 'left', color: '#FFF', marginRight: rem(36) }}>
          {data?.companyName?.cn && (
            <div
              style={{
                fontSize: 20,
                marginBottom: rem(12),
                whiteSpace: 'nowrap',
              }}
            >
              {`${data?.companyName?.cn}（${data?.companyName?.en}）`}
            </div>
          )}
          {data?.info?.map((info, i) => (
            <div key={info + i} style={{ marginBottom: rem(4) }}>
              {info}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'left', marginLeft: rem(20) }}>
          <div style={{ fontSize: rem(16), color: '#E1C88E' }}>产品服务</div>
          <div style={{ marginTop: rem(16) }}>
            {[
              { label: '机器翻译', url: '/jqfy' },
              { label: '语音识别', url: '/yysb' },
              { label: '语音翻译', url: '/yyhc' },
              { label: '文字识别', url: '/wzsb' },
              { label: '图像识别和目标检测', url: '/txsb' },
            ].map((d, i) => (
              <Link
                to={d.url}
                key={d.label}
                style={{
                  color: '#FFF',
                  marginRight: i === 4 ? 0 : rem(110),
                  whiteSpace: 'nowrap',
                }}
              >
                {d.label}
              </Link>
            ))}
          </div>
          <div
            style={{ marginTop: rem(20), fontSize: rem(16), color: '#E1C88E' }}
          >
            走进大牛儿科技
          </div>
          <div style={{ marginTop: rem(16) }}>
            {[
              { label: '关于我们', url: '/ljwm' },
              { label: '荣誉资质', url: '/ljwm' },
              { label: '联系我们', url: '/ljwm' },
            ].map((d, i) => (
              <Link
                to={d.url}
                key={d.label}
                style={{
                  color: '#FFF',
                  marginRight: i === 2 ? 0 : rem(110),
                  whiteSpace: 'nowrap',
                }}
              >
                {d.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginTop: rem(120), color: '#C2C7CC' }}>
        <span>{data?.copyright}</span>
        <a style={{ color: '#C2C7CC' }} href={data?.icpUrl} target="__blank">
          <span>{data?.icp}</span>
        </a>
      </div>
    </div>
  );
};

export default BTFooter;
