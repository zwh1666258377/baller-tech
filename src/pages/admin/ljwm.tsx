import * as React from 'react';
import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Spin,
  Switch,
  Typography,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import { TagList } from '../modules/TagList';

const { Title } = Typography;

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
          cn: value['partne-name-cn'],
          en: value['partne-name-en'],
        },
        imgUrls: partne,
      },
      contact: {
        display: value['contact-display'],
        title: {
          cn: value['contact-name-cn'],
          en: value['contact-name-en'],
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
          'poduct-introduction-name-en': r?.poductIntroduction?.title?.en,
          'poduct-introduction-content': r?.poductIntroduction?.content,
          'poduct-introduction-display': r?.poductIntroduction?.display,
          'honor-display': r?.honor?.display,
          'honor-name-cn': r?.honor?.title?.cn,
          'honor-name-en': r?.honor?.title?.en,
          'partne-display': r?.partne?.display,
          'partne-name-cn': r?.partne?.title?.cn,
          'partne-name-en': r?.partne?.title?.en,
          'contact-display': r?.contact?.display,
          'contact-name-cn': r?.contact?.title?.cn,
          'contact-name-en': r?.contact?.title?.en,
        });

        setHonor(r?.honor?.imgUrls || []);
        setPartne(r?.partne?.imgUrls || []);
        setContact(r?.contact?.imgUrl || []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 18 }}
        onFinish={submit}
      >
        {/* <Form.Item name="name-cn" label="栏目中文名">
          <Input />
        </Form.Item>
        <Form.Item name="name-en" label="栏目英文名">
          <Input />
        </Form.Item> */}
        <Title level={3}>公司简介</Title>
        <Form.Item
          name="poduct-introduction-display"
          label="展示"
          valuePropName="checked"
        >
          <Switch
            defaultChecked={form.getFieldValue('poduct-introduction-display')}
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
        <Form.Item name="honor-display" label="展示" valuePropName="checked">
          <Switch
            defaultChecked={form.getFieldValue('honor-display')}
            onChange={v => {
              form.setFieldsValue({ 'honor-display': v });
            }}
          />
        </Form.Item>
        <Form.Item name="honor-name-cn" label="中文Title">
          <Input />
        </Form.Item>
        <Form.Item name="honor-name-en" label="英文Title">
          <Input />
        </Form.Item>
        <Form.Item name="honor-img-url" label="展示图片链接">
          <Input />
        </Form.Item>
        <Form.Item name="honor-img-name" label="展示图片名">
          <Input />
        </Form.Item>
        <Form.Item label={' '} colon={false}>
          <Button
            onClick={() => {
              const currentInputUrl = form.getFieldValue('honor-img-url');
              const currentInputName = form.getFieldValue('honor-img-name');

              if (!currentInputUrl || !currentInputName) {
                Modal.error({ content: '链接或名称不得为空' });
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
        </Form.Item>
        {honor?.length > 0 && (
          <Form.Item label={' '} colon={false}>
            <TagList
              items={honor?.map(r => ({
                title: r.name,
                content: r.url,
              }))}
              onDelete={idx =>
                setHonor((urls = []) => {
                  return urls?.filter((_, i) => i !== idx);
                })
              }
            ></TagList>
          </Form.Item>
        )}

        <Title level={3}>合作伙伴</Title>
        <Form.Item name="partne-display" label="展示" valuePropName="checked">
          <Switch
            defaultChecked={form.getFieldValue('partne-display')}
            onChange={v => {
              form.setFieldsValue({ 'partne-display': v });
            }}
          />
        </Form.Item>
        <Form.Item name="partne-name-cn" label="中文Title">
          <Input />
        </Form.Item>
        <Form.Item name="partne-name-en" label="英文Title">
          <Input />
        </Form.Item>
        <Form.Item name="partne-img-url" label="展示图片链接">
          <Input />
        </Form.Item>
        <Form.Item name="partne-img-name" label="展示图片名">
          <Input />
        </Form.Item>
        <Form.Item label={' '} colon={false}>
          <Button
            onClick={() => {
              const currentInputUrl = form.getFieldValue('partne-img-url');
              const currentInputName = form.getFieldValue('partne-img-name');

              if (!currentInputUrl || !currentInputName) {
                Modal.error({ content: '链接或名称不得为空' });
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
        </Form.Item>
        {partne?.length > 0 && (
          <Form.Item label={' '} colon={false}>
            <TagList
              items={partne?.map(r => ({
                title: r.name,
                content: r.url,
              }))}
              onDelete={idx =>
                setPartne((urls = []) => {
                  return urls?.filter((_, i) => i !== idx);
                })
              }
            ></TagList>
          </Form.Item>
        )}

        <Title level={3}>联系我们</Title>
        <Form.Item name="contact-display" label="展示" valuePropName="checked">
          <Switch
            defaultChecked={form.getFieldValue('contact-display')}
            onChange={v => {
              form.setFieldsValue({ 'contact-display': v });
            }}
          />
        </Form.Item>
        <Form.Item name="contact-name-cn" label="中文Title">
          <Input />
        </Form.Item>
        <Form.Item name="contact-name-en" label="英文Title">
          <Input />
        </Form.Item>
        <Form.Item name="contact-img-url" label="展示图片链接">
          <Input />
        </Form.Item>
        <Form.Item name="contact-img-name" label="展示图片名">
          <Input />
        </Form.Item>
        <Form.Item label={' '} colon={false}>
          <Button
            onClick={() => {
              const currentInputUrl = form.getFieldValue('contact-img-url');

              const currentInputName = form.getFieldValue('contact-img-name');

              if (!currentInputUrl || !currentInputName) {
                Modal.error({ content: '链接或名称不得为空' });
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
        </Form.Item>
        {contact?.length > 0 && (
          <Form.Item label={' '} colon={false}>
            <TagList
              items={contact?.map(r => ({
                title: r.name,
                content: r.url,
              }))}
              onDelete={idx =>
                setContact((urls = []) => {
                  return urls?.filter((_, i) => i !== idx);
                })
              }
            ></TagList>
          </Form.Item>
        )}

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
