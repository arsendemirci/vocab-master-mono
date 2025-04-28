import mongoose, { Schema } from "mongoose";
import schemaOptions from "@/models/constants/schemaOptions";
import IBaseModel, { BaseModelDTO } from "@/models/schemas/BaseModel";

const WordSchema: Schema = new Schema(
  {
    id: { type: Number, unique: true, required: true, index: true },
    question: { type: String, required: true },
    check: { type: String, required: true },
  },
  schemaOptions
);
export interface IWord extends IBaseModel {
  question: string;
  check: string;
}
export interface WordDTO extends BaseModelDTO {
  question: string;
  check: string;
}

export default mongoose.models.Word ||
  mongoose.model<IWord>("Word", WordSchema);
