import { Document } from "mongoose";

export interface BaseModelDTO {
  id?: number;
}
export default interface IBaseModel extends Document {
  id: number;
}
