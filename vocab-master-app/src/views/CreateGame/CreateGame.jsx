import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGameLists, selectList, startGame } from "#gameSlice";
import style from "./CreateGame.module.scss";
import { Autocomplete, TextField } from "@mui/material";
import { useIPC } from "#hooks";
import { Button } from "components";
import { useNavigate } from "react-router-dom";
import { links } from "#routes";

function CreateGame() {
  console.log("[RENDERING] CreateGame Component");

  const gameStore = useSelector((state) => state.gameStore);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ipc = useIPC();
  const onSelectList = (event, selectedOption) => {
    dispatch(selectList({ ...selectedOption }));
  };

  //    const onStartGame = async () => {
  //      const gameData = await ipc.getGame(gameStore.game.settings.list.id);
  //      dispatch(startGame({ gameData }));
  //    };

  useEffect(() => {
    (async function getListData() {
      const listData = await ipc.getLists();
      dispatch(getGameLists({ lists: listData }));
    })();
  }, []);

  return (
    <div className={style.box}>
      <span className={style.boxtitle}>Game Preferences</span>
      <div className={style.border}>
        <div>
          <Autocomplete
            options={gameStore.lists.map((opt) => {
              return { label: opt.title, id: opt.id };
            })}
            sx={{ width: 400 }}
            onChange={onSelectList}
            renderInput={(params) => {
              return <TextField {...params} label="Vocabulary List" />;
            }}
          />
        </div>
        <div>
          <Button onClick={() => navigate(links.PlayGame())}>Start Game</Button>
        </div>
      </div>
    </div>
  );
}

export default CreateGame;
