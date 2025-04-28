import mongoose, { Schema, model, models } from "mongoose";
import IBaseModel, { BaseModelDTO } from "@/models/schemas/BaseModel";
import schemaOptions from "@/models/constants/schemaOptions";

const VocabularyListSchema: Schema = new Schema(
  {
    id: { type: Number, unique: true, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String },
    wordIds: [{ type: Number, ref: "Word" }],
  },
  schemaOptions
);

export interface IVocabularyList extends IBaseModel {
  title: string;
  description?: string;
  wordIds: number[];
}

export interface VocabularyListDTO extends BaseModelDTO {
  title: string;
  description?: string;
  wordIds: number[];
}

// ✅ Fix model overwrite issue
const VocabularyList =
  models.VocabularyList ||
  model<IVocabularyList>("VocabularyList", VocabularyListSchema);

export default VocabularyList;
