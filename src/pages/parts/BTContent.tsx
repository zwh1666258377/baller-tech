import { Layout } from 'antd';
import React from 'react';
import { useHistory } from 'umi';
import { Module } from '../common/Module';
import ProductIntro from '../modules/ProductIntro';
import Translator from '../modules/Translator';
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
    <div style={{ padding: '90px 180px 100px 70px' }}>
      {
        // module?.poductIntroduction &&
        <ProductIntro />
      }
      {
        // module?.usageScenarios &&
        <UsageScenarios style={{ marginTop: 115 }} />
      }
      {<Translator />}
    </div>
  );
};

export default BTContent;
