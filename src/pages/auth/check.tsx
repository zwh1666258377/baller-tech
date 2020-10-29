import * as React from 'react';
import { useHistory } from 'umi';
import fetch from 'node-fetch';

export default ({ children }) => {
  const history = useHistory();

  React.useEffect(() => {
    fetch('/api/auth/check', { method: 'GET' })
      .then(r => r.json())
      .then(r => {
        if (!r?.logged) {
          history.push('/admin/login');
        }
      });
  }, []);

  return <>{children}</>;
};
