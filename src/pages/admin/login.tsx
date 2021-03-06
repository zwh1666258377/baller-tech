import * as React from 'react';
import { Form, Input, Button, Modal } from 'antd';
import { useHistory } from 'umi';
import { siders } from './index';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Index = () => {
  const history = useHistory();
  const onFinish = values => {
    const { account, password } = values;

    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ account, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(r => r.json())
      .then(r => {
        if (r?.status === 'error') {
          Modal.error({ content: r?.msg });
        } else if (r?.status === 'ok') {
          Modal.success({ content: r?.msg });
          history.push(`/admin/${siders[0]?.key}`);
        }
      });
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ minWidth: '340px' }}>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Account"
            name="account"
            rules={[{ required: true, message: 'Please input your account!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Index;
