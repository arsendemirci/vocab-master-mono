import db from "@/server/db/db";
import { shuffle } from "@/utils/arrayUtils";
import { ListFormType } from "@types";

export const getListById = async (listId: number) => {
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
export const updateListDetails = async ({
  id,
  title,
  description,
}: ListFormType) => {
  const dao = new db();
  const lastID = await dao.run(
    dao.query.UpdateListDetails(id, title, description)
  );
  return lastID;
};
export const deleteList = async (id: number) => {
  const dao = new db();
  const data = await dao.run(dao.query.DeleteList(id));
  if (data === "OK") {
    await dao.run(dao.query.DeleteListWords(id));
  }
  return data;
};
