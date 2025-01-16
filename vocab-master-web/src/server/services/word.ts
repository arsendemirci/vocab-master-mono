import db from "@/server/db/db";
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
export const updateWord = async ({ id, question, check }: WordFormType) => {
  const dao = new db();
  const lastID = await dao.run(dao.query.UpdateWord(id, question, check));
  return lastID;
};
export const addWordToList = async ({ question, check, listId }) => {
  const dao = new db();

  const lastID = await dao.run(dao.query.InsertWord(question, check));
  if (lastID && typeof lastID === "number") {
    await dao.run(dao.query.AddWordToList(lastID, listId));
  }
  return lastID;
};
export const deleteWord = async (id: number) => {
  const dao = new db();
  const data = await dao.run(dao.query.DeleteWord(id));

  return data;
};
export const deleteWordFromList = async ({ ...args }) => {
  const dao = new db();
  let arr = Object.keys(args).map((key) => args[key]);
  const data = await dao.run(dao.query.DeleteWordFromList(...arr));

  return data;
};
