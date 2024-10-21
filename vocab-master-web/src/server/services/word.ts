import db from "@/server/db/db";
import { shuffle } from "@/utils/arrayUtils";

export const getWords = async () => {
  const dao = new db();
  const data = await dao.all(dao.query.GetWords());

  return data;
};

const wordModule: {
  [key: string]: Function;
} = { getWords };
export const apiKeys = Object.keys(wordModule);

export default wordModule;
