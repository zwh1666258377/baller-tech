import React from 'react';

export default ({ children }) => {
  return (
    <div>
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
        <div>logo</div>
        <div>btn</div>
      </div>
      <div style={{ paddingBottom: '75px' }}>{children}</div>
      <div
        style={{
          backgroundColor: '#041a2f',
          padding: '18px 23px 65px',
          color: '#fff',
        }}
      >
        <div
          style={{ fontSize: '16px', marginBottom: '16px', fontWeight: 500 }}
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
    </div>
  );
};
