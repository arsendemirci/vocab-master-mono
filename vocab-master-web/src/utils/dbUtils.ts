// utils/getNextId.ts
import { Db } from "@Db";

export const getNextId = async (modelName: string): Promise<number> => {
  const counter = await Db.Model.Counter.findOneAndUpdate(
    { modelName: modelName },
    { $inc: { count: 1 } },
    { new: true, upsert: true }
  );
  return counter.count;
};
