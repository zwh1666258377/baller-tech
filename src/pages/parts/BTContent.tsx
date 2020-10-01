import { Layout } from 'antd';
import React from 'react';
import { useHistory } from 'umi';

const Content = Layout.Content;

interface Props {
  kind?: string;
}

const BTContent = (props: Props) => {
  const h = useHistory();

  React.useEffect(() => {}, []);

  return (
    <div style={{ padding: 24, textAlign: 'center', height: 1000 }}>
      <div>{props.kind}</div>
      <div onClick={() => h.push('/d/yysb')}>语音识别</div>
      <div onClick={() => h.push('/d/jqfy')}>机器翻译</div>
    </div>
  );
};

export default BTContent;
