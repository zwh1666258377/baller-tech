import * as React from 'react';

import { Upload, Modal, Spin, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';

const { Paragraph } = Typography;

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
  const [fileList, setFileList] = React.useState<UploadFile<any>[]>([]);
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

  const handleChange = ({ fileList }) => setFileList(fileList);

  React.useEffect(() => {
    reload();
  }, []);

  const reload = () => {
    setLoading(true);
    fetch('/api/img/list', { method: 'GET' })
      .then(r => r.json())
      .then(r => {
        setFileList(
          r?.map(item => ({
            uid: item?._id,
            name: item?.originalname,
            status: 'done',
            url: `/api/get/file?id=${item?._id}`,
          })),
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRemove = (file: UploadFile<any>) => {
    setLoading(true);
    fetch('/api/remove/img', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: file.uid }),
    }).finally(() => setLoading(false));
  };

  return (
    <Spin spinning={loading}>
      <Upload
        action="/api/upload/img"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
        iconRender={() => {
          return <div>111</div>;
        }}
        name="img"
      >
        {fileList.length >= 8 ? null : uploadButton}
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
    </Spin>
  );
};
