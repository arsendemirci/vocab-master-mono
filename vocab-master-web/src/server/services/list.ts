import { getNextId } from "@/utils/dbUtils";
import { Db } from "@Db";
import { RequestDTO } from "@/types";

export const getListById = async ({ data: { listId } }: RequestDTO) => {
  const list = await Db.Model.VocabularyList.findOne({ id: listId });

  if (!list) throw new Error("Vocabulary list not found");

  // 2. Use the wordIds array to find matching Word documents
  const words = await Db.Model.Word.find({
    id: { $in: list.wordIds },
  }).lean();

  return words;
};
export const getListDetails = async ({ data: { listId } }: RequestDTO) => {
  return await Db.Model.VocabularyList.findOne({ id: listId }).lean();
};

export const getListsAll = async ({ userId }: RequestDTO) => {
  const result = await Db.Model.UserItem.findOne({ userId })
    .select("listIds")
    .lean<{ listIds: number[] }>();
  const listIds = result?.listIds ?? [];
  const lists = await Db.Model.VocabularyList.find({
    id: { $in: listIds },
  }).lean();

  return lists;
};
export const addList = async ({ userId, data: list }: RequestDTO) => {
  console.log("ARSEN - data -> ", list);
  const nextId = await getNextId("VocabularyList");
  const newList = new Db.Model.VocabularyList({ ...list, id: nextId });
  await newList.save();

  await Db.Model.UserItem.findOneAndUpdate(
    { userId },
    { $addToSet: { listIds: nextId } }, // avoid duplicates
    { new: true, upsert: true } // create UserItem if it doesn't exist
  );
  return nextId;
};
export const updateListDetails = async ({ data: list }: RequestDTO) => {
  const updatedList = await Db.Model.VocabularyList.findOneAndUpdate(
    { id: list.id },
    list,
    {
      new: true,
      runValidators: true,
    }
  );
  return updatedList;
};
export const deleteList = async ({ userId, data: { id } }: RequestDTO) => {
  await Db.Model.VocabularyList.deleteOne({ id });
  await Db.Model.UserItem.updateOne({ userId }, { $pull: { listIds: id } });

  return { success: true };
};
