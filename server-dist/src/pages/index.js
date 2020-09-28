import React from 'react';
import { Button, Typography } from 'antd';
const { Title } = Typography;
// const languages = [
//   { label: "藏文翻译为中文", language: "tib-chs" },
//   { label: "维文翻译为中文", language: "uig-chs" },
//   { label: "哈萨克文翻译为中文", language: "kaz-chs" },
//   { label: "蒙文(内蒙)翻译为中文", language: "mon-chs" },
//   { label: "蒙文(外蒙)翻译为中文", language: "mon_o-chs" },
//   { label: "彝文翻译为中文", language: "iii-chs" },
//   { label: "壮文翻译为中文", language: "zha-chs" },
//   { label: "韩文翻译为中文", language: "kor-chs" },
//   { label: "中文翻译为藏文", language: "chs-tib" },
//   { label: "中文翻译为哈萨克文", language: "chs-kaz" },
//   { label: "中文翻译为蒙文(内蒙)", language: "chs-mon" },
//   { label: "中文翻译为蒙文(外蒙)", language: "chs-mon_o" },
//   { label: "中文翻译为维文", language: "chs-uig" },
//   { label: "中文翻译为彝文", language: "chs-iii" },
//   { label: "中文翻译为壮文", language: "chs-zha" },
//   { label: "中文翻译为韩文", language: "chs-kor" },
// ]
export default () => {
  const originStr = '您好';
  const [translationStr, setTranslationStr] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const translate = React.useCallback(language => {
    setLoading(true);
    fetch('http://localhost:7001/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        str: originStr,
        language: language,
      }),
    })
      .then(r => {
        return r.json();
      })
      .then(res => {
        if (!!res && res?.code == 0 && res?.is_end == 1) {
          setTranslationStr(res.data);
          setLoading(false);
        }
      });
  }, []);
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      { style: { textAlign: 'center' } },
      React.createElement(
        Title,
        null,
        originStr,
        ':',
        loading ? '翻译中...' : translationStr,
      ),
      React.createElement(
        'div',
        { style: { marginBottom: '8px' } },
        React.createElement(
          Button,
          { onClick: () => translate('chs-tib') },
          '\u628A\u2018\u60A8\u597D\u2019\u7FFB\u8BD1\u4E3A\u85CF\u6587',
        ),
      ),
    ),
  );
};
//# sourceMappingURL=index.js.map
