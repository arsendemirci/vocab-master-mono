import db from "@/server/db/db";
import { shuffle } from "@/utils/arrayUtils";
import { ListFormType } from "@types";

export const getListById = async (listId: number) => {
  console.log("buraya geldim mi", listId);
  const dao = new db();
  const data = await dao.all(dao.query.GetListWordsByListId(listId));

  return data;
};
export const getListDetails = async (listId: number) => {
  const dao = new db();
  const data = await dao.get(dao.query.GetListDetails(listId));

  return data;
};
export const getListsAll = async () => {
  const dao = new db();
  const data = await dao.all(dao.query.GetListsAll());
  return data;
};
export const addList = async ({ title, description }: ListFormType) => {
  const dao = new db();
  const data = await dao.run(dao.query.InsertList(title, description));
  return data;
};
export const deleteList = async (id: number) => {
  const dao = new db();
  const data = await dao.run(dao.query.DeleteList(id));
  return data;
};
