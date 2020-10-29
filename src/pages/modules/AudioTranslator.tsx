/// <reference path = "../../../types/index.d.ts" />
import { Modal, Select, Spin, Upload } from 'antd';
import { RcFile } from 'antd/lib/upload/interface';
import React, { CSSProperties, useRef } from 'react';
import { DynamicRec } from '../common/DynamicRec';
import { Colors, h5Styles, Styles } from '../common/Styles';
import { useSize } from 'ahooks';
import MTitle from '../parts/MTitle';
import { errorTip } from '../../lib/error-tip';
import TextEditor from './TextEditor';
import fetch from 'node-fetch';

const Option = Select.Option;

interface Props {
  style?: CSSProperties;
  h5?: boolean;
  rules: Array<{
    key: string;
    label: string;
  }>;
}

const AudioTranslator = (props: Props) => {
  const [rec, setRec] = React.useState<any>();
  const [lang, setLang] = React.useState<string>();
  const [audioSrc, setAudioSrc] = React.useState<string>();
  const [recording, setRecording] = React.useState<boolean>(false);
  const [result, setResult] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const btnContainer = useRef<any>();
  const { width } = useSize(btnContainer.current);
  const opts = props.rules || [];

  React.useEffect(() => {
    if (!!rec) {
      rec['onProcess'] = (
        buffers,
        powerLevel,
        bufferDuration,
        bufferSampleRate,
      ) => {
        // 音频转换数据，即发送到后端的数据
        var recordTransformData = Recorder.SampleData(
          buffers,
          bufferSampleRate,
          16000,
          {
            index: recordTransformData ? recordTransformData.index : 0,
            offset: recordTransformData ? recordTransformData.offset : 0.0,
          },
        );

        // 限制录音1分钟，若超出给出友好提示
        if (bufferDuration / 1000 >= 60) {
          Modal.info({
            content: '您已录制超过最大时长: 1分钟。马上为您分析数据~',
          });
          rec?.stop();
        }
      };
    }
  }, [rec]);

  if (props?.h5) {
    return (
      <div style={props.style}>
        <DynamicRec recRef={rec => setRec(rec)} />
        <MTitle label={{ cn: '产品体验', en: 'Product Experience' }} />
        <Spin spinning={loading}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              ...h5Styles.shadowCard,
              marginTop: 52,
            }}
          >
            <Select
              size="large"
              style={{ marginTop: 8, width: '100%' }}
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
            <TextEditor style={{ height: 160, marginTop: 30 }} lang={lang}>
              {result || (
                <span style={{ color: '#878787' }}>
                  上传的音频格式仅支持（MP3、wav）
                </span>
              )}
            </TextEditor>
            <div
              ref={r => (btnContainer.current = r)}
              style={{ marginTop: '28px' }}
            >
              {!!width && (
                <>
                  <div
                    style={{
                      fontSize: 16,
                      color: '#FFF',
                      backgroundColor: Colors.btColor,
                      cursor: 'pointer',
                      borderRadius: 25,
                      padding: '8px 0',
                      width: width / 2 - 10,
                      textAlign: 'center',
                      marginTop: 8,
                      marginRight: 20,
                      display: 'inline-block',
                    }}
                    onClick={handleRecord}
                  >
                    {!recording ? '录音识别' : '停止录音'}
                  </div>
                  <Upload
                    accept=".mp3,.wav"
                    action=""
                    fileList={[]}
                    showUploadList={{ showRemoveIcon: false }}
                    beforeUpload={onUploadChange}
                  >
                    <div
                      style={{
                        fontSize: 16,
                        color: '#FFF',
                        backgroundColor: Colors.btColor,
                        borderRadius: 25,
                        padding: '8px 0',
                        textAlign: 'center',
                        marginTop: 8,
                        width: width / 2 - 10,
                      }}
                    >
                      上传音频
                    </div>
                  </Upload>
                </>
              )}
            </div>

            <div
              style={{
                fontSize: 16,
                color: '#333',
                backgroundColor: '#FFF',
                cursor: 'pointer',
                borderRadius: 25,
                padding: '8px 50px',
                border: '1px solid #BBB',
                marginTop: 28,
                textAlign: 'center',
              }}
              onClick={clear}
            >
              清除
            </div>
          </div>
        </Spin>
      </div>
    );
  }

  return (
    <div style={props.style}>
      <DynamicRec recRef={rec => setRec(rec)} />
      <MTitle label={{ cn: '产品体验', en: 'Product Experience' }} />
      <Spin spinning={loading}>
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
              style={{ width: 200, marginTop: 8, marginRight: 40 }}
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
            <Upload
              accept=".mp3,.wav"
              action=""
              fileList={[]}
              showUploadList={{ showRemoveIcon: false }}
              beforeUpload={onUploadChange}
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
              onClick={clear}
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
          <TextEditor style={{ height: 160, marginTop: 30 }} lang={lang}>
            {result || (
              <span style={{ color: '#878787' }}>
                上传的音频格式仅支持（MP3、wav）
              </span>
            )}
          </TextEditor>
        </div>
      </Spin>
    </div>
  );

  function handleRecord() {
    if (!recording) {
      rec?.open(() => {
        rec?.start();
        setRecording(true);
      });
    } else {
      rec?.stop((blob: any) => {
        uploadRecord(blob);
        setRecording(false);
      });
    }
  }

  function onUploadChange(file: RcFile): boolean {
    uploadRecord(file);
    return false;
  }

  function uploadRecord(file: RcFile) {
    if (!lang) {
      Modal.warn({ content: '请选择要识别的语言' });
      return;
    }
    if (file.size > 1048576) {
      Modal.warn({ content: '文件大小不得超过1MB' });
      return;
    }
    setLoading(true);
    let formdata = new FormData();
    formdata.append('file', file);
    formdata.append('language', lang);
    fetch('/api/yysb', {
      method: 'POST',
      headers: {},
      body: formdata,
    })
      .then(r => r.json())
      .then(errorTip)
      .then(r => {
        if (!r?.data?.code && r?.status === 'ok') {
          setLoading(false);
          setResult(r.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function clear() {
    rec?.stop();
    setResult('');
    setAudioSrc(undefined);
  }
};

export default AudioTranslator;
