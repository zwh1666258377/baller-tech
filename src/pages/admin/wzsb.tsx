import * as React from 'react';
import { Button, Form, Input, notification, Spin, Typography } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Index = () => {
  const [form] = Form.useForm();
  const [usageScenariosImgUrls, setUsageScenariosImgUrls] = React.useState<
    string[]
  >([]);
  const [loading, setLoading] = React.useState(true);

  const submit = value => {
    setLoading(true);
    const data = {
      kind: 'wzsb',
      name: {
        cn: value['name-cn'],
        en: value['name-en'],
      },
      poductIntroduction: {
        title: {
          cn: value['poduct-introduction-name-cn'],
          en: value['poduct-introduction-name-en'],
        },
        imgUrl: value['poduct-introduction-img-url'],
        content: value['poduct-introduction-content'],
        button: {
          text: value['poduct-introduction-button-text'],
          url: value['poduct-introduction-button-link'],
        },
      },
      usageScenarios: {
        title: {
          cn: value['usage-scenarios-name-cn'],
          en: value['usage-scenarios-name-en'],
        },
        imgUrls: usageScenariosImgUrls,
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
        kind: 'wzsb',
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
          'poduct-introduction-img-url': r?.poductIntroduction?.imgUrl,
          'poduct-introduction-content': r?.poductIntroduction?.content,
          'poduct-introduction-button-text':
            r?.poductIntroduction?.button?.text,
          'poduct-introduction-button-link': r?.poductIntroduction?.button?.url,
          'usage-scenarios-name-cn': r?.usageScenarios?.title?.cn,
          'usage-scenarios-name-en': r?.usageScenarios?.title?.en,
        });
        setUsageScenariosImgUrls(r?.usageScenarios?.imgUrls);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        labelCol={{ span: 8 }}
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
        <Form.Item name="poduct-introduction-img-url" label="图片">
          <Input />
        </Form.Item>
        <Form.Item name="poduct-introduction-content" label="内容">
          <TextArea />
        </Form.Item>
        <Form.Item name="poduct-introduction-button-text" label="按钮文案">
          <Input />
        </Form.Item>
        <Form.Item name="poduct-introduction-button-link" label="按钮链接">
          <Input />
        </Form.Item>
        <Title level={3}>使用场景</Title>
        <Form.Item name="usage-scenarios-name-cn" label="中文Title">
          <Input />
        </Form.Item>
        <Form.Item name="usage-scenarios-name-en" label="英文Title">
          <Input />
        </Form.Item>
        {usageScenariosImgUrls?.map((url, idx) => {
          return (
            <div key={idx} style={{ textAlign: 'center' }}>
              <Text key={idx} type="success">
                {url}
              </Text>
              <DeleteOutlined
                onClick={() => {
                  setUsageScenariosImgUrls((urls = []) => {
                    return urls?.filter(i => i !== url);
                  });
                }}
              />
            </div>
          );
        })}
        <div>
          <Form.Item name="usage-scenarios-img-urls" label="展示图片链接">
            <Input
              suffix={
                <Button
                  onClick={() => {
                    const currentInputUrl = form.getFieldValue(
                      'usage-scenarios-img-urls',
                    );
                    if (!currentInputUrl) {
                      return;
                    }
                    setUsageScenariosImgUrls((urls = []) => {
                      return [...urls, currentInputUrl];
                    });
                    form.setFieldsValue({
                      'usage-scenarios-img-urls': '',
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