import React, { CSSProperties } from 'react';

interface Props {
  style?: CSSProperties;
  lang?: string;
  value?: string;
  children?: React.ReactNode;
  contentEditable?: boolean;
  placeholder?: string;
  onChangeText?: (val: string) => void;
  clearSignal?: number;
  maxLength?: number;
}

let id = 0;
function getId() {
  return id++;
}

const TextEditor = (props: Props) => {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const maxLength = props.maxLength || -1;
  const [id, setId] = React.useState(0);
  const [val, setVal] = React.useState('');

  React.useEffect(() => {
    setId(getId());
  }, []);
  React.useEffect(() => {
    if (props.contentEditable) {
      setEditorValue('');
    }
  }, [props.clearSignal]);
  React.useEffect(() => {
    if (!props.contentEditable) {
      setEditorValue(props.value);
    }
  }, [props.value]);

  const editorID = React.useMemo(() => `text_editor_${id}`, [id]);
  const style = React.useMemo(() => {
    if (props.lang === 'mon') {
      return { ...styles.myct, ...props.style };
    }
    if (props.lang === 'uig') {
      return { ...styles.wy, ...props.style };
    }
    return props.style;
  }, [props.lang]);

  if (!props.contentEditable) {
    return (
      <div style={{ position: 'relative', wordBreak: 'break-all', ...style }}>
        <div
          ref={editorRef}
          id={`${editorID}_display`}
          className="text_editor_display"
        >
          {props.children}
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', wordBreak: 'break-all', ...style }}>
      <div
        contentEditable
        ref={editorRef}
        id={editorID}
        className="text_editor"
        onInput={e => {
          const val = e.currentTarget.innerText;
          setVal(val);
          onInput(val);
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          bottom: 4,
          right: 10,
          opacity: maxLength > 0 ? 1 : 0,
        }}
      >
        <span style={{ color: val.length > maxLength ? 'red' : undefined }}>
          {val.length}
        </span>
        /{maxLength}
      </div>
    </div>
  );

  function onInput(val: string) {
    props.onChangeText && props.onChangeText(val);
  }

  function setEditorValue(val?: string) {
    const editor = document.getElementById(editorID);
    if (editor) {
      editor.innerText = val || '';
    }
  }
};

const styles: {
  myct: CSSProperties;
  wy: CSSProperties;
} = {
  myct: {
    writingMode: 'vertical-lr',
    WebkitWritingMode: 'vertical-lr',
    msWritingMode: 'vertical-lr',
  },
  wy: {
    writingMode: 'vertical-rl',
    WebkitWritingMode: 'vertical-rl',
    msWritingMode: 'vertical-rl',
  },
};

export default TextEditor;
