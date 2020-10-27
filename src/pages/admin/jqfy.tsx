import * as React from 'react';
import {
  Button,
  Col,
  Form,
  Input,
  notification,
  Row,
  Select,
  Spin,
  Switch,
  Tag,
  Typography,
  Modal,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { DeleteOutlined } from '@ant-design/icons';
import { BTTag } from '../parts/BTTag';

const { Title, Text } = Typography;

const Index = () => {
  const [form] = Form.useForm();
  const [usageScenariosImgUrls, setUsageScenariosImgUrls] = React.useState<
    Array<{
      url: string;
      name: string;
    }>
  >([]);
  const [productDisplayItems, setProductDisplayItems] = React.useState<
    { url: string; name: string }[]
  >([]);
  const [loading, setLoading] = React.useState(true);
  const [translationRules, setTranslationRules] = React.useState<
    Array<{
      from: { key: string; label: string };
      to: { key: string; label: string };
    }>
  >([]);
  const [langRegRules, setLangRegRules] = React.useState<
    Array<{
      label: string;
      key: string;
      reg: string;
    }>
  >([]);

  const submit = (value: any) => {
    setLoading(true);
    const data = {
      kind: 'jqfy',
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
        imgUrl: value['poduct-introduction-img-url'],
        content: value['poduct-introduction-content'],
        button: {
          text: value['poduct-introduction-button-text'],
          url: value['poduct-introduction-button-link'],
        },
      },
      productExperience: {
        display: value['product-experience-display'],
      },
      productDisplay: {
        display: value['product-display-display'],
        kind: value['product-display-kind'],
        items: productDisplayItems,
      },
      usageScenarios: {
        display: value['usage-scenarios-display'],
        title: {
          cn: value['usage-scenarios-name-cn'],
          en: value['usage-scenarios-name-en'],
        },
        imgUrls: usageScenariosImgUrls,
      },
      textTranslationRules: translationRules,
      langRegRules,
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
        kind: 'jqfy',
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
          'poduct-introduction-display': r?.poductIntroduction?.display,
          'poduct-introduction-name-cn': r?.poductIntroduction?.title?.cn,
          'poduct-introduction-name-en': r?.poductIntroduction?.title?.cn,
          'poduct-introduction-img-url': r?.poductIntroduction?.imgUrl,
          'poduct-introduction-content': r?.poductIntroduction?.content,
          'poduct-introduction-button-text':
            r?.poductIntroduction?.button?.text,
          'poduct-introduction-button-link': r?.poductIntroduction?.button?.url,
          'product-experience-display': r?.productExperience?.display,
          'product-display-display': r?.productDisplay?.display,
          'product-display-kind': r?.productDisplay?.kind,
          'product-display-items': r?.productDisplay?.items,
          'usage-scenarios-display': r?.usageScenarios?.display,
          'usage-scenarios-name-cn': r?.usageScenarios?.title?.cn,
          'usage-scenarios-name-en': r?.usageScenarios?.title?.en,
        });
        setUsageScenariosImgUrls(r?.usageScenarios?.imgUrls);
        setProductDisplayItems(r?.productDisplay?.items);
        setTranslationRules(r?.textTranslationRules);
        setLangRegRules(r?.langRegRules);
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
        {productIntroduction()}
        {productExperience()}
        {productDisplay()}
        {usageScenarios()}
        <div style={{ textAlign: 'center' }}>
          <Button htmlType="submit">提交</Button>
        </div>
      </Form>
    </Spin>
  );

  function productIntroduction() {
    return (
      <>
        <Title level={3}>产品介绍</Title>
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
      </>
    );
  }

  function productExperience() {
    return (
      <>
        <Title level={3}>产品体验</Title>
        <Form.Item
          name="product-experience-display"
          label="展示"
          valuePropName="checked"
        >
          <Switch
            defaultChecked={form.getFieldValue('product-experience-display')}
            onChange={v => {
              form.setFieldsValue({ 'product-experience-display': v });
            }}
          />
        </Form.Item>
        <Form.Item label="可翻译语种">
          <Form.Item
            style={{ display: 'inline-block', marginBottom: 0 }}
            label="源语种"
          >
            <Form.Item
              name="text-translation-from-label"
              style={{ display: 'inline-block', marginRight: 8 }}
            >
              <Input placeholder="源语种名称" />
            </Form.Item>
            <Form.Item
              name="text-translation-from-key"
              style={{ display: 'inline-block', marginRight: 8 }}
            >
              <Input placeholder="源语种key" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            style={{ display: 'inline-block', marginBottom: 0 }}
            label="目标语种"
          >
            <Form.Item
              name="text-translation-to-label"
              style={{ display: 'inline-block', marginRight: 8 }}
            >
              <Input placeholder="目标语种名称" />
            </Form.Item>
            <Form.Item
              name="text-translation-to-key"
              style={{ display: 'inline-block', marginRight: 8 }}
            >
              <Input placeholder="目标语种key" />
            </Form.Item>
          </Form.Item>
          <Button
            style={{ marginBottom: 24 }}
            onClick={() => {
              const fromLabel = form.getFieldValue(
                'text-translation-from-label',
              );
              const fromKey = form.getFieldValue('text-translation-from-key');
              const toLabel = form.getFieldValue('text-translation-to-label');
              const toKey = form.getFieldValue('text-translation-to-key');
              const rule = {
                from: { label: fromLabel, key: fromKey },
                to: { label: toLabel, key: toKey },
              };
              setTranslationRules([...translationRules, rule]);
            }}
          >
            增加
          </Button>
          {translationRules?.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {translationRules.map((r, i) => {
                return (
                  <BTTag
                    key={i}
                    style={{ margin: '0 8px 8px 0' }}
                    title={`${r.from.label}-${r.to.label} ${r.from.key}-${r.to.key}`}
                    content={`${r.from.key}-${r.to.key}`}
                    onDelete={() => {
                      setTranslationRules(
                        translationRules.filter((_, ri) => ri !== i),
                      );
                    }}
                  />
                );
              })}
            </div>
          )}
        </Form.Item>
        <Form.Item label="语种校验正则表达式">
          <Form.Item
            name="lang-label"
            style={{ display: 'inline-block', marginRight: 8 }}
          >
            <Input placeholder="语种名称" />
          </Form.Item>
          <Form.Item
            name="lang-key"
            style={{ display: 'inline-block', marginRight: 8 }}
          >
            <Input placeholder="语种key" />
          </Form.Item>
          <Form.Item
            name="lang-reg"
            style={{ display: 'inline-block', marginRight: 8 }}
          >
            <Input placeholder="正则表达式" />
          </Form.Item>
          <Button
            style={{ marginBottom: 24 }}
            onClick={() => {
              const label = form.getFieldValue('lang-label');
              const key = form.getFieldValue('lang-key');
              const reg = form.getFieldValue('lang-reg');
              setLangRegRules([...langRegRules, { label, key, reg }]);
            }}
          >
            增加
          </Button>
          {langRegRules?.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {langRegRules.map((r, i) => {
                return (
                  <BTTag
                    key={i}
                    style={{ margin: '0 8px 8px 0' }}
                    title={`${r.label} ${r.key}`}
                    content={`${r.reg}`}
                    onDelete={() => {
                      setLangRegRules(langRegRules.filter((_, ri) => ri !== i));
                    }}
                  />
                );
              })}
            </div>
          )}
        </Form.Item>
      </>
    );
  }

  function productDisplay() {
    return (
      <>
        <Title level={3}>产品展示</Title>
        <Form.Item
          name="product-display-display"
          label="展示"
          valuePropName="checked"
        >
          <Switch
            onChange={v => {
              form.setFieldsValue({ 'product-display-display': v });
            }}
          />
        </Form.Item>
        <Form.Item name="product-display-kind" label="类型">
          <Select
            onChange={v => {
              form.setFieldsValue({ 'product-display-kind': v });
            }}
          >
            <Select.Option key="image" value="image">
              图片
            </Select.Option>
            <Select.Option key="audio" value="audio">
              音频
            </Select.Option>
            <Select.Option key="video" value="video">
              视频
            </Select.Option>
          </Select>
        </Form.Item>
        <div style={{ border: '1px solid red' }}>
          {productDisplayItems
            ?.filter(i => !!i)
            ?.map(({ url, name }, idx) => {
              return (
                <Row key={idx}>
                  <Col push={3}>
                    <Text type="success">url:{url},</Text>
                    <Text type="success">name:{name}</Text>
                    <DeleteOutlined
                      onClick={() => {
                        setProductDisplayItems((urls = []) => {
                          return urls?.filter((_, i) => i !== idx);
                        });
                      }}
                    />
                  </Col>
                </Row>
              );
            })}
          <Form.Item name="product-display-url" label="链接">
            <Input />
          </Form.Item>
          <Form.Item name="product-display-name" label="展示名">
            <Input />
          </Form.Item>
          <Row>
            <Col push={3}>
              <Button
                onClick={() => {
                  const currentInputUrl = form.getFieldValue(
                    'product-display-url',
                  );
                  const currentInputName = form.getFieldValue(
                    'product-display-name',
                  );

                  if (!currentInputUrl) {
                    Modal.error({ content: '链接不得为空' });
                    return;
                  }

                  setProductDisplayItems((items = []) => {
                    return [
                      ...items,
                      { url: currentInputUrl, name: currentInputName },
                    ];
                  });
                  form.setFieldsValue({
                    'product-display-url': '',
                    'product-display-name': '',
                  });
                }}
              >
                增加
              </Button>
            </Col>
          </Row>
        </div>
      </>
    );
  }

  function usageScenarios() {
    return (
      <>
        <Title level={3}>使用场景</Title>
        <Form.Item
          name="usage-scenarios-display"
          label="展示"
          valuePropName="checked"
        >
          <Switch
            defaultChecked={form.getFieldValue('usage-scenarios-display')}
            onChange={v => {
              form.setFieldsValue({ 'usage-scenarios-display': v });
            }}
          />
        </Form.Item>
        <Form.Item name="usage-scenarios-name-cn" label="中文Title">
          <Input />
        </Form.Item>
        <Form.Item name="usage-scenarios-name-en" label="英文Title">
          <Input />
        </Form.Item>
        {usageScenariosImgUrls
          ?.filter(i => !!i)
          ?.map(({ url, name }, idx) => {
            return (
              <div key={idx} style={{ textAlign: 'center' }}>
                <Text type="success">url:{url},</Text>
                <Text type="success">name:{name}</Text>
                <DeleteOutlined
                  onClick={() => {
                    setUsageScenariosImgUrls((urls = []) => {
                      return urls?.filter((_, i) => i !== idx);
                    });
                  }}
                />
              </div>
            );
          })}
        <div style={{ border: '1px solid red' }}>
          <Form.Item name="usage-scenarios-img-url" label="展示图片链接">
            <Input />
          </Form.Item>
          <Form.Item name="usage-scenarios-img-name" label="展示图片名">
            <Input />
          </Form.Item>
          <Button
            onClick={() => {
              const currentInputUrl = form.getFieldValue(
                'usage-scenarios-img-url',
              );

              const currentInputName = form.getFieldValue(
                'usage-scenarios-img-name',
              );

              if (!currentInputUrl || !currentInputName) {
                Modal.error({ content: '链接或名称不得为空' });
                return;
              }

              setUsageScenariosImgUrls((urls = []) => {
                return [
                  ...urls,
                  { name: currentInputName, url: currentInputUrl },
                ];
              });

              form.setFieldsValue({
                'usage-scenarios-img-url': '',
                'usage-scenarios-img-name': '',
              });
            }}
          >
            增加
          </Button>
        </div>
      </>
    );
  }
};

Index.getInitialProps = () => {};

export default Index;
