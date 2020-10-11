import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;
const Types = Schema.Types;

interface Website {
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
    imgUrls: Array<{
      url: string;
      name: string;
    }>;
  };
}

const websiteSchema = new Schema({
  kind: {
    type: Types.String,
  },
  icon: {
    type: Types.String,
  },
  companyName: {
    type: {
      cn: Types.String,
      en: Types.String,
    },
  },
  info: {
    type: [Types.String],
  },
  icp: {
    type: Types.String,
  },
  slogan: {
    type: {
      main: Types.String,
      sub: Types.String,
    },
  },
  contact: {
    type: {
      name: {
        cn: Types.String,
        en: Types.String,
      },
      content: Types.String,
      imgUrls: [
        {
          url: Types.String,
          name: Types.String,
        },
      ],
    },
  },
});

export const WebsiteSchema = mongoose.model<Website & Document>(
  'website',
  websiteSchema,
);
