import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Tag } from 'antd';
import React, { CSSProperties } from 'react';

interface Props {
  style?: CSSProperties;
  title: string;
  content: React.ReactNode;
  onDelete?: () => void;
}
export const BTTag = (props: Props) => {
  return (
    <Tag
      style={props.style}
      onClick={() => {
        Modal.confirm({
          title: props.title,
          icon: <ExclamationCircleOutlined />,
          content: props.content,
          okText: '删除',
          okType: 'danger',
          cancelText: '取消',
          onOk: props.onDelete,
        });
      }}
    >
      <div style={{ display: 'inline-block', marginRight: 8 }}>
        {props.title}
      </div>
    </Tag>
  );
};
