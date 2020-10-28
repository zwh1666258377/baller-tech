export interface PageProps {
  data: {
    module: Module;
    website: Website;
  };
}
export type KindsType = 'jqfy' | 'yysb' | 'txsb' | 'yyhc' | 'wzsb' | 'ljwm';
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
  productDisplay: {
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
  textTranslationRules: Array<{
    from: {
      key: string;
      label: string;
    };
    to: {
      key: string;
      label: string;
    };
  }>;
  audioTranslationRules: Array<{
    key: string;
    label: string;
  }>;
  imageTranslationRules: Array<{
    key: string;
    label: string;
  }>;
  langRegRules: Array<{
    label: string;
    key: string;
    reg: string;
  }>;
}

export interface Website {
  callTimesLimitTip: string;
  carousels: {
    h5: string[];
    pc: string[];
  };
  kind: string;
  icon: string;
  companyName: {
    cn: string;
    en: string;
  };
  info: string[];
  icp: string;
  icpUrl: string;
  copyright: string;
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
