import React from 'react';
import { ViewportProvider } from './common/ViewportContext';
import ImageTranslator from './modules/ImageTranslator';

const MDetails = () => {
  return (
    <ViewportProvider>
      <div style={{ width: '100%' }}>
        <div style={{ padding: '0px 15px' }}>{<ImageTranslator />}</div>
      </div>
    </ViewportProvider>
  );
};

export default MDetails;
