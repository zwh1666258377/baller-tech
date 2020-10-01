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
