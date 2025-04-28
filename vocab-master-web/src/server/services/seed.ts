import { Db } from "@Db";
import db from "@/server/db/db";
import fs from "fs";
import path from "path";

import Enum from "@enums";
import { wrapResponse } from "@/utils/apiUtils";

const _rootPath = process.cwd();
const _dataFolderPath = path.join(_rootPath, "AppData");
const _seedFolderPath = path.join(_dataFolderPath, "SeedData");
const _seedFilePath = path.join(_seedFolderPath, "seedData.json");
export const seedData = async () =>
  wrapResponse(async () => {
    const logs: string[] = [];
    logs.push(`Seeding data...`);

    const rawData = fs.readFileSync(_seedFilePath, "utf-8");
    const { words, vocabularylists, users, profiles, useritems } =
      JSON.parse(rawData);
    console.log(
      "ARSEN - words, vocabularylists, users, profiles, useritems  -> ",
      words,
      vocabularylists,
      users,
      profiles,
      useritems
    );
    let counter = 0;
    for (const row of words) {
      try {
        await Db.Model.Word.create({
          id: row.id,
          question: row.question,
          check: row.check,
        });
        counter++;
      } catch (e) {}
    }
    logs.push(`Total ${counter} words seeded`);

    counter = 0;
    for (const row of vocabularylists) {
      try {
        await Db.Model.VocabularyList.create({
          ...row,
          wordIds: words.map((word) => word.id),
        });
        counter++;
      } catch (e) {}
    }
    logs.push(`Total ${counter} lists seeded`);

    counter = 0;
    for (const row of users) {
      try {
        await Db.Model.User.create(row);
        counter++;
      } catch (e) {}
    }
    logs.push(`Total ${counter} user seeded`);

    counter = 0;
    for (const row of useritems) {
      try {
        await Db.Model.UserItem.create(row);
        counter++;
      } catch (e) {}
    }
    logs.push(`Total ${counter} UserItem seeded`);

    counter = 0;
    for (const row of profiles) {
      try {
        await Db.Model.Profile.create(row);
        counter++;
      } catch (e) {}
    }
    logs.push(`Total ${counter} profile seeded`);

    return logs;
  });

export const writeData = async () =>
  wrapResponse(async () => {
    const dao = new db();
    const words = await dao.all(`Select * from Words`);
    const vocabularylists = await dao.all(`Select * from VocabularyLists`);
    const users = await dao.all(`Select * from Users`);
    const profiles = await dao.all(`Select * from Profiles`);

    const useritems = [
      {
        userId: 1,
        wordIds: [...words.map((w) => w.id)],
        listIds: [...vocabularylists.map((l) => l.id)],
      },
    ];
    const wordIds = [...words.map((w) => w.id)];
    const listData = vocabularylists.map((l) => ({ ...l, wordIds }));

    const seedData = {
      words,
      vocabularylists: listData,
      users,
      profiles,
      useritems,
    };

    // Ensure folder exists
    if (!fs.existsSync(_seedFolderPath)) {
      fs.mkdirSync(_seedFolderPath, { recursive: true });
    }
    // Convert the object to JSON string
    const jsonData = JSON.stringify(seedData, null, 2); // `null, 2` makes it pretty-printed

    // Write the JSON to the file
    fs.writeFileSync(_seedFilePath, jsonData, "utf-8");
  });
