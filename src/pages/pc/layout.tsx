import React from 'react';
import { configResponsive, useResponsive } from 'ahooks';
import { useHistory } from 'umi';

configResponsive({
  isPC: 750,
});

export default ({ children }) => {
  const { isPC } = useResponsive();
  const { push } = useHistory();

  React.useEffect(() => {
    !isPC && push('/m');
  }, [isPC]);

  return <>{children}</>;
};
