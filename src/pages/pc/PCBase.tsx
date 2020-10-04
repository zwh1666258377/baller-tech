import React from 'react';
import { useHistory } from 'umi';
import { Colors } from '../common/Styles';
import { ViewportProvider } from '../common/ViewportContext';
import BTFooter from '../parts/BTFooter';
import BTSider from '../parts/BTSider';

interface Props {
  kind: string;
  content: () => React.ReactNode;
}

const PCBase = (props: Props) => {
  const h = useHistory();

  return (
    <ViewportProvider>
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
          <BTSider
            kind={props.kind}
            onTabChange={kind => {
              h.push(`/d/${kind}`);
            }}
          />
        </div>
        <div style={{ width: '80%', overflow: 'auto', height: '100vh' }}>
          {props.content()}
          <BTFooter />
        </div>
      </div>
    </ViewportProvider>
  );
};

export default PCBase;
