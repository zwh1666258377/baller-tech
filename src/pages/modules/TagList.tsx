import { Collapse } from 'antd';
import React from 'react';
import { BTTag } from '../parts/BTTag';

const Panel = Collapse.Panel;

interface Props {
  items: {
    title: string;
    content: React.ReactNode;
  }[];
  onDelete: (idx: number) => void;
}

export const TagList = (props: Props) => {
  const items = props.items?.filter(item => item.title || item.content);
  return (
    <Collapse defaultActiveKey={[]}>
      <Panel header="查看全部" key="details">
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {items?.map((item, i) => {
            return (
              <BTTag
                key={i}
                style={{ margin: '0 8px 8px 0' }}
                title={item.title}
                content={item.content}
                onDelete={() => props.onDelete(i)}
              />
            );
          })}
        </div>
      </Panel>
    </Collapse>
  );
};
