import React, { CSSProperties } from 'react';
import { Colors } from '../common/Styles';
import MTitle from '../parts/MTitle';

interface Props {
  style?: CSSProperties;
  data: {
    imgUrl: string;
    content: string;
    title: { cn: string; en: string };
    button: { text: string; url: string };
  };
}

const ProductIntro = (props: Props) => {
  const data = props.data;
  return (
    <div style={props.style}>
      <MTitle label={data.title} />
      <div
        style={{
          marginTop: 52,
          display: 'flex',
          width: 'auto',
          maxHeight: 240,
        }}
      >
        <div>
          <img
            style={{
              borderRadius: 10,
              width: '',
              height: 'auto',
              maxHeight: 240,
            }}
            src={data.imgUrl}
            alt={data.title?.cn}
          />
        </div>
        <div
          style={{
            marginLeft: 40,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              color: '#333',
              fontSize: 18,
              textAlign: 'left',
              whiteSpace: 'pre-line',
              textOverflow: 'ellipsis',
              overflow: 'auto',
            }}
          >
            {data?.content}
          </div>
          <div>
            <div
              style={{
                fontSize: 18,
                color: '#FFF',
                backgroundColor: Colors.productLink,
                cursor: 'pointer',
                display: 'inline-block',
                borderRadius: 25,
                padding: '8px 50px',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => open(data.button.url)}
            >
              {data.button?.text}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductIntro;
