import { Layout } from 'antd';
import React from 'react';
import { useHistory } from 'umi';
import { Module } from '../common/Module';
import AudioDisplay from '../modules/AudioDisplay';
import AudioTranslator from '../modules/AudioTranslator';
import ImageDisplay from '../modules/ImageDisplay';
import ImageTranslator from '../modules/ImageTranslator';
import ProductIntro from '../modules/ProductIntro';
import Translator from '../modules/TextTranslator';
import UsageScenarios from '../modules/UsageScenarios';
import VideoDisplay from '../modules/VideoDisplay';

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
      {<ImageDisplay />}
      {<VideoDisplay />}
      {<AudioDisplay />}
      {<AudioTranslator />}
      {
        // module?.poductIntroduction &&
        <ProductIntro />
      }
      {
        // module?.usageScenarios &&
        <UsageScenarios style={{ marginTop: 115 }} />
      }
      {<Translator />}
      <br />
      {<ImageTranslator />}
    </div>
  );
};

export default BTContent;
