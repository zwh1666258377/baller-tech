import React from 'react';
import { configResponsive, useResponsive } from 'ahooks';
import { useHistory } from 'umi';
import { Colors } from '../common/Styles';
import BTSider from '../parts/BTSider';
import { getWebsite } from '../common/DataApi';
import { PageProps } from '../common/Defs';
import BTFooter from '../parts/BTFooter';

configResponsive({
  isPC: 750,
});

interface Props extends PageProps {
  children: React.ReactChildren;
}

const Layout = ({ children, data }: Props) => {
  const website = data?.website;
  const isPC = useResponsive()?.isPC;
  const { push } = useHistory();

  React.useEffect(() => {
    !isPC && push('/m');
  }, [isPC]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div
        style={{
          overflowY: 'auto',
          overflowX: 'hidden',
          height: '100vh',
          backgroundColor: Colors.btColor,
          width: '20%',
          minWidth: 210,
        }}
      >
        <BTSider icon={website?.icon} />
      </div>
      <div
        id="bt-content-view"
        style={{
          width: '80%',
          overflowY: 'auto',
          overflowX: 'hidden',
          height: '100vh',
        }}
      >
        {children}
        <BTFooter data={website} />
      </div>
    </div>
  );
};

Layout.getInitialProps = async (props: any) => {
  const website = await getWebsite();
  return { data: { website } };
};

export default Layout;
