import React from 'react';
import BTFooter from './parts/BTFooter';
import { useHistory, IGetInitialProps } from 'umi';
import BTContent from './parts/BTContent';
import BTSider from './parts/BTSider';
import { Colors } from './common/Styles';
import { ViewportProvider } from './common/ViewportContext';

interface Props {
  kind: string;
}

const Details = (props: Props) => {
  const h = useHistory();
  const kind = props.kind || '';
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
          {/* <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        > */}
          <BTContent kind={props.kind} />
          <BTFooter />
          {/* </div> */}
        </div>
      </div>
    </ViewportProvider>
  );
};

Details.getInitialProps = (async p => {
  const c = p.match.path.split('/');
  const kind = c[c.length - 1];
  return { ...p, kind };
}) as IGetInitialProps;

export default Details;
