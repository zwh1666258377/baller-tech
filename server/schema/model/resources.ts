import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;
const Types = Schema.Types;

interface Resources {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  kind: string;
  size: number;
}

const resourcesSchema = new Schema({
  kind: {
    type: Types.String,
    required: true,
  },
  filename: {
    type: Types.String,
    required: true,
  },
  originalname: {
    type: Types.String,
    required: true,
  },
  encoding: {
    type: Types.String,
    required: true,
  },
  mimetype: {
    type: Types.String,
    required: true,
  },
  destination: {
    type: Types.String,
    required: true,
  },
  path: {
    type: Types.String,
    required: true,
  },
  size: {
    type: Types.Number,
    required: true,
  },
});

export const ResourceSchema = mongoose.model<Resources & Document>(
  'resource',
  resourcesSchema,
);
