import React, { CSSProperties } from 'react';
import MTitle from '../parts/MTitle';

interface Props {
  style?: CSSProperties;
}

const UsageScenarios = (props: Props) => {
  return (
    <div style={props.style}>
      <MTitle label={{ cn: '应用场景', en: 'Usage Scenarios' }} />
    </div>
  );
};

export default UsageScenarios;
