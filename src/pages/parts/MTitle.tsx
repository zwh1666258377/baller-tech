import React, { CSSProperties } from 'react';
import { Colors, rem } from '../common/Styles';

interface Props {
  style?: CSSProperties;
  label: {
    cn: string;
    en: string;
  };
  color?: string;
  useRem?: boolean;
}

const MTitle = ({ style = {}, label, color, useRem = false }: Props) => {
  if (!label?.cn) {
    return null;
  }
  return (
    <div style={{ fontSize: rem(22, useRem), ...style }}>
      <span
        style={{ color: color || Colors.btColor }}
      >{`${label?.cn} / `}</span>
      <span style={{ color: color || '#C2C7CC' }}>{label?.en}</span>
    </div>
  );
};

export default MTitle;
