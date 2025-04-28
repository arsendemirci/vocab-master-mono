import mongoose, { Schema } from "mongoose";
import IBaseModel, { BaseModelDTO } from "@/models/schemas/BaseModel";

import schemaOptions from "@/models/constants/schemaOptions";

const UserItemSchema: Schema = new Schema(
  {
    id: { type: Number, unique: true, required: true, index: true },
    userId: { type: Number, unique: true, required: true },
    wordIds: [{ type: Number, ref: "Word" }],
    listIds: [{ type: Number, ref: "VocabularyList" }],
  },
  schemaOptions
);

export interface IUserItem extends IBaseModel {
  userId: number;
  wordIds: number[];
  listIds: number[];
}
export interface UserItemDTO extends BaseModelDTO {
  userId: number;
  wordIds: number[];
  listIds: number[];
}

export default mongoose.models.UserItem ||
  mongoose.model<IUserItem>("UserItem", UserItemSchema);
