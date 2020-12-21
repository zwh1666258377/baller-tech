import React, { CSSProperties } from 'react';
import { Link } from 'umi';
import { Website } from '../common/Defs';
import { Colors, rem } from '../common/Styles';

interface Props {
  style?: CSSProperties;
  innerStyle?: CSSProperties;
  data: Website;
  useRem?: boolean;
}

const BTFooter = (props: Props) => {
  const data = props.data;
  const useRem = props.useRem;
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
          maxWidth: rem(1400, useRem),
          margin: 'auto',
          ...props.innerStyle,
        }}
      >
        <div style={{ textAlign: 'left', color: '#FFF', marginRight: rem(36) }}>
          {data?.companyName?.cn && (
            <div
              style={{
                fontSize: rem(20, useRem),
                marginBottom: rem(12),
                whiteSpace: 'nowrap',
              }}
            >
              {`${data?.companyName?.cn}（${data?.companyName?.en}）`}
            </div>
          )}
          {data?.info?.map((info, i) => (
            <div
              key={info + i}
              style={{ marginBottom: rem(4), fontSize: rem(14, useRem) }}
            >
              {info}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'left', marginLeft: rem(20) }}>
          <div style={{ fontSize: rem(16, useRem), color: '#E1C88E' }}>
            产品服务
          </div>
          <div
            style={{ marginTop: rem(16), display: 'flex', flexWrap: 'wrap' }}
          >
            {[
              { label: '机器翻译', url: '/mt' },
              { label: '语音识别', url: '/asr' },
              { label: '语音合成', url: '/tts' },
              { label: '文字识别', url: '/ocr' },
              { label: '图像识别和目标检测', url: '/od' },
            ].map((d, i) => (
              <Link
                to={d.url}
                key={d.label}
                style={{
                  color: '#FFF',
                  marginRight: i === 4 ? 0 : rem(65),
                  marginBottom: rem(10),
                  whiteSpace: 'nowrap',
                  fontSize: rem(14, useRem),
                }}
              >
                {d.label}
              </Link>
            ))}
          </div>
          <div
            style={{
              marginTop: rem(10),
              fontSize: rem(16, useRem),
              color: '#E1C88E',
            }}
          >
            走进大牛儿科技
          </div>
          <div
            style={{ marginTop: rem(16), display: 'flex', flexWrap: 'wrap' }}
          >
            {[
              { label: '关于我们', url: '/about' },
              { label: '荣誉资质', url: '/about' },
              { label: '联系我们', url: '/about' },
            ].map((d, i) => (
              <Link
                to={d.url}
                key={d.label}
                style={{
                  color: '#FFF',
                  marginRight: i === 2 ? 0 : rem(65),
                  marginBottom: rem(10),
                  whiteSpace: 'nowrap',
                  fontSize: rem(14, useRem),
                }}
              >
                {d.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: rem(120),
          color: '#C2C7CC',
          fontSize: rem(14, useRem),
        }}
      >
        <span>{data?.copyright}</span>
        <a style={{ color: '#C2C7CC' }} href={data?.icpUrl} target="__blank">
          <span>{data?.icp}</span>
        </a>
      </div>
    </div>
  );
};

export default BTFooter;
