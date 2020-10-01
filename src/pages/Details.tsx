import React from 'react';
import { Col, Row } from 'antd';
import BTFooter from './parts/BTFooter';
import { useHistory, IGetInitialProps } from 'umi';
import BTContent from './parts/BTContent';
import BTSider from './parts/BTSider';
import { Colors } from './common/Styles';

interface Props {
  kind: string;
}

const Details = (props: Props) => {
  const h = useHistory();

  return (
    <Row>
      <Col span={6}>
        <div
          style={{
            overflow: 'auto',
            height: '100vh',
            backgroundColor: Colors.btBackground,
          }}
        >
          <BTSider
            kind={props.kind}
            onTabChange={kind => {
              h.push(`/d/${kind}`);
            }}
          />
        </div>
      </Col>
      <Col span={18}>
        <div style={{ overflow: 'auto', height: '100vh' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <BTContent kind={props.kind} />
            <BTFooter />
          </div>
        </div>
      </Col>
    </Row>
  );
};

Details.getInitialProps = (async p => {
  const c = p.match.path.split('/');
  const kind = c[c.length - 1];
  return { ...p, kind };
}) as IGetInitialProps;

export default Details;
