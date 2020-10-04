import { Select, Upload } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import React, { CSSProperties } from 'react';
import { DynamicRec } from '../common/DynamicRec';
import { Colors, Styles } from '../common/Styles';
import MTitle from '../parts/MTitle';

const Option = Select.Option;

// 彝语	iii	采样率：16000hz 采样点大小：16bits	audio/L16;rate=16000
// 哈语	kaz	采样率：16000hz 采样点大小：16bits	audio/L16;rate=16000
// 蒙语	mon	采样率：16000hz 采样点大小：16bits	audio/L16;rate=16000
// 藏语（安多）	tib_ad	采样率：16000hz 采样点大小：16bits	audio/L16;rate=16000
// 藏语（康巴）	tib_kb	采样率：16000hz 采样点大小：16bits	audio/L16;rate=16000
// 藏语（卫藏）	tib_wz	采样率：16000hz 采样点大小：16bits	audio/L16;rate=16000
// 维语	uig	采样率：16000hz 采样点大小：16bits	audio/L16;rate=16000

const opts = [
  { key: 'iii', label: '彝语' },
  { key: 'kaz', label: '哈语' },
  { key: 'mon', label: '蒙语' },
  { key: 'tib_ad', label: '藏语（安多）' },
  { key: 'tib_kb', label: '藏语（康巴）' },
  { key: 'tib_wz', label: '藏语（卫藏）' },
  { key: 'uig', label: '维语' },
];

interface Props {
  style?: CSSProperties;
}

const AudioTranslator = (props: Props) => {
  const [rec, setRec] = React.useState<any>();
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const [lan, setLan] = React.useState(opts[0].key);
  const [audioSrc, setAudioSrc] = React.useState<string>();
  const [audioBlob, setAudioBlob] = React.useState<Blob>();
  const [recording, setRecording] = React.useState<boolean>(false);

  return (
    <div style={props.style}>
      <DynamicRec recRef={rec => setRec(rec)} />
      <MTitle label={{ cn: '产品体验', en: 'Product Experience' }} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          ...Styles.shadowCard,
          marginTop: 52,
        }}
      >
        <div
          style={{
            flexWrap: 'wrap',
            display: 'flex',
            alignItems: 'flex-start',
          }}
        >
          <Select
            size="large"
            style={{ width: 300, marginTop: 8, marginRight: 40 }}
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
              fontSize: 16,
              color: '#FFF',
              backgroundColor: Colors.btColor,
              cursor: 'pointer',
              borderRadius: 25,
              padding: '8px 50px',
              marginTop: 8,
              marginRight: 20,
            }}
            onClick={handleRecord}
          >
            {!recording ? '录音识别' : '停止录音'}
          </div>
          {audioSrc ? (
            <div
              style={{
                fontSize: 16,
                color: '#FFF',
                backgroundColor: Colors.btColor,
                cursor: 'pointer',
                borderRadius: 25,
                padding: '8px 50px',
                marginTop: 8,
                marginRight: 20,
              }}
              onClick={() => {
                alert('上传刚录的音频');
              }}
            >
              上传音频
            </div>
          ) : (
            <Upload
              accept=".mp3,.wav"
              action=""
              fileList={fileList}
              showUploadList={{ showRemoveIcon: false }}
              onChange={info => {
                setFileList([info.file]);
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  color: '#FFF',
                  backgroundColor: Colors.btColor,
                  cursor: 'pointer',
                  borderRadius: 25,
                  padding: '8px 50px',
                  marginTop: 8,
                  marginRight: 20,
                }}
              >
                上传音频
              </div>
            </Upload>
          )}
          <div
            style={{
              fontSize: 16,
              color: '#333',
              backgroundColor: '#FFF',
              cursor: 'pointer',
              borderRadius: 25,
              padding: '8px 50px',
              border: '1px solid #BBB',
              marginTop: 8,
              marginRight: 20,
            }}
            onClick={() => {
              rec?.stop();
              setAudioBlob(undefined);
              setAudioSrc(undefined);
            }}
          >
            清除
          </div>
        </div>
        {audioSrc && (
          <audio
            controls
            style={{ marginTop: 10, outline: 'none' }}
            src={audioSrc}
          />
        )}
        <div
          style={{
            height: 160,
            overflow: 'auto',
            padding: 10,
            color: '#888',
            border: '1px solid #BBB',
            marginTop: 30,
          }}
        >
          上传的音频格式仅支持（MP3、wav）
        </div>
      </div>
    </div>
  );

  function handleRecord() {
    if (!recording) {
      rec?.open(() => {
        rec?.start();
        setRecording(true);
      });
    } else {
      rec?.stop(blob => {
        setAudioBlob(blob);
        setAudioSrc((window.URL || webkitURL).createObjectURL(blob));
        setRecording(false);
      });
    }
  }
};

export default AudioTranslator;
