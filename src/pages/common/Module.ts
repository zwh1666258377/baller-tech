export type KindsType =
  | 'jqfy'
  | 'yysb'
  | 'txsbhmbjc'
  | 'yyhc'
  | 'wzsb'
  | 'ljwm';
export interface Module {
  kind: KindsType;
  name: {
    cn: string;
    en: string;
  };
  poductIntroduction: {
    title: {
      cn: string;
      en: string;
    };
    imgUrl: string;
    content: string;
    button: {
      text: string;
      url: string;
    };
  };
  usageScenarios: {
    title: {
      cn: string;
      en: string;
    };
    imgUrls: string[];
  };
}
