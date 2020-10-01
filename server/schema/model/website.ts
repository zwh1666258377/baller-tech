import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;
const Types = Schema.Types;

interface Website {
  icon: string;
  companyName: {
    cn: string;
    en: string;
  };
  info: Array<{
    label: string;
    value: string;
  }>;
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

const websiteSchema = new Schema({
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
    type: [
      {
        label: Types.String,
        value: Types.String,
      },
    ],
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
      imgUrls: [Types.String],
    },
  },
});

export const WebsiteSchema = mongoose.model<Website & Document>(
  'website',
  websiteSchema,
);
