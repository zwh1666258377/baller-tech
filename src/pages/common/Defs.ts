export interface PageProps {
  data: {
    module: Module;
    website: Website;
  };
}
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
  companyIntroduction: {
    display: boolean;
    title: {
      cn: string;
      en: string;
    };
    content: string;
  };
  honor: {
    display: boolean;
    title: {
      cn: string;
      en: string;
    };
    imgUrls: Array<{
      url: string;
      name: string;
    }>;
  };
  partne: {
    display: boolean;
    title: {
      cn: string;
      en: string;
    };
    imgUrls: Array<{
      url: string;
      name: string;
    }>;
  };
  contact: {
    display: boolean;
    title: {
      cn: string;
      en: string;
    };
    imgUrls: Array<{
      url: string;
      name: string;
    }>;
  };
  poductIntroduction: {
    display: boolean;
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
  productExperience: {
    display: boolean;
  };
  productShow: {
    display: boolean;
    kind: string;
    items: Array<{
      url: string;
      name: string;
    }>;
  };
  usageScenarios: {
    display: boolean;
    title: {
      cn: string;
      en: string;
    };
    imgUrls: Array<{
      url: string;
      name: string;
    }>;
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
