import { Layout } from 'antd';
import React from 'react';
import { useHistory } from 'umi';
import { Module } from '../common/Module';
import ProductIntro from '../modules/ProductIntro';
import UsageScenarios from '../modules/UsageScenarios';

const Content = Layout.Content;

interface Props {
  kind?: string;
}

const BTContent = (props: Props) => {
  const h = useHistory();
  // const [module, setModule] = React.useState<Module>();
  const module = {};

  React.useEffect(() => {}, []);

  return (
    <div style={{ padding: 24 }}>
      {
        // module?.poductIntroduction &&
        <ProductIntro />
      }
      {
        // module?.usageScenarios &&
        <UsageScenarios style={{ marginTop: 115 }} />
      }
    </div>
  );
};

export default BTContent;
