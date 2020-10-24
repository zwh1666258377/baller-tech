import * as React from 'react';
import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Spin,
  Typography,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Index = () => {
  const [form] = Form.useForm();
  const [info, setInfo] = React.useState<string[]>([]);
  const [carouselsH5, setCarouselsH5] = React.useState<string[]>([]);
  const [carouselsPC, setCarouselsPC] = React.useState<string[]>([]);
  const [contactImgUrls, setContactImgUrls] = React.useState<
    Array<{
      url: string;
      name: string;
    }>
  >([]);
  const [loading, setLoading] = React.useState(true);

  const submit = value => {
    setLoading(true);
    const data = {
      kind: 'website',
      icon: value['icon'],
      companyName: {
        cn: value['company-name-cn'],
        en: value['company-name-en'],
      },
      info: info,
      icp: value['icp'],
      slogan: {
        main: value['company-slogan-main'],
        sub: value['company-slogan-sub'],
      },
      contact: {
        name: {
          cn: value['contact-name-cn'],
          en: value['contact-name-en'],
        },
        content: value['company-content'],
        imgUrls: contactImgUrls,
      },
      carousels: {
        h5: carouselsH5,
        pc: carouselsPC,
      },
      callTimesLimitTip: value['call-times-limit-tip'],
    };

    fetch('/api/update-website', {
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
    fetch('/api/get-website', {
      method: 'POST',
      body: JSON.stringify({
        kind: 'website',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(r => r.json())
      .then(r => {
        form.setFieldsValue({
          icon: r?.icon,
          'company-name-cn': r?.companyName?.cn,
          'company-name-en': r?.companyName?.en,
          icp: r?.icp,
          'company-slogan-main': r?.slogan?.main,
          'company-slogan-sub': r?.slogan?.sub,
          'contact-name-cn': r?.contact?.name?.cn,
          'contact-name-en': r?.contact?.name?.en,
          'company-content': r?.contact?.content,
          'call-times-limit-tip': r?.callTimesLimitTip,
        });

        setInfo(r?.info);
        setCarouselsH5(r?.carousels?.h5);
        setCarouselsPC(r?.carousels?.pc);
        setContactImgUrls(r?.contact?.imgUrls);
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
        <Form.Item name="icon" label="网站logo">
          <Input />
        </Form.Item>
        <Form.Item name="icp" label="网站ICP">
          <Input />
        </Form.Item>
        <Form.Item name="company-name-cn" label="公司中文名">
          <Input />
        </Form.Item>
        <Form.Item name="company-name-en" label="公司英文名">
          <Input />
        </Form.Item>
        <Form.Item name="company-slogan-main" label="公司标语-主">
          <Input />
        </Form.Item>
        <Form.Item name="company-slogan-sub" label="公司标语-次">
          <Input />
        </Form.Item>
        <Form.Item name="call-times-limit-tip" label="功能限制提示文案">
          <Input />
        </Form.Item>

        <div>
          {/* ===================== */}
          {info?.map((i, idx) => {
            return (
              <div key={idx} style={{ textAlign: 'center' }}>
                <Text key={idx} type="success">
                  {i}
                </Text>
                <DeleteOutlined
                  onClick={() => {
                    setInfo((urls = []) => {
                      return urls?.filter((_, i) => idx !== i);
                    });
                  }}
                />
              </div>
            );
          })}
          <Form.Item name="website-info" label="网站信息项">
            <Input
              suffix={
                <Button
                  onClick={() => {
                    const currentInputUrl = form.getFieldValue('website-info');
                    if (!currentInputUrl) {
                      return;
                    }
                    setInfo((urls = []) => {
                      return [...urls, currentInputUrl];
                    });
                    form.setFieldsValue({
                      'website-info': '',
                    });
                  }}
                >
                  增加
                </Button>
              }
            />
          </Form.Item>
        </div>

        <div>
          {/* ===================== */}
          {carouselsH5?.map((i, idx) => {
            return (
              <div key={idx} style={{ textAlign: 'center' }}>
                <Text key={idx} type="success">
                  {i}
                </Text>
                <DeleteOutlined
                  onClick={() => {
                    setCarouselsH5((urls = []) => {
                      return urls?.filter((_, i) => idx !== i);
                    });
                  }}
                />
              </div>
            );
          })}
          <Form.Item name="website-CarouselsH5" label="网站H5轮播图">
            <Input
              suffix={
                <Button
                  onClick={() => {
                    const currentInputUrl = form.getFieldValue(
                      'website-CarouselsH5',
                    );
                    if (!currentInputUrl) {
                      return;
                    }
                    setCarouselsH5((urls = []) => {
                      return [...urls, currentInputUrl];
                    });
                    form.setFieldsValue({
                      'website-CarouselsH5': '',
                    });
                  }}
                >
                  增加
                </Button>
              }
            />
          </Form.Item>
        </div>

        <div>
          {/* ===================== */}
          {carouselsPC?.map((i, idx) => {
            return (
              <div key={idx} style={{ textAlign: 'center' }}>
                <Text key={idx} type="success">
                  {i}
                </Text>
                <DeleteOutlined
                  onClick={() => {
                    setCarouselsPC((urls = []) => {
                      return urls?.filter((_, i) => idx !== i);
                    });
                  }}
                />
              </div>
            );
          })}
          <Form.Item name="website-CarouselsPC" label="网站PC轮播图">
            <Input
              suffix={
                <Button
                  onClick={() => {
                    const currentInputUrl = form.getFieldValue(
                      'website-CarouselsPC',
                    );
                    if (!currentInputUrl) {
                      return;
                    }
                    setCarouselsPC((urls = []) => {
                      return [...urls, currentInputUrl];
                    });
                    form.setFieldsValue({
                      'website-CarouselsPC': '',
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

        <Form.Item name="contact-name-cn" label="标题-中文">
          <Input />
        </Form.Item>
        <Form.Item name="contact-name-en" label="标题-英文">
          <Input />
        </Form.Item>

        <Form.Item name="company-content" label="内容">
          <Input.TextArea autoSize={{ minRows: 5 }} />
        </Form.Item>
        {contactImgUrls
          ?.filter(i => !!i)
          ?.map(({ url, name }, idx) => {
            return (
              <div key={idx} style={{ textAlign: 'center' }}>
                <Text type="success">url:{url},</Text>
                <Text type="success">name:{name}</Text>
                <DeleteOutlined
                  onClick={() => {
                    setContactImgUrls((urls = []) => {
                      return urls?.filter((_, i) => idx !== i);
                    });
                  }}
                />
              </div>
            );
          })}
        <div>
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
                Modal.error({ content: '链接或名称不得为空' });
                return;
              }
              setContactImgUrls((urls = []) => {
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
