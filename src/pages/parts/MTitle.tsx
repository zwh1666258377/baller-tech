import React, { CSSProperties } from 'react';
import { Colors } from '../common/Styles';

interface Props {
  style?: CSSProperties;
  label: {
    cn: string;
    en: string;
  };
  color?: string;
}

const MTitle = ({ style = {}, label, color }: Props) => {
  return (
    <div style={{ fontSize: 22, ...style }}>
      <span style={{ color: color || Colors.btColor }}>{`${label.cn} / `}</span>
      <span style={{ color: color || '#C2C7CC' }}>{label.en}</span>
    </div>
  );
};

export default MTitle;
