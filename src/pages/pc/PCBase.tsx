import React from 'react';
import { Website } from '../common/Defs';
import { Colors } from '../common/Styles';
import BTFooter from '../parts/BTFooter';
import BTSider from '../parts/BTSider';

interface Props {
  kind: string;
  content: () => React.ReactNode;
  website: Website;
}

const PCBase = (props: Props) => {
  return (
    <div style={{ minWidth: 1200, display: 'flex', flexDirection: 'row' }}>
      <div
        style={{
          overflow: 'auto',
          height: '100vh',
          backgroundColor: Colors.btColor,
          width: '20%',
          minWidth: 210,
        }}
      >
        <BTSider kind={props.kind} icon={props.website?.icon} />
      </div>
      <div style={{ width: '80%', overflow: 'auto', height: '100vh' }}>
        {props.content()}
      </div>
    </div>
  );
};

export default PCBase;
