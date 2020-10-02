import * as React from 'react';
import { Button, Layout, Menu } from 'antd';
import { Link, useHistory, useLocation, useParams } from 'umi';

const { Header, Content, Sider } = Layout;

const siders = [
  {
    key: 'jqfy',
    name: '机器翻译',
  },
  {
    key: 'resources',
    name: '资源管理',
  },
];

const basePath = '/admin';

const generateSiderPath = (siderKey: string) => {
  return `${basePath}/${siderKey}`;
};

export default ({ children }) => {
  const defaultTab = siders[0].key;
  const history = useHistory();
  const location = useLocation();
  const [tabKey, setTabKey] = React.useState('');

  React.useEffect(() => {
    const matchSider = siders.find(({ key }) => {
      return location.pathname.startsWith(generateSiderPath(key));
    });

    if (!matchSider) {
      setTabKey(tabKey);
      history.push(generateSiderPath(tabKey));
    } else {
      setTabKey(matchSider.key);
    }
  }, [location.pathname]);

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
            fetch('/api/logout', { method: 'POST' }).then(() => {
              window?.location.reload();
            })
          }
        >
          退出登录
        </Button>
      </Header>
      <Layout style={{ display: 'flex', flexDirection: 'row' }}>
        <Sider width={200}>
          <Menu
            mode="inline"
            selectedKeys={[tabKey]}
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
