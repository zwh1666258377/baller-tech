import React, { CSSProperties } from 'react';
import AudioDisplay from './AudioDisplay';
import ImageDisplay from './ImageDisplay';
import VideoDisplay from './VideoDisplay';

interface Props {
  style?: CSSProperties;
  kind: string;
  items: { url: string; name: string }[];
}
const ProductDisplay = (props: Props) => {
  if (!props.items || props.items.length === 0) {
    return null;
  }
  const label = { cn: '产品展示', en: 'Product display' };
  switch (props.kind) {
    case 'image':
      return (
        <ImageDisplay style={props.style} label={label} items={props.items} />
      );
    case 'audio':
      return (
        <AudioDisplay style={props.style} label={label} items={props.items} />
      );
    case 'video':
      return (
        <VideoDisplay style={props.style} label={label} items={props.items} />
      );
    default:
      return null;
  }
};

export default ProductDisplay;
