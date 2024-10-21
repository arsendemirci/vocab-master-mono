import React, { useEffect, useLayoutEffect } from "react";
import { TypeBoard, ScoreBoard } from "components";
import { useIPC } from "#hooks";
import { useSelector, useDispatch } from "react-redux";
import { startGame } from "#gameSlice";
import { showModal } from "#appSlice";
import { dialog } from "components/Dialogs";
import { useLocation } from "react-router-dom";
import { mockData, gameConfig } from "#config";
function PlayGame(props) {
  console.log("[RENDERING] PlayGame Component");
  const location = useLocation();
  const gameStore = useSelector((state) => state.gameStore);

  const dispatch = useDispatch();
  const ipc = useIPC();

  useEffect(() => {
    if (props.quick || gameStore.game.settings.list.id) {
      (async function beginGame() {
        let gameData = null;
        if (props.quick) {
          gameData = await ipc.getQuickGame();
        } else {
          gameData = await ipc.getGame(gameStore.game.settings.list.id);
        }
        if (!gameData.error) {
          if (
            gameStore.game.settings.questionType !==
            gameConfig.questionType.Normal
          ) {
            gameData = gameData.map((item) => {
              let reverse =
                gameStore.game.settings.questionType ===
                  gameConfig.questionType.Reverse || Math.random() < 0.5;
              let newItem = { ...item };
              if (reverse) {
                newItem = {
                  ...item,
                  question: item.check,
                  check: item.question,
                };
              }
              return newItem;
            });
          }
          if (gameStore.game.settings.length === gameConfig.length.ALL) {
            dispatch(startGame({ gameData }));
          } else {
            gameData = gameData.slice(0, gameStore.game.settings.length);
            dispatch(startGame({ gameData }));
          }
        } else {
          gameData = mockData.quickGameData;
          dispatch(startGame({ gameData }));
        }
      })();
    }
  }, [location]);

  return (
    <div>
      <section>
        <TypeBoard />
        <ScoreBoard />
      </section>
    </div>
  );
}

export default PlayGame;
