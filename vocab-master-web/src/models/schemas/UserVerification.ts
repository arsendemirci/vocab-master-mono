import mongoose, { Schema } from "mongoose";
import schemaOptions from "@/models/constants/schemaOptions";
import IBaseModel, { BaseModelDTO } from "@/models/schemas/BaseModel";

const UserVerificationSchema: Schema = new Schema(
  {
    id: { type: Number, unique: true, required: true, index: true },
    userId: { type: Number, ref: "User", required: true, unique: true },
    code: { type: String, required: true },
    validDate: { type: Date, required: true },
  },
  schemaOptions
);

export interface IUserVerification extends IBaseModel {
  userId: number;
  code: string;
  validDate: Date;
}

export interface UserVerificationDTO extends BaseModelDTO {
  userId: number;
  code: string;
  validDate: Date;
}

export default mongoose.models.UserVerification ||
  mongoose.model<IUserVerification>("UserVerification", UserVerificationSchema);
