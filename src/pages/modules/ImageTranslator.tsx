import { Select, Upload } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import React, { CSSProperties, useRef } from 'react';
import { Colors, Styles } from '../common/Styles';
import MTitle from '../parts/MTitle';
import { useSize } from 'ahooks';

const Option = Select.Option;

interface Props {
  style?: CSSProperties;
  h5?: boolean;
  rules: Array<{ key: string; label: string }>;
}

const ImageTranslator = (props: Props) => {
  const opts = props.rules || [];
  const [lan, setLan] = React.useState<string>();
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const [preview, setPreview] = React.useState<string>();
  const [output, setOutput] = React.useState<string>();
  const btnContainer = useRef<any>();
  const { width } = useSize(btnContainer.current);

  if (props?.h5) {
    return (
      <div style={props.style} ref={btnContainer}>
        <MTitle
          style={{ marginBottom: '20px' }}
          label={{ cn: '产品体验', en: 'Product Experience' }}
        />
        <div style={{ ...Styles.shadowCard, padding: '23px 25px' }}>
          <Select
            size="large"
            style={{ width: '100%' }}
            value={lan}
            placeholder="请选择要识别的语言"
            onSelect={val => {
              setLan(val);
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
          {output && (
            <div
              style={{
                marginTop: 15,
                overflow: 'auto',
                color: '#888',
                padding: 10,
                border: '1px solid #BBB',
                height: 150,
              }}
            >
              {!output ? (
                '识别内容显示区'
              ) : (
                <div style={{ color: '#333' }}>{output}</div>
              )}
            </div>
          )}
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
      </div>
    );
  }

  return (
    <div style={props.style}>
      <MTitle label={{ cn: '产品体验', en: 'Product Experience' }} />
      <div style={{ display: 'flex', ...Styles.shadowCard, marginTop: 52 }}>
        <div style={{ width: 200, marginRight: 50 }}>
          <Select
            size="large"
            style={{ width: '100%' }}
            value={lan}
            placeholder="请选择要识别的语言"
            onSelect={val => {
              setLan(val);
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
            margin: '0px 20px',
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
        <div
          style={{
            maxHeight: 250,
            overflow: 'auto',
            flex: 1,
            color: '#888',
            border: '1px solid #BBB',
            margin: '0px 20px',
          }}
        >
          {!output ? (
            '识别内容显示区'
          ) : (
            <div style={{ color: '#333' }}>{output}</div>
          )}
        </div>
      </div>
    </div>
  );

  function selectLocalFile(info: UploadChangeParam<UploadFile<any>>) {
    const file = info.file;
    if (file.originFileObj) {
      setFileList([file]);
      getBase64(file.originFileObj).then(data => setPreview(data));
    }
  }

  function clear() {
    setFileList([]);
    setPreview(undefined);
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
