import * as React from 'react';
import { Button, Form, Input, notification, Spin } from 'antd';

const Index = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const submit = value => {
    setLoading(true);

    fetch('/api/update-user', {
      method: 'POST',
      body: JSON.stringify({ password: value?.password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(r => r.json())
      .then(r => {
        if (r.status === 'error') {
          notification.error({ message: r.msg });
          return;
        }
        notification.success({ message: r.msg });
        fetch('/api/logout', { method: 'POST' }).then(() => {
          window?.location.reload();
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 18 }}
        onFinish={submit}
      >
        <Form.Item>
          <Button
            onClick={() => {
              fetch('/api/update-file-path', { method: 'POST' })
                .then(r => r.json())
                .then(r => {
                  console.log(r);
                });
            }}
          >
            修正路径
          </Button>
        </Form.Item>

        <Form.Item name="password" label="修改密码">
          <Input />
        </Form.Item>

        <div style={{ textAlign: 'right', position: 'sticky', bottom: 20 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </div>
      </Form>
    </Spin>
  );
};

Index.getInitialProps = () => {};

export default Index;
