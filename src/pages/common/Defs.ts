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

export interface Website {
  kind: string;
  icon: string;
  companyName: {
    cn: string;
    en: string;
  };
  info: string[];
  icp: string;
  slogan: {
    main: string;
    sub: string;
  };
  contact: {
    name: {
      cn: string;
      en: string;
    };
    content: string;
    imgUrls: string[];
  };
}
