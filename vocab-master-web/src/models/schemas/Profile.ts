import mongoose, { Schema } from "mongoose";
import schemaOptions from "@/models/constants/schemaOptions";
import IBaseModel, { BaseModelDTO } from "@/models/schemas/BaseModel";

const ProfileSchema: Schema = new Schema(
  {
    id: { type: Number, unique: true, required: true, index: true },
    userId: { type: Number, ref: "User", required: true },
    firstName: { type: String },
    lastName: { type: String },
    avatar: { type: String },
    isDefault: { type: Boolean, default: false },
  },
  schemaOptions
);

export interface IProfile extends IBaseModel {
  userId: number;
  firstName: string;
  lastName: string;
  avatar: string;
  isDefault: boolean;
}
export interface ProfileDTO extends BaseModelDTO {
  userId: number;
  firstName: string;
  lastName: string;
  avatar: string;
  isDefault: boolean;
}

export default mongoose.models.Profile ||
  mongoose.model<IProfile>("Profile", ProfileSchema);
