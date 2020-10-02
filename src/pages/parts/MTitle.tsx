import React from 'react';
import { Colors } from '../common/Styles';

interface Props {
  label: {
    cn: string;
    en: string;
  };
}

const MTitle = (props: Props) => {
  return (
    <div style={{ fontSize: 22 }}>
      <span style={{ color: Colors.btColor }}>{`${props.label.cn} / `}</span>
      <span style={{ color: '#C2C7CC' }}>{props.label.en}</span>
    </div>
  );
};

export default MTitle;
