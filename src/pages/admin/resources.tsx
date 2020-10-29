import * as React from 'react';

import { Upload, Modal, Spin, Typography, Button } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';
import fetch from 'node-fetch';

const { Paragraph, Title, Text } = Typography;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default () => {
  const [previewVisible, setPreviewVisible] = React.useState<boolean>(false);
  const [previewImage, setPreviewImage] = React.useState<string | undefined>();
  const [previewTitle, setPreviewTitle] = React.useState<string | undefined>();
  const [imgList, setImgList] = React.useState<UploadFile<any>[]>([]);
  const [mp3List, setMp3List] = React.useState<UploadFile<any>[]>([]);
  const [mp4List, setMp4List] = React.useState<UploadFile<any>[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const handleCancel = () => setPreviewVisible(false);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    );
  };

  React.useEffect(() => {
    reload();
  }, []);

  const reload = () => {
    setLoading(true);
    return Promise.all([
      fetch('/api/img/list', { method: 'GET' })
        .then(r => r.json())
        .then(r => {
          setImgList(
            r?.map(item => ({
              uid: item?._id,
              name: item?.originalname,
              status: 'done',
              url: `/api/get/file?id=${item?._id}`,
            })),
          );
        }),
      fetch('/api/mp3/list', { method: 'GET' })
        .then(r => r.json())
        .then(r => {
          setMp3List(
            r?.map(item => ({
              uid: item?._id,
              name: item?.originalname,
              status: 'done',
              url: `/api/get/file?id=${item?._id}`,
            })),
          );
        }),
      fetch('/api/mp4/list', { method: 'GET' })
        .then(r => r.json())
        .then(r => {
          setMp4List(
            r?.map(item => ({
              uid: item?._id,
              name: item?.originalname,
              status: 'done',
              url: `/api/get/file?id=${item?._id}`,
            })),
          );
        }),
    ]).finally(() => {
      setLoading(false);
    });
  };

  const removeImg = (file: UploadFile<any>) => {
    setLoading(true);
    fetch('/api/remove/img', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: file.uid }),
    }).finally(() => {
      setLoading(false);
      reload();
    });
  };

  const removeMp3 = (file: UploadFile<any>) => {
    setLoading(true);
    fetch('/api/remove/mp3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: file.uid }),
    }).finally(() => {
      setLoading(false);
      reload();
    });
  };

  const removeMp4 = (file: UploadFile<any>) => {
    setLoading(true);
    fetch('/api/remove/mp4', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: file.uid }),
    }).finally(() => {
      setLoading(false);
      reload();
    });
  };

  return (
    <Spin spinning={loading}>
      <div style={{ marginBottom: 20 }}>
        <Title level={3}>图片</Title>
        <Upload
          action="/api/upload/img"
          listType="picture-card"
          fileList={imgList}
          beforeUpload={f => {
            return f?.type?.startsWith('image/');
          }}
          onPreview={handlePreview}
          onChange={({ event }) => {
            if (event?.percent == 100) {
              reload();
            }
          }}
          onRemove={removeImg}
          iconRender={() => {
            return <div>111</div>;
          }}
          name="img"
        >
          {uploadButton}
          {/* {imgList.length >= 8 ? null : uploadButton} */}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
          <Paragraph type="warning" copyable={{ text: previewImage }}>
            点击右侧复制：{previewImage}
          </Paragraph>
        </Modal>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Title level={3}>音频</Title>
        <Upload
          action="/api/upload/mp3"
          fileList={[]}
          beforeUpload={f => {
            return f?.type?.startsWith('audio/');
          }}
          onChange={({ event }) => {
            if (event?.percent == 100) {
              reload();
            }
          }}
          name="mp3"
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
        {mp3List?.map((item, idx) => {
          const { name, url } = item;
          return (
            <div key={idx}>
              <Text>{name}</Text>
              <Text copyable={{ text: url }} />
              <Text type="danger">
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => removeMp3(item)}
                >
                  （删除）
                </span>
              </Text>
            </div>
          );
        })}
      </div>
      <div style={{ marginBottom: 20 }}>
        <Title level={3}>视频</Title>
        <Upload
          action="/api/upload/mp4"
          fileList={[]}
          beforeUpload={f => {
            return f?.type?.startsWith('video/');
          }}
          onChange={({ fileList, event }) => {
            if (event?.percent == 100) {
              reload();
            }
          }}
          onRemove={removeMp4}
          name="mp4"
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
        {mp4List?.map((item, idx) => {
          const { name, url } = item;
          return (
            <div key={idx}>
              <Text>{name}</Text>
              <Text copyable={{ text: url }} />
              <Text type="danger">
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => removeMp4(item)}
                >
                  （删除）
                </span>
              </Text>
            </div>
          );
        })}
      </div>
    </Spin>
  );
};
