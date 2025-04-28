import { Db } from "@Db"; // adjust the path as needed
import { getNextId } from "@/utils/dbUtils";
import { RequestDTO } from "@/types";

export const getWords = async ({ userId }: RequestDTO) => {
  const result = await Db.Model.UserItem.findOne({ userId })
    .select("wordIds")
    .lean<{ wordIds: number[] }>();
  const wordIds = result?.wordIds ?? [];

  const words = await Db.Model.Word.find({ id: { $in: wordIds } });
  return words;
};

export const addWord = async ({ userId, data: word }: RequestDTO) => {
  const nextId = await getNextId("Word");
  const newWord = new Db.Model.Word({ ...word, id: nextId });
  await newWord.save();

  await Db.Model.UserItem.findOneAndUpdate(
    { userId },
    { $addToSet: { wordIds: nextId } }, // avoid duplicates
    { new: true, upsert: true } // create UserItem if it doesn't exist
  );

  return nextId;
};
export const updateWord = async ({ data: word }: RequestDTO) => {
  const updatedWord = await Db.Model.Word.findOneAndUpdate(
    { id: word.id },
    word,
    {
      new: true,
      runValidators: true,
    }
  );
  return updatedWord;
};
export const addWordToList = async ({
  userId,
  data: { question, check, listId },
}: RequestDTO) => {
  const nextId = await getNextId("Word");

  const newWord = new Db.Model.Word({ question, check, id: nextId });
  await newWord.save();

  await Db.Model.UserItem.findOneAndUpdate(
    { userId },
    { $addToSet: { wordIds: nextId } }, // avoid duplicates
    { new: true, upsert: true } // create UserItem if it doesn't exist
  );
  await Db.Model.VocabularyList.findOneAndUpdate(
    { id: listId },
    { $addToSet: { wordIds: nextId } }, // prevents duplicates
    { new: true }
  );

  return nextId;
};
export const deleteWord = async ({ userId, data: { id } }: RequestDTO) => {
  await Db.Model.Word.deleteOne({ id });
  await Db.Model.UserItem.updateOne({ userId }, { $pull: { wordIds: id } });
  await Db.Model.VocabularyList.updateMany(
    { wordIds: id }, // Match all lists that contain the wordId
    { $pull: { wordIds: id } } // Remove it from the wordIds array
  );
  return { success: true };
};

export const deleteWordFromList = async ({
  data: { id, listId },
}: RequestDTO) => {
  // Use findOneAndUpdate to remove the wordId from the wordIds array in the VocabularyList
  const updatedList = await Db.Model.VocabularyList.findOneAndUpdate(
    { id: listId },
    { $pull: { wordIds: id } }, // `$pull` removes the wordId from the array
    { new: true, runValidators: true }
  );

  if (!updatedList) {
    throw new Error("Vocabulary list not found");
  }

  return { success: true };
};
