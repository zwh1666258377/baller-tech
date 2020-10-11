import * as React from 'react';
import {
  Button,
  Form,
  Input,
  message,
  notification,
  Spin,
  Switch,
  Typography,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Index = () => {
  const [form] = Form.useForm();
  const [honor, setHonor] = React.useState<
    Array<{
      url: string;
      name: string;
    }>
  >([]);
  const [partne, setPartne] = React.useState<
    Array<{
      url: string;
      name: string;
    }>
  >([]);
  const [contact, setContact] = React.useState<
    Array<{
      url: string;
      name: string;
    }>
  >([]);
  const [loading, setLoading] = React.useState(true);

  const submit = value => {
    setLoading(true);
    const data = {
      kind: 'ljwm',
      name: {
        cn: value['name-cn'],
        en: value['name-en'],
      },
      poductIntroduction: {
        display: value['poduct-introduction-display'],
        title: {
          cn: value['poduct-introduction-name-cn'],
          en: value['poduct-introduction-name-en'],
        },
        content: value['poduct-introduction-content'],
      },
      honor: {
        display: value['honor-display'],
        title: {
          cn: value['honor-name-cn'],
          en: value['honor-name-en'],
        },
        imgUrls: honor,
      },
      partne: {
        display: value['partne-display'],
        title: {
          cn: value['usage-scenarios-name-cn'],
          en: value['usage-scenarios-name-en'],
        },
        imgUrls: partne,
      },
      contact: {
        display: value['contact-display'],
        title: {
          cn: value['usage-scenarios-name-cn'],
          en: value['usage-scenarios-name-en'],
        },
        imgUrls: contact,
      },
    };

    fetch('/api/update-module', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(r => r.json())
      .then(r => {
        notification.success({ message: '保存成功！' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    setLoading(true);
    fetch('/api/get-module', {
      method: 'POST',
      body: JSON.stringify({
        kind: 'ljwm',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(r => r.json())
      .then(r => {
        form.setFieldsValue({
          'name-cn': r?.name?.cn,
          'name-en': r?.name?.en,
          'poduct-introduction-name-cn': r?.poductIntroduction?.title?.cn,
          'poduct-introduction-name-en': r?.poductIntroduction?.title?.cn,
          'poduct-introduction-content': r?.poductIntroduction?.content,
          'poduct-introduction-display': r?.poductIntroduction?.display,
          'honor-display': r?.honor?.display,
          'partne-display': r?.partne?.display,
          'contact-display': r?.contact?.display,
        });

        setHonor(r?.honor?.imgUrls);
        setPartne(r?.partne?.imgUrls);
        setContact(r?.contact?.imgUrls);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 16 }}
        onFinish={submit}
      >
        <Form.Item name="name-cn" label="栏目中文名">
          <Input />
        </Form.Item>
        <Form.Item name="name-en" label="栏目英文名">
          <Input />
        </Form.Item>
        <Title level={3}>公司简介</Title>
        <Form.Item name="poduct-introduction-display" label="展示">
          <Switch
            checked={form.getFieldValue('poduct-introduction-display')}
            onChange={v => {
              form.setFieldsValue({ 'poduct-introduction-display': v });
            }}
          />
        </Form.Item>
        <Form.Item name="poduct-introduction-name-cn" label="中文Title">
          <Input />
        </Form.Item>
        <Form.Item name="poduct-introduction-name-en" label="英文Title">
          <Input />
        </Form.Item>

        <Form.Item name="poduct-introduction-content" label="内容">
          <TextArea />
        </Form.Item>

        <Title level={3}>荣誉资质</Title>
        <Form.Item name="honor-display" label="展示">
          <Switch
            checked={form.getFieldValue('honor-display')}
            onChange={v => {
              form.setFieldsValue({ 'honor-display': v });
            }}
          />
        </Form.Item>
        {honor
          ?.filter(i => !!i)
          ?.map(({ url, name }, idx) => {
            return (
              <div key={idx} style={{ textAlign: 'center' }}>
                <Text type="success">url:{url},</Text>
                <Text type="success">name:{name}</Text>
                <DeleteOutlined
                  onClick={() => {
                    setHonor((urls = []) => {
                      return urls?.filter(i => !!i?.url && i?.url !== url);
                    });
                  }}
                />
              </div>
            );
          })}
        <div style={{ border: '1px solid red' }}>
          <Form.Item name="honor-img-url" label="展示图片链接">
            <Input />
          </Form.Item>
          <Form.Item name="honor-img-name" label="展示图片名">
            <Input />
          </Form.Item>
          <Button
            onClick={() => {
              const currentInputUrl = form.getFieldValue('honor-img-url');
              const currentInputName = form.getFieldValue('honor-img-name');

              if (!currentInputUrl || !currentInputName) {
                message.warn('链接或名称不得为空');
                return;
              }
              setHonor((urls = []) => {
                return [
                  ...urls,
                  { name: currentInputName, url: currentInputUrl },
                ];
              });

              form.setFieldsValue({
                'honor-img-url': '',
                'honor-img-name': '',
              });
            }}
          >
            增加
          </Button>
        </div>

        <Title level={3}>合作伙伴</Title>
        <Form.Item name="partne-display" label="展示">
          <Switch
            checked={form.getFieldValue('partne-display')}
            onChange={v => {
              form.setFieldsValue({ 'partne-display': v });
            }}
          />
        </Form.Item>
        {partne
          ?.filter(i => !!i)
          ?.map(({ url, name }, idx) => {
            return (
              <div key={idx} style={{ textAlign: 'center' }}>
                <Text type="success">url:{url},</Text>
                <Text type="success">name:{name}</Text>
                <DeleteOutlined
                  onClick={() => {
                    setPartne((urls = []) => {
                      return urls?.filter(i => !!i?.url && i?.url !== url);
                    });
                  }}
                />
              </div>
            );
          })}
        <div style={{ border: '1px solid red' }}>
          <Form.Item name="partne-img-url" label="展示图片链接">
            <Input />
          </Form.Item>
          <Form.Item name="partne-img-name" label="展示图片名">
            <Input />
          </Form.Item>
          <Button
            onClick={() => {
              const currentInputUrl = form.getFieldValue('partne-img-url');
              const currentInputName = form.getFieldValue('partne-img-name');

              if (!currentInputUrl || !currentInputName) {
                message.warn('链接或名称不得为空');
                return;
              }

              setPartne((urls = []) => {
                return [
                  ...urls,
                  { name: currentInputName, url: currentInputUrl },
                ];
              });

              form.setFieldsValue({
                'partne-img-url': '',
                'partne-img-name': '',
              });
            }}
          >
            增加
          </Button>
        </div>

        <Title level={3}>联系我们</Title>
        <Form.Item name="contact-display" label="展示">
          <Switch
            checked={form.getFieldValue('contact-display')}
            onChange={v => {
              form.setFieldsValue({ 'contact-display': v });
            }}
          />
        </Form.Item>
        {contact
          ?.filter(i => !!i)
          ?.map(({ url, name }, idx) => {
            return (
              <div key={idx} style={{ textAlign: 'center' }}>
                <Text type="success">url:{url},</Text>
                <Text type="success">name:{name}</Text>
                <DeleteOutlined
                  onClick={() => {
                    setContact((urls = []) => {
                      return urls?.filter(i => !!i?.url && i?.url !== url);
                    });
                  }}
                />
              </div>
            );
          })}
        <div style={{ border: '1px solid red' }}>
          <Form.Item name="contact-img-url" label="展示图片链接">
            <Input />
          </Form.Item>
          <Form.Item name="contact-img-name" label="展示图片名">
            <Input />
          </Form.Item>
          <Button
            onClick={() => {
              const currentInputUrl = form.getFieldValue('contact-img-url');

              const currentInputName = form.getFieldValue('contact-img-name');

              if (!currentInputUrl || !currentInputName) {
                message.warn('链接或名称不得为空');
                return;
              }

              setContact((urls = []) => {
                return [
                  ...urls,
                  { name: currentInputName, url: currentInputUrl },
                ];
              });

              form.setFieldsValue({
                'contact-img-url': '',
                'contact-img-name': '',
              });
            }}
          >
            增加
          </Button>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Button htmlType="submit">提交</Button>
        </div>
      </Form>
    </Spin>
  );
};

Index.getInitialProps = () => {};

export default Index;
