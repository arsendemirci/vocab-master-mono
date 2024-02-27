import React from "react";
import style from "./ScoreBoard.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { startGame, restartGame } from "#gameSlice";
import { Icon, Button } from "components";
import { gameConfig } from "#config";
import { useIPC } from "#hooks";
import { sum } from "#arrayUtils";

const ScoreBoard = () => {
  const gameState = useSelector((state) => state.gameStore.game);
  const dispatch = useDispatch();
  const ipc = useIPC();
  const onStartGame = async (event, isRestart) => {
    if (isRestart) {
      dispatch(restartGame());
    } else {
      let gameData;
      if (gameState.settings.list.id) {
        gameData = await ipc.getGame(gameState.settings.list.id);
      } else {
        gameData = await ipc.getQuickGame();
      }

      dispatch(startGame({ gameData }));
    }
  };
  return (
    gameState.status === gameConfig.status.GAME_OVER && (
      <div className={style.scoreBoard}>
        <h3>Game Over</h3>
        <div className={style.table}>
          <div className={`${style.row} ${style.header}`}>
            <div>Word</div> <div>Correct Answer</div> <div>Your Answer</div>
            <div className={style.itemIcon}></div>
          </div>
          {gameState.questions.map((q, index) => {
            return (
              <div
                key={index}
                className={`${style.row} ${
                  q.isCorrect ? style.correct : style.wrong
                }`}
              >
                <div>{q.question}</div>
                <div>{q.check}</div>
                <div>{q.answer}</div>
                <div className={style.itemIcon}>
                  <Icon
                    width={34}
                    height={34}
                    icon={q.isCorrect ? "check" : "times"}
                  />
                </div>
              </div>
            );
          })}
          <div className={`${style.row} ${style.score}`}>
            <div className={style.scoreLabel}>Total Score : </div>
            <div className={style.scoreValue}>
              {sum(gameState.questions, "score")}
            </div>
          </div>
        </div>
        <div>
          <Button onClick={onStartGame}>Start Another Game</Button>&nbsp;&nbsp;
          <Button onClick={(e) => onStartGame(e, true)}>Restart Game</Button>
        </div>
      </div>
    )
  );
};
export default ScoreBoard;
