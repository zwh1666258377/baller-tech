import { Modal, Select, Spin, Upload } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import React, { CSSProperties, useRef } from 'react';
import { Colors, Styles } from '../common/Styles';
import MTitle from '../parts/MTitle';
import { useSize } from 'ahooks';
import { errorTip } from '../../lib/error-tip';
import TextEditor from './TextEditor';

const Option = Select.Option;

interface Props {
  style?: CSSProperties;
  h5?: boolean;
  rules: Array<{ key: string; label: string }>;
}

const ImageTranslator = (props: Props) => {
  const opts = props.rules || [];
  const [lang, setLang] = React.useState<string>();
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const [preview, setPreview] = React.useState<string>();
  const [output, setOutput] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const btnContainer = useRef<any>();
  const { width } = useSize(btnContainer.current);

  if (props?.h5) {
    return (
      <div style={props.style} ref={btnContainer}>
        <MTitle
          style={{ marginBottom: '20px' }}
          label={{ cn: '产品体验', en: 'Product Experience' }}
        />
        <Spin spinning={loading}>
          <div style={{ ...Styles.shadowCard, padding: '23px 25px' }}>
            <Select
              size="large"
              style={{ width: '100%' }}
              value={lang}
              placeholder="请选择要识别的语言"
              onSelect={val => {
                setLang(val);
              }}
            >
              {opts.map(o => (
                <Option key={o.key} value={o.key}>
                  {o.label}
                </Option>
              ))}
            </Select>
            <div
              style={{
                marginTop: 15,
                overflow: 'auto',
                color: '#888',
                border: '1px solid #BBB',
                height: 150,
                padding: '8px',
                fontSize: '16px',
              }}
            >
              {!preview ? (
                '请上传图片格式为 jpg、jpeg、bmp、png、gif、tif、tiff 的图片'
              ) : (
                <img
                  src={preview}
                  style={{ width: '100%', objectFit: 'contain' }}
                />
              )}
            </div>
            <TextEditor style={{ height: 150, marginTop: 15 }} lang={lang}>
              {output.length > 0 ? (
                output.map((s, i) => <div key={i}>{s}</div>)
              ) : (
                <span style={{ color: '#878787' }}>识别内容显示区</span>
              )}
            </TextEditor>
            <div
              style={{
                marginTop: 30,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Upload
                accept=".jpg,.jpeg,.bmp,.png,.gif,.tif,.tiff"
                action=""
                fileList={fileList}
                showUploadList={false}
                onChange={selectLocalFile}
              >
                <div
                  style={{
                    display: 'inline-block',
                    cursor: 'pointer',
                    height: 40,
                    width: '130px',
                    textAlign: 'center',
                    borderRadius: 20,
                    lineHeight: '40px',
                    backgroundColor: Colors.btColor,
                    color: '#FFF',
                    marginRight: 20,
                    fontSize: '16px',
                  }}
                >
                  上传图像
                </div>
              </Upload>
              <div
                style={{
                  display: 'inline-block',
                  cursor: 'pointer',
                  height: 40,
                  width: '130px',
                  borderRadius: 20,
                  backgroundColor: '#FFF',
                  lineHeight: '40px',
                  textAlign: 'center',
                  color: '#333',
                  border: '1px solid #BBB',
                  fontSize: '16px',
                }}
                onClick={clear}
              >
                清除
              </div>
            </div>
          </div>
        </Spin>
      </div>
    );
  }

  return (
    <div style={props.style}>
      <MTitle label={{ cn: '产品体验', en: 'Product Experience' }} />
      <Spin spinning={loading}>
        <div style={{ display: 'flex', ...Styles.shadowCard, marginTop: 52 }}>
          <div style={{ width: 200, marginRight: 50 }}>
            <Select
              size="large"
              style={{ width: '100%' }}
              value={lang}
              placeholder="请选择要识别的语言"
              onSelect={val => {
                setLang(val);
              }}
            >
              {opts.map(o => (
                <Option key={o.key} value={o.key}>
                  {o.label}
                </Option>
              ))}
            </Select>
            <div
              style={{
                margin: '40px 0px',
                borderTop: '1px dashed rgba(187, 187, 187, 100)',
              }}
            />
            <Upload
              accept=".jpg,.jpeg,.bmp,.png,.gif,.tif,.tiff"
              action=""
              fileList={fileList}
              showUploadList={false}
              onChange={selectLocalFile}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  width: 200,
                  height: 40,
                  backgroundColor: Colors.btColor,
                  color: '#FFF',
                }}
              >
                上传图像
              </div>
            </Upload>
            <div
              style={{
                marginTop: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                width: '100%',
                height: 40,
                backgroundColor: '#FFF',
                color: '#333',
                border: '1px solid #BBB',
              }}
              onClick={clear}
            >
              清除
            </div>
          </div>
          <div
            style={{
              maxHeight: 250,
              overflow: 'auto',
              flex: 1,
              color: '#888',
              border: '1px solid #BBB',
              marginRight: 10,
              padding: '5px 8px',
            }}
          >
            {!preview ? (
              '请上传图片格式为 jpg、jpeg、bmp、png、gif、tif、tiff 的图片'
            ) : (
              <img
                src={preview}
                style={{ width: '100%', objectFit: 'contain' }}
              />
            )}
          </div>
          <TextEditor style={{ height: 250, marginLeft: 10 }} lang={lang}>
            {output.length > 0 ? (
              output.map((s, i) => <div key={i}>{s}</div>)
            ) : (
              <span style={{ color: '#878787' }}>识别内容显示区</span>
            )}
          </TextEditor>
        </div>
      </Spin>
    </div>
  );

  function selectLocalFile(info: UploadChangeParam<UploadFile<any>>) {
    if (info.event?.percent !== 100) {
      return;
    }
    const file = info.file;
    if (file.originFileObj) {
      setFileList([file]);
      getBase64(file.originFileObj).then(data => setPreview(data));
      uploadImage(file.originFileObj);
    }
  }

  function uploadImage(file: any) {
    if (!lang) {
      Modal.warn({ content: '请选择要识别的语言' });
      return;
    }
    setLoading(true);
    let formdata = new FormData();
    formdata.append('file', file);
    formdata.append('language', lang);
    fetch('/api/wzsb', {
      method: 'POST',
      headers: {},
      body: formdata,
    })
      .then(r => r.json())
      .then(errorTip)
      .then(r => {
        if (!r?.data?.code && r?.status === 'ok') {
          setLoading(false);
          setOutput(r.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function clear() {
    setFileList([]);
    setPreview(undefined);
    setLoading(false);
    setOutput([]);
  }

  function getBase64(file: Blob) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
};

export default ImageTranslator;
