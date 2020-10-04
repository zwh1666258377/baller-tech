import React, { CSSProperties } from 'react';
import { Colors } from '../common/Styles';

interface Props {
  style?: CSSProperties;
  label: {
    cn: string;
    en: string;
  };
}

const MTitle = ({ style = {}, label }: Props) => {
  return (
    <div style={{ fontSize: 22, ...style }}>
      <span style={{ color: Colors.btColor }}>{`${label.cn} / `}</span>
      <span style={{ color: '#C2C7CC' }}>{label.en}</span>
    </div>
  );
};

export default MTitle;
