import { callTimesLimit } from '@/lib/call-times-limit';
import { errorTip } from '@/lib/error-tip';
import { Select, Spin, Modal } from 'antd';
import React, { CSSProperties } from 'react';
import { Website } from '../common/Defs';
import { Colors, h5Styles, Styles } from '../common/Styles';
import MTitle from '../parts/MTitle';
import TextEditor from './TextEditor';

type Result = { status: 'ok' } | { status: 'error'; msg: string };
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
  langRules: Array<{
    label: string;
    key: string;
    reg: string;
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
  const [inputVal, setInputVal] = React.useState<string>('');
  const [outputVal, setOutputVal] = React.useState<string>('');
  const [fromVal, setFromVal] = React.useState<string>();
  const [toVal, setToVal] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [clearSignal, setClearSignal] = React.useState(0);
  const uploadKey = React.useMemo(() => `${fromVal}-${toVal}`, [
    fromVal,
    toVal,
  ]);
  const inputLimit = 200;

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
                  setInputVal('');
                  setClearSignal(clearSignal + 1);
                }}
              >
                {opts?.map(o => (
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
                  setOutputVal('');
                }}
              >
                {opts?.map(o => (
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
                maxLength={inputLimit}
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
              justifyContent: 'space-between',
              maxWidth: '800px',
            }}
          >
            <Select
              size="large"
              style={{ width: 200 }}
              value={fromVal}
              placeholder="请选择语种"
              onSelect={val => {
                setFromVal(val);
                setInputVal('');
                setClearSignal(clearSignal + 1);
              }}
            >
              {opts?.map(o => (
                <Option key={o.key} value={o.key}>
                  {o.label}
                </Option>
              ))}
            </Select>
            <Select
              size="large"
              style={{ width: 200 }}
              value={toVal}
              placeholder="请选择语种"
              onSelect={val => {
                setToVal(val);
                setOutputVal('');
              }}
            >
              {opts?.map(o => (
                <Option key={o.key} value={o.key}>
                  {o.label}
                </Option>
              ))}
            </Select>
            <div style={{ display: 'flex' }}>
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
              style={{ height: 168, marginRight: 10, width: '50%' }}
              contentEditable={true}
              lang={fromVal}
              onChangeText={setInputVal}
              clearSignal={clearSignal}
              maxLength={inputLimit}
            ></TextEditor>
            <TextEditor
              style={{ height: 168, marginLeft: 10, width: '50%' }}
              lang={toVal}
            >
              {outputVal || <span style={{ color: '#878787' }}>翻译结果</span>}
            </TextEditor>
          </div>
        </div>
      </div>
    </Spin>
  );

  function onClickTranslate() {
    if (!checkCallTimesLimit(10)) {
      Modal.warn({
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
    const res = validateInput(fromVal, inputVal);
    if (res.status === 'error') {
      Modal.warn({ content: res.msg });
      return;
    }
    if (inputVal.length > inputLimit) {
      Modal.error({ content: '不得超过输入限制' });
      return;
    }
    if (!allowKeys.includes(uploadKey)) {
      const from = opts.find(o => o.key === fromVal);
      const to = opts.find(o => o.key === toVal);
      Modal.warn({
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
            Modal.warn({
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

    return data?.data;
  }

  function validateInput(key = '', val = ''): Result {
    const langRules = props.langRules || [];
    const rule = langRules.find(r => r.key === key);
    if (!rule) {
      return { status: 'ok' };
    }
    const regexp = new RegExp(rule.reg, 'u');
    const ok = regexp.test(val);
    if (ok) {
      return { status: 'ok' };
    } else {
      return { status: 'error', msg: `请输入${rule.label}` };
    }
  }
};

export default TextTranslator;
