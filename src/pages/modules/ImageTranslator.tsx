import { Select, Upload } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import React, { CSSProperties } from 'react';
import { Colors, Styles } from '../common/Styles';
import MTitle from '../parts/MTitle';

const Option = Select.Option;

const opts = [
  { key: 'chs', label: '简体中文' },
  { key: 'cht', label: '繁体中文' },
  { key: 'tib', label: '藏文' },
  { key: 'mon', label: '蒙文(传统)' },
  { key: 'mon_o', label: '蒙文(西里尔)' },
  { key: 'uig', label: '维文' },
  { key: 'iii', label: '彝文' },
  { key: 'zha', label: '壮文' },
  { key: 'kor', label: '韩文' },
  { key: 'kaz', label: '哈萨克文' },
];

interface Props {
  style?: CSSProperties;
  h5?: boolean;
}

const ImageTranslator = (props: Props) => {
  const [lan, setLan] = React.useState(opts[0].key);
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const [preview, setPreview] = React.useState<string>();
  const [output, setOutput] = React.useState<string>();

  if (props?.h5) {
    return (
      <div style={props.style}>
        <MTitle
          style={{ marginBottom: '20px' }}
          label={{ cn: '产品体验', en: 'Product Experience' }}
        />
        <div style={{ ...Styles.shadowCard, padding: '23px 25px' }}>
          <Select
            size="large"
            style={{ width: '100%' }}
            value={lan}
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
          {/* <div
            style={{
              marginTop: 15,
              overflow: 'auto',
              color: '#888',
              border: '1px solid #BBB',
              height: 150,
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
          )} */}
          {/* <div
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
              onChange={info => {
                const file = info.file;
                if (file.originFileObj) {
                  setFileList([file]);
                  getBase64(file.originFileObj).then(data => setPreview(data));
                }
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  height: 40,
                  width: 130,
                  borderRadius: 20,
                  backgroundColor: Colors.btColor,
                  color: '#FFF',
                  marginRight: 15,
                }}
              >
                上传图像
              </div>
            </Upload>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                height: 40,
                width: 130,
                borderRadius: 20,
                backgroundColor: '#FFF',
                color: '#333',
                border: '1px solid #BBB',
                marginLeft: 15,
              }}
              onClick={() => {
                setFileList([]);
                setPreview(undefined);
              }}
            >
              清除
            </div>
          </div> */}
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
            onChange={info => {
              const file = info.file;
              if (file.originFileObj) {
                setFileList([file]);
                getBase64(file.originFileObj).then(data => setPreview(data));
              }
            }}
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
            onClick={() => {
              setFileList([]);
              setPreview(undefined);
            }}
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
            padding: 10,
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
