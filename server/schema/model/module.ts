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
    imgUrls: string[];
  };
  partne: {
    title: {
      cn: string;
      en: string;
    };
    imgUrls: string[];
  };
  contact: {
    title: {
      cn: string;
      en: string;
    };
    imgUrls: string[];
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
      title: {
        cn: Types.String,
        en: Types.String,
      },
      imgUrls: [Types.String],
    },
  },
  contact: {
    type: {
      title: {
        cn: Types.String,
        en: Types.String,
      },
      imgUrls: [Types.String],
    },
  },
  partne: {
    type: {
      title: {
        cn: Types.String,
        en: Types.String,
      },
      imgUrls: [Types.String],
    },
  },
  companyIntroduction: {
    type: {
      title: {
        cn: Types.String,
        en: Types.String,
      },
      content: Types.String,
    },
  },
  poductIntroduction: {
    type: {
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
  },
  usageScenarios: {
    type: {
      imgUrls: [Types.String],
    },
    default: {
      imgUrls: [],
    },
  },
});

export const ModuleSchema = mongoose.model<Module & Document>(
  'module',
  moduleSchema,
);
