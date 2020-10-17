import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;
const Types = Schema.Types;

type KindsType = 'jqfy' | 'yysb' | 'txsbhmbjc' | 'yyhc' | 'wzsb' | 'ljwm';

interface Module {
  kind: KindsType;
  name: {
    cn: string;
    en: string;
  };
  companyIntroduction: {
    title: {
      cn: string;
      en: string;
    };
    content: string;
  };
  honor: {
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
}

const moduleSchema = new Schema({
  kind: {
    type: Types.String,
    required: true,
  },
  name: {
    type: {
      cn: Types.String,
      en: Types.String,
    },
    required: true,
  },
  honor: {
    type: {
      display: Types.Boolean,
      title: {
        cn: Types.String,
        en: Types.String,
      },
      imgUrls: [
        {
          url: Types.String,
          name: Types.String,
        },
      ],
    },
    default: {
      display: true,
    },
  },
  contact: {
    type: {
      display: Types.Boolean,
      title: {
        cn: Types.String,
        en: Types.String,
      },
      imgUrls: [
        {
          url: Types.String,
          name: Types.String,
        },
      ],
    },
    default: {
      display: true,
    },
  },
  partne: {
    type: {
      display: Types.Boolean,
      title: {
        cn: Types.String,
        en: Types.String,
      },
      imgUrls: [
        {
          url: Types.String,
          name: Types.String,
        },
      ],
    },
    default: {
      display: true,
    },
  },
  companyIntroduction: {
    type: {
      display: Types.Boolean,
      title: {
        cn: Types.String,
        en: Types.String,
      },
      content: Types.String,
    },
    default: {
      display: true,
    },
  },
  poductIntroduction: {
    type: {
      display: Types.Boolean,
      title: {
        cn: Types.String,
        en: Types.String,
      },
      imgUrl: Types.String,
      content: Types.String,
      button: {
        text: Types.String,
        url: Types.String,
      },
    },
    default: {
      display: true,
    },
  },
  productExperience: {
    type: {
      display: Types.Boolean,
    },
    default: {
      display: true,
    },
  },
  productDisplay: {
    type: {
      display: Types.Boolean,
      kind: Types.String,
      items: [{ url: Types.String, name: Types.String }],
    },
    default: {
      display: true,
      items: [],
    },
  },
  usageScenarios: {
    type: {
      display: Types.Boolean,
      imgUrls: [
        {
          url: Types.String,
          name: Types.String,
        },
      ],
    },
    default: {
      display: true,
      imgUrls: [],
    },
  },
  textTranslationRules: {
    type: [
      {
        from: { key: Types.String, label: Types.String },
        to: { key: Types.String, label: Types.String },
      },
    ],
    default: [],
  },
  audioTranslationRules: {
    type: [{ key: Types.String, label: Types.String }],
    default: [],
  },
  imageTranslationRules: {
    type: [{ key: Types.String, label: Types.String }],
    default: [],
  },
});

export const ModuleSchema = mongoose.model<Module & Document>(
  'module',
  moduleSchema,
);
