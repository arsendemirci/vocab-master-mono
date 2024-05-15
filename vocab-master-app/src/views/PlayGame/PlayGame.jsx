import React, { useEffect } from "react";
import { TypeBoard, ScoreBoard } from "components";
import { useIPC } from "#hooks";
import { useSelector, useDispatch } from "react-redux";
import { startGame } from "#gameSlice";
function PlayGame(props) {
  console.log("[RENDERING] PlayGame Component");

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
        dispatch(startGame({ gameData }));
      })();
    }
  }, []);

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
