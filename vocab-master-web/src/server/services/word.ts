import db from "@/server/db/db";
import { shuffle } from "@/utils/arrayUtils";
import { WordFormType } from "@types";

export const getWords = async () => {
  const dao = new db();
  const data = await dao.all(dao.query.GetWords());

  return data;
};
export const addWord = async ({ question, check }: WordFormType) => {
  const dao = new db();
  const lastID = await dao.run(dao.query.InsertWord(question, check));
  return lastID;
};
export const addWordToList = async ({ question, check, listId }) => {
  const dao = new db();

  const lastID = await dao.run(dao.query.InsertWord(question, check));
  if (lastID && typeof lastID === "number") {
    const response = await dao.run(dao.query.AddWordToList(lastID, listId));
  }
  return lastID;
};
