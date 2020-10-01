import React from 'react';

interface Props {
  label: {
    cn: string;
    en: string;
  };
}

const MTitle = (props: Props) => {
  return (
    <div>
      <span>{props.label.cn}</span>
      <span>{props.label.en}</span>
    </div>
  );
};

export default MTitle;
