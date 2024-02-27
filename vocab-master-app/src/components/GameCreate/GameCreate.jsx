import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGameLists, selectList, startGame } from "#gameSlice";
import style from "./GameCreate.module.scss";  
import { Autocomplete, TextField } from "@mui/material";
import { useIPC } from "#hooks";
import { Button } from "components";
import { gameConfig } from "#config";
import { useLocation } from "react-router-dom";

function GameCreate(props) {
  console.log("Gamecreate reneder");
  const location = useLocation();

  const gameStore = useSelector((state) => state.gameStore);

  const dispatch = useDispatch();
  const ipc = useIPC();
  const onSelectList = (event, selectedOption) => {
    dispatch(selectList({ ...selectedOption }));
  };

  const onStartGame = async () => {
    const gameData = await ipc.getGame(gameStore.game.settings.list.id);
    console.log("game data geldi", gameData);
    dispatch(startGame({ gameData }));
  };

  useEffect(() => {
    console.log("propssssss quickck", props.quick);
    if (props.quick) {
      (async function startQuick() {
        const quickGame = await ipc.getQuickGame();
        console.log("quick game geldi", quickGame);
        dispatch(startGame({ gameData: quickGame }));
      })();
    } else {
      (async function getListData() {
        const listData = await ipc.getLists();
        dispatch(getGameLists({ lists: listData }));
      })();
    }
  }, [location]);

  return (
    gameStore.game.status === gameConfig.status.NOT_STARTED && (
      <div>
        <section>
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
                <Button onClick={onStartGame}>Start Game</Button>{" "}
                <Button onClick={() => console.log("ripple test")}>
                  Ripple Test
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  );
}

export default GameCreate;
