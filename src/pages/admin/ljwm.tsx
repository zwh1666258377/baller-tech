import * as React from 'react';
import { Button, Form, Input, notification, Spin, Typography } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Index = () => {
  const [form] = Form.useForm();
  const [honor, setHonor] = React.useState<string[]>([]);
  const [partne, setPartne] = React.useState<string[]>([]);
  const [contact, setContact] = React.useState<string[]>([]);
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
        title: {
          cn: value['poduct-introduction-name-cn'],
          en: value['poduct-introduction-name-en'],
        },
        content: value['poduct-introduction-content'],
      },
      honor: {
        title: {
          cn: value['honor-name-cn'],
          en: value['honor-name-en'],
        },
        imgUrls: honor,
      },
      partne: {
        title: {
          cn: value['usage-scenarios-name-cn'],
          en: value['usage-scenarios-name-en'],
        },
        imgUrls: partne,
      },
      contact: {
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
        <Title level={3}>产品介绍</Title>
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
        {honor?.map((url, idx) => {
          return (
            <div key={idx} style={{ textAlign: 'center' }}>
              <Text key={idx} type="success">
                {url}
              </Text>
              <DeleteOutlined
                onClick={() => {
                  setHonor((urls = []) => {
                    return urls?.filter(i => i !== url);
                  });
                }}
              />
            </div>
          );
        })}
        <div>
          <Form.Item name="honor-img-urls" label="展示图片链接">
            <Input
              suffix={
                <Button
                  onClick={() => {
                    const currentInputUrl = form.getFieldValue(
                      'honor-img-urls',
                    );
                    if (!currentInputUrl) {
                      return;
                    }
                    setHonor((urls = []) => {
                      return [...urls, currentInputUrl];
                    });
                    form.setFieldsValue({
                      'honor-img-urls': '',
                    });
                  }}
                >
                  增加
                </Button>
              }
            />
          </Form.Item>
        </div>

        <Title level={3}>合作伙伴</Title>
        {partne?.map((url, idx) => {
          return (
            <div key={idx} style={{ textAlign: 'center' }}>
              <Text key={idx} type="success">
                {url}
              </Text>
              <DeleteOutlined
                onClick={() => {
                  setPartne((urls = []) => {
                    return urls?.filter(i => i !== url);
                  });
                }}
              />
            </div>
          );
        })}
        <div>
          <Form.Item name="partne-img-urls" label="展示图片链接">
            <Input
              suffix={
                <Button
                  onClick={() => {
                    const currentInputUrl = form.getFieldValue(
                      'partne-img-urls',
                    );
                    if (!currentInputUrl) {
                      return;
                    }
                    setPartne((urls = []) => {
                      return [...urls, currentInputUrl];
                    });
                    form.setFieldsValue({
                      'partne-img-urls': '',
                    });
                  }}
                >
                  增加
                </Button>
              }
            />
          </Form.Item>
        </div>

        <Title level={3}>联系我们</Title>
        {contact?.map((url, idx) => {
          return (
            <div key={idx} style={{ textAlign: 'center' }}>
              <Text key={idx} type="success">
                {url}
              </Text>
              <DeleteOutlined
                onClick={() => {
                  setContact((urls = []) => {
                    return urls?.filter(i => i !== url);
                  });
                }}
              />
            </div>
          );
        })}
        <div>
          <Form.Item name="contact-img-urls" label="展示图片链接">
            <Input
              suffix={
                <Button
                  onClick={() => {
                    const currentInputUrl = form.getFieldValue(
                      'contact-img-urls',
                    );
                    if (!currentInputUrl) {
                      return;
                    }
                    setContact((urls = []) => {
                      return [...urls, currentInputUrl];
                    });
                    form.setFieldsValue({
                      'contact-img-urls': '',
                    });
                  }}
                >
                  增加
                </Button>
              }
            />
          </Form.Item>
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
