import { callTimesLimit } from '@/lib/call-times-limit';
import { errorTip } from '@/lib/error-tip';
import { Select, Spin, Modal } from 'antd';
import React, { CSSProperties } from 'react';
import { Website } from '../common/Defs';
import { Colors, h5Styles, Styles } from '../common/Styles';
import MTitle from '../parts/MTitle';
import TextEditor from './TextEditor';

const Option = Select.Option;

const { checkCallTimesLimit, setCallTimesLimit } = callTimesLimit('text');

interface Props {
  data: Website;
  style?: CSSProperties;
  h5?: boolean;
  rules: Array<{
    from: {
      key: string;
      label: string;
    };
    to: {
      key: string;
      label: string;
    };
  }>;
}

const TextTranslator = (props: Props) => {
  const opts: { key: string; label: string }[] = [];
  const allowKeys: string[] = [];
  props.rules?.forEach(r => {
    if (!opts.find(o => o.key === r.from.key)) {
      opts.push(r.from);
    }
    if (!opts.find(o => o.key === r.to.key)) {
      opts.push(r.to);
    }
    const key = `${r.from.key}-${r.to.key}`;
    if (!allowKeys.includes(key)) {
      allowKeys.push(key);
    }
  });
  const [inputVal, setInputVal] = React.useState<string>();
  const [outputVal, setOutputVal] = React.useState<string>();
  const [fromVal, setFromVal] = React.useState<string>();
  const [toVal, setToVal] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [clearSignal, setClearSignal] = React.useState(0);
  const uploadKey = React.useMemo(() => `${fromVal}-${toVal}`, [
    fromVal,
    toVal,
  ]);

  if (props?.h5) {
    return (
      <Spin spinning={loading}>
        <div style={props.style}>
          <MTitle
            style={{ marginBottom: '10px' }}
            label={{ cn: '产品体验', en: 'Product Experience' }}
          />
          <div style={{ ...h5Styles.shadowCard, marginTop: 30 }}>
            <div
              style={{
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Select
                size="large"
                style={{ width: 200 }}
                value={fromVal}
                placeholder="请选择语种"
                onSelect={val => {
                  setFromVal(val);
                }}
              >
                {opts.map(o => (
                  <Option key={o.key} value={o.key}>
                    {o.label}
                  </Option>
                ))}
              </Select>
              <Select
                size="large"
                style={{ width: 200, marginLeft: 34 }}
                value={toVal}
                placeholder="请选择语种"
                onSelect={val => {
                  setToVal(val);
                }}
              >
                {opts.map(o => (
                  <Option key={o.key} value={o.key}>
                    {o.label}
                  </Option>
                ))}
              </Select>
            </div>
            <div
              style={{
                marginTop: 24,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <TextEditor
                style={{ height: 168 }}
                contentEditable={true}
                lang={fromVal}
                onChangeText={setInputVal}
                clearSignal={clearSignal}
              ></TextEditor>
              <TextEditor style={{ height: 168, marginTop: 16 }} lang={toVal}>
                {outputVal || (
                  <span style={{ color: '#878787' }}>翻译结果</span>
                )}
              </TextEditor>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: '20px',
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    color: '#FFF',
                    backgroundColor: Colors.btColor,
                    cursor: 'pointer',
                    borderRadius: 25,
                    textAlign: 'center',
                    padding: '8px 0',
                    width: '48%',
                  }}
                  onClick={onClickTranslate}
                >
                  翻译
                </div>
                <div
                  style={{
                    fontSize: 16,
                    color: '#333',
                    backgroundColor: '#FFF',
                    cursor: 'pointer',
                    padding: '8px 0',
                    borderRadius: 25,
                    width: '48%',
                    textAlign: 'center',
                    border: '1px solid #BBB',
                  }}
                  onClick={clear}
                >
                  清除
                </div>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    );
  }

  return (
    <Spin spinning={loading}>
      <div style={props.style}>
        <MTitle label={{ cn: '产品体验', en: 'Product Experience' }} />
        <div style={{ ...Styles.shadowCard, marginTop: 52 }}>
          <div
            style={{
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Select
              size="large"
              style={{ width: 200 }}
              value={fromVal}
              placeholder="请选择语种"
              onSelect={val => {
                setFromVal(val);
              }}
            >
              {opts.map(o => (
                <Option key={o.key} value={o.key}>
                  {o.label}
                </Option>
              ))}
            </Select>
            <Select
              size="large"
              style={{ width: 200, marginLeft: 34 }}
              value={toVal}
              placeholder="请选择语种"
              onSelect={val => {
                setToVal(val);
              }}
            >
              {opts.map(o => (
                <Option key={o.key} value={o.key}>
                  {o.label}
                </Option>
              ))}
            </Select>
            <div style={{ display: 'flex', marginLeft: 48 }}>
              <div
                style={{
                  fontSize: 16,
                  color: '#FFF',
                  backgroundColor: Colors.btColor,
                  cursor: 'pointer',
                  borderRadius: 25,
                  padding: '8px 50px',
                }}
                onClick={onClickTranslate}
              >
                翻译
              </div>
              <div
                style={{
                  marginLeft: 30,
                  fontSize: 16,
                  color: '#333',
                  backgroundColor: '#FFF',
                  cursor: 'pointer',
                  borderRadius: 25,
                  padding: '8px 50px',
                  border: '1px solid #BBB',
                }}
                onClick={clear}
              >
                清除
              </div>
            </div>
          </div>
          <div style={{ marginTop: 48, display: 'flex' }}>
            <TextEditor
              style={{ height: 168, marginRight: 10 }}
              contentEditable={true}
              lang={fromVal}
              onChangeText={setInputVal}
              clearSignal={clearSignal}
            ></TextEditor>
            <TextEditor style={{ height: 168, marginLeft: 10 }} lang={toVal}>
              {outputVal || <span style={{ color: '#878787' }}>翻译结果</span>}
            </TextEditor>
          </div>
        </div>
      </div>
    </Spin>
  );

  function onClickTranslate() {
    if (!checkCallTimesLimit(10)) {
      Modal.info({
        title: props?.data?.callTimesLimitTip,
      });
      return;
    }
    if (!fromVal && !toVal) {
      Modal.warn({ content: '请选择要翻译的语种' });
      return;
    }
    if (fromVal === toVal) {
      Modal.warn({ content: '请选择不同语种' });
      return;
    }
    if (!inputVal) {
      Modal.warn({ content: '翻译内容不得为空' });
      return;
    }
    if (!allowKeys.includes(uploadKey)) {
      const from = opts.find(o => o.key === fromVal);
      const to = opts.find(o => o.key === toVal);
      Modal.info({
        content: `暂时不支持${from?.label}翻译为${to?.label}`,
      });
      return;
    }
    fetchTranslation()
      .then(v => setOutputVal(v))
      .finally(() => {
        const times = setCallTimesLimit();
        if (!!times && times % 2 === 0) {
          props?.data?.callTimesLimitTip &&
            Modal.info({
              title: props?.data?.callTimesLimitTip,
            });
        }
      });
  }

  function clear() {
    setInputVal('');
    setOutputVal('');
    setClearSignal(clearSignal + 1);
  }

  async function fetchTranslation() {
    setLoading(true);
    const data = await fetch('/api/jqfy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language: uploadKey,
        str: inputVal,
      }),
    })
      .then(r => r.json())
      .then(errorTip)
      .finally(() => setLoading(false));

    if (data?.status === 'error') {
      Modal.error(data?.msg);
      return '';
    }

    return data?.data?.data;
  }
};

export default TextTranslator;
