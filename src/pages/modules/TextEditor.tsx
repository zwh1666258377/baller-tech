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
}

let id = 0;
function getId() {
  return id++;
}

const TextEditor = (props: Props) => {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const [id, setId] = React.useState(0);

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
      <div style={{ flex: 1 }}>
        <div
          ref={editorRef}
          id={`${editorID}_display`}
          className="text_editor_display"
          style={style}
        >
          {props.children}
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1 }}>
      <div
        contentEditable
        ref={editorRef}
        id={editorID}
        className="text_editor"
        onInput={e => onInput(e.currentTarget.innerText)}
        style={style}
      ></div>
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
