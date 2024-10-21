import db from "@/server/db/db";
import { shuffle } from "@/utils/arrayUtils";

export const getListById = async (listId: number) => {
  const dao = new db();
  const data = await dao.all(dao.query.GetListWordsByListId(listId));

  let words = shuffle(data);
  return words;
};
export const getListsAll = async () => {
  const dao = new db();
  const data = await dao.all(dao.query.GetListsAll());
  return data;
};

const listModule: {
  [key: string]: Function;
} = { getListById, getListsAll };
export const apiKeys = Object.keys(listModule);

export default listModule;
