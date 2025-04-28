// models/Counter.ts
import mongoose, { Schema } from "mongoose";
import schemaOptions from "@/models/constants/schemaOptions";
import IBaseModel, { BaseModelDTO } from "@/models/schemas/BaseModel";

const CounterSchema: Schema = new Schema(
  {
    modelName: { type: String, required: true, unique: true },
    count: { type: Number, default: 0 },
  },
  schemaOptions
);
export interface ICounter extends IBaseModel {
  modelName: string;
  count: number;
}
export interface CounterDTO extends BaseModelDTO {
  modelName: string;
  count: number;
}

export default mongoose.models.Counter ||
  mongoose.model<ICounter>("Counter", CounterSchema);
