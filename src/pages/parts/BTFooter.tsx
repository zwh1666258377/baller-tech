import React from 'react';
import { Layout } from 'antd';
import { Colors } from '../common/Styles';

const Footer = Layout.Footer;

const BTFooter = () => {
  return (
    <div
      style={{
        color: '#FFF',
        textAlign: 'center',
        backgroundColor: Colors.btFooterBackground,
        padding: '60px 60px 10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ textAlign: 'left', color: '#FFF' }}>
          <div style={{ fontSize: 20, marginBottom: 12, whiteSpace: 'nowrap' }}>
            {'北京大牛儿科技发展有限公司（Baller Tech）'}
          </div>
          {[
            {
              label: '地址',
              value: '北京市朝阳区三元桥时间国际8号楼',
            },
            {
              label: '电话',
              value: '010-00000000',
            },
            {
              label: '邮箱',
              value: 'support@modao.cc',
            },
          ].map(info => (
            <div key={info.label} style={{ marginBottom: 4 }}>
              {info.label}：{info.value}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'left', marginLeft: 20 }}>
          <div style={{ fontSize: 16, color: '#AEAEAE' }}>{'产品服务'}</div>
          <div style={{ marginTop: 16 }}>
            {[
              { label: '机器翻译', url: '' },
              { label: '语音识别', url: '' },
              { label: '语音翻译', url: '' },
              { label: '文字识别', url: '' },
              { label: '图像识别和目标检测', url: '' },
            ].map(d => (
              <span style={{ marginRight: 110, whiteSpace: 'nowrap' }}>
                {d.label}
              </span>
            ))}
          </div>
          <div style={{ marginTop: 20, fontSize: 16, color: '#AEAEAE' }}>
            {'走进大牛儿科技'}
          </div>
          <div style={{ marginTop: 16 }}>
            {[
              { label: '关于我们', url: '' },
              { label: '荣誉资质', url: '' },
              { label: '联系我们', url: '' },
            ].map(d => (
              <span style={{ marginRight: 110, whiteSpace: 'nowrap' }}>
                {d.label}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 60, color: '#C2C7CC' }}>
        北京大牛儿科技发展有限公司 ©2019-2020 baller-tech.com 版权所有
        京ICP备19015270号
      </div>
    </div>
  );
};

export default BTFooter;
