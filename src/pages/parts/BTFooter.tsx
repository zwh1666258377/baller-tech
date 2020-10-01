import React from 'react';
import { Layout } from 'antd';
import { Colors } from '../common/Styles';

const Footer = Layout.Footer;

const BTFooter = () => {
  return (
    <Footer
      style={{
        color: '#FFF',
        textAlign: 'center',
        backgroundColor: Colors.btFooterBackground,
      }}
    >
      大牛儿科技发展有限公司
    </Footer>
  );
};

export default BTFooter;
