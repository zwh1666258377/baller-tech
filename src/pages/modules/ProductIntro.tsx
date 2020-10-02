import { Button, Col, Row } from 'antd';
import React, { CSSProperties } from 'react';
import { Module } from '../common/Module';
import { Colors } from '../common/Styles';
import MTitle from '../parts/MTitle';

interface Props {
  style?: CSSProperties;
  imgUrl?: string;
  content?: string;
  title?: { cn: string; en: string };
  button?: { text: string; url: string };
}

const ProductIntro = (props: Props) => {
  return (
    <div style={props.style}>
      <MTitle label={{ cn: '产品介绍', en: 'Product Introduction' }} />
      <div
        style={{
          marginTop: 52,
          display: 'flex',
          width: 'auto',
          maxHeight: 240,
        }}
      >
        <div>
          <img
            style={{
              borderRadius: 10,
              width: '',
              height: 'auto',
              maxHeight: 240,
            }}
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601626973766&di=cbfeaaa0d43bc1fcd855db59f93a2539&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201205%2F15%2F152011zser9o5oa9ee9xx6.jpg"
            alt="机器翻译"
          />
        </div>
        <div
          style={{
            marginLeft: 40,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              color: '#333',
              fontSize: 18,
              textAlign: 'left',
              whiteSpace: 'pre-line',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {desc}
          </div>
          <div>
            <div
              style={{
                fontSize: 18,
                color: '#FFF',
                backgroundColor: Colors.productLink,
                cursor: 'pointer',
                display: 'inline-block',
                borderRadius: 25,
                padding: '8px 50px',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => open('https://www.baidu.com')}
            >
              产品链接
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductIntro;

const desc =
  'Baller Tech自主研发的多种机器翻译产品，\n除了国际常用的2个语种（汉语和英语）的互译之外，\n还覆盖了国内主要少数民族语种（维语、藏语、蒙语、哈语、彝语、朝语和状语）与汉语的互译。\n在翻译速度、准确性和通顺度上，逼近了人工翻译的水平，处于国内最高水平。\n在产品模式上，支持SDK、私有云、公有云三种模式，同事在服务器模式上，支持不同行业领域的定制适配。';
