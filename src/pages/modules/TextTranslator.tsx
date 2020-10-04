import { Input, Select } from 'antd';
import React, { CSSProperties } from 'react';
import { Colors, h5Styles, Styles } from '../common/Styles';
import MTitle from '../parts/MTitle';

const Option = Select.Option;

const rules = [
  {
    from: {
      key: 'han',
      label: '汉',
    },
    to: {
      key: 'zang',
      label: '藏',
    },
  },
  {
    from: {
      key: 'han',
      label: '汉',
    },
    to: {
      key: 'wei',
      label: '维',
    },
  },
  {
    from: {
      key: 'han',
      label: '汉',
    },
    to: {
      key: 'han2',
      label: '韩',
    },
  },
  {
    from: {
      key: 'han',
      label: '汉',
    },
    to: {
      key: 'han2',
      label: '韩',
    },
  },
  {
    from: {
      key: 'han2',
      label: '韩',
    },
    to: {
      key: 'han',
      label: '汉',
    },
  },
];

const opts: { key: string; label: string }[] = [];
const allowKeys: string[] = [];
rules.forEach(r => {
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

interface Props {
  style?: CSSProperties;
  h5?: boolean;
}

const TextTranslator = (props: Props) => {
  const [inputVal, setInputVal] = React.useState<string>();
  const [outputVal, setOutputVal] = React.useState<string>();
  const [fromVal, setFromVal] = React.useState<string>(rules[0].from.key);
  const [toVal, setToVal] = React.useState<string>(rules[0].to.key);
  const uploadKey = React.useMemo(() => `${fromVal}-${toVal}`, [
    fromVal,
    toVal,
  ]);

  if (props?.h5) {
    return (
      <div style={props.style}>
        <MTitle
          style={{ marginBottom: '20px' }}
          label={{ cn: '产品体验', en: 'Product Experience' }}
        />
        <div style={{ marginTop: 52 }}>
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
            {/* <div style={{ display: 'flex', marginLeft: 48 }}>
              <div
                style={{
                  fontSize: 16,
                  color: '#FFF',
                  backgroundColor: Colors.btColor,
                  cursor: 'pointer',
                  borderRadius: 25,
                  padding: '8px 50px',
                }}
                onClick={() => {
                  if (!allowKeys.includes(uploadKey)) {
                    alert('暂时不支持' + uploadKey);
                    return;
                  }
                  fetchTranslation().then(v => setOutputVal(v));
                }}
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
                onClick={() => {
                  setInputVal('');
                  setOutputVal('');
                }}
              >
                清除
              </div>
            </div> */}
          </div>
          {/* <div style={{ marginTop: 48, display: 'flex' }}>
            <div
              style={{
                marginRight: 10,
                flex: 1,
                height: 168,
                border: '1px solid #BBB',
              }}
            >
              <textarea
                style={{
                  fontSize: 16,
                  padding: 8,
                  width: '100%',
                  height: '100%',
                  resize: 'none',
                  border: 'none',
                }}
                placeholder="输入要翻译的文字"
                value={inputVal}
                onChange={t => {
                  setInputVal(t.target.value);
                }}
              />
            </div>
            <div
              style={{
                fontSize: 16,
                padding: 8,
                marginLeft: 10,
                flex: 1,
                height: 168,
                border: '1px solid #BBB',
              }}
            >
              {outputVal || <span style={{ color: '#878787' }}>翻译结果</span>}
            </div>
          </div> */}
        </div>
      </div>
    );
  }

  return (
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
              onClick={() => {
                if (!allowKeys.includes(uploadKey)) {
                  alert('暂时不支持' + uploadKey);
                  return;
                }
                fetchTranslation().then(v => setOutputVal(v));
              }}
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
              onClick={() => {
                setInputVal('');
                setOutputVal('');
              }}
            >
              清除
            </div>
          </div>
        </div>
        <div style={{ marginTop: 48, display: 'flex' }}>
          <div
            style={{
              marginRight: 10,
              flex: 1,
              height: 168,
              border: '1px solid #BBB',
            }}
          >
            <textarea
              style={{
                fontSize: 16,
                padding: 8,
                width: '100%',
                height: '100%',
                resize: 'none',
                border: 'none',
              }}
              placeholder="输入要翻译的文字"
              value={inputVal}
              onChange={t => {
                setInputVal(t.target.value);
              }}
            />
          </div>
          <div
            style={{
              fontSize: 16,
              padding: 8,
              marginLeft: 10,
              flex: 1,
              height: 168,
              border: '1px solid #BBB',
            }}
          >
            {outputVal || <span style={{ color: '#878787' }}>翻译结果</span>}
          </div>
        </div>
      </div>
    </div>
  );

  async function fetchTranslation() {
    return '我是翻译出来的文字';
  }
};

export default TextTranslator;
