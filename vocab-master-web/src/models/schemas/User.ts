import mongoose, { Schema } from "mongoose";
import schemaOptions from "@/models/constants/schemaOptions";
import IBaseModel from "@/models/schemas/BaseModel";

const UserSchema: Schema = new Schema(
  {
    id: { type: Number, unique: true, required: true, index: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
  },
  schemaOptions
);
export interface IUser extends IBaseModel {
  email: string;
  password: string;
  verified: boolean;
}
export interface UserDTO {
  email: string;
  password: string;
  verified: boolean;
}

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
