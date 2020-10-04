import React from 'react';
import { isBrowser } from 'umi';

const viewportContext = React.createContext<{ width: number }>({
  width: 0,
});

const defaultWidth = isBrowser() ? window.innerWidth : 1920;

export const ViewportProvider = ({ children }) => {
  const [width, setWidth] = React.useState(defaultWidth);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  React.useEffect(() => {
    if (!isBrowser()) {
      return;
    }
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider value={{ width }}>
      {children}
    </viewportContext.Provider>
  );
};

export const useViewport = () => {
  const { width } = React.useContext(viewportContext);
  return { width };
};
