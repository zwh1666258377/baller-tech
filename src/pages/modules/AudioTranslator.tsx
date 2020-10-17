/// <reference path = "../../../types/index.d.ts" />
import { message, Select, Spin, Upload } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import React, { CSSProperties, useRef } from 'react';
import { DynamicRec } from '../common/DynamicRec';
import { Colors, h5Styles, Styles } from '../common/Styles';
import { useSize } from 'ahooks';
import MTitle from '../parts/MTitle';
import { errorTip } from '../../lib/error-tip';

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
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const [lan, setLan] = React.useState<string>();
  const [audioSrc, setAudioSrc] = React.useState<string>();
  const [audioBlob, setAudioBlob] = React.useState<Blob>();
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
        console.log(recordTransformData.data);

        // 限制录音1分钟，若超出给出友好提示
        if (bufferDuration / 1000 >= 60) {
          message.error('您已录制超过最大时长: 1分钟。马上为您分析数据~');
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
              {result ? (
                <div style={{ color: '#333' }}>{result}</div>
              ) : (
                '上传的音频格式仅支持（MP3、wav）'
              )}
            </div>
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
                  {audioSrc ? (
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
                      onChange={onUploadChange}
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
                  )}
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
              style={{ width: 300, marginTop: 8, marginRight: 40 }}
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
                onChange={onUploadChange}
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
            {result ? (
              <div style={{ color: '#333' }}>{result}</div>
            ) : (
              '上传的音频格式仅支持（MP3、wav）'
            )}
          </div>
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
      rec?.stop(blob => {
        setAudioBlob(blob);
        setAudioSrc((window.URL || webkitURL).createObjectURL(blob));
        setRecording(false);
      });
    }
  }

  function onUploadChange(info: UploadChangeParam) {
    if (info.event?.percent == 100) {
      uploadRecord(info.file.originFileObj);
    }
  }

  function uploadRecord(file: any) {
    if (!lan) {
      message.warn('请选择要识别的语言');
      return;
    }
    setLoading(true);
    let formdata = new FormData();
    formdata.append('file', file);
    formdata.append('language', lan);
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
    setAudioBlob(undefined);
    setAudioSrc(undefined);
  }
};

export default AudioTranslator;
