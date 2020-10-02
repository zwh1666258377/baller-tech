import * as React from 'react';
import { Button, Layout, Menu } from 'antd';
import { Link, useHistory, useParams } from 'umi';

const { Header, Content, Sider } = Layout;

const siders = [
  {
    key: 'jqfy',
    name: '机器翻译',
  },
];

const basePath = '/admin';

const generateSiderPath = (siderKey: string) => {
  return `${basePath}/${siderKey}`;
};

export default ({ children }) => {
  const defaultTab = siders[0].key;
  const { tab } = useParams<{ tab: string }>();
  const history = useHistory();

  React.useEffect(() => {
    if (!tab || !siders.map(({ key }) => key).includes(tab)) {
      history.push(generateSiderPath(defaultTab));
    }
  }, [tab]);

  return (
    <Layout style={{ height: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ color: '#fff' }}>Baller Tech</div>
        <Button
          type="link"
          onClick={() =>
            fetch('/api/logout', { method: 'POST' }).then(() =>
              location.reload(),
            )
          }
        >
          退出登录
        </Button>
      </Header>
      <Layout style={{ display: 'flex', flexDirection: 'row' }}>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[tab || siders[0].key]}
            style={{ height: '100%', borderRight: 0 }}
          >
            {siders.map(({ key, name }) => {
              return (
                <Menu.Item key={key}>
                  <Link to={generateSiderPath(key)}>{name}</Link>
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              backgroundColor: '#fff',
              overflowY: 'scroll',
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
