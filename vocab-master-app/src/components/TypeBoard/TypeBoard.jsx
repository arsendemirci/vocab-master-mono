import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextQuestion } from "#gameSlice";
import {
  addChar,
  deleteChar,
  submitAnswer,
  updateCheckmark,
} from "#boardSlice";
import "./TypeBoard.scss";
import { gameConfig } from "#config";
import { Keyboard, InputArea, QuestionBoard } from "components";
import { playAudio, getCleanWords } from "#gameUtils";

function TypeBoard() {
  const gameState = useSelector((state) => state.gameStore.game);
  const boardState = useSelector((state) => state.boardStore);
  const dispatch = useDispatch();

  console.log("typeboard is triggered", gameState);

  const setText = (key) => {
    dispatch(addChar({ char: key }));
  };

  const handleBackspace = () => {
    dispatch(deleteChar());
  };

  const handleSubmitAnswer = () => {
    if (boardState.mark) return; // current answer is being checked
    const orgAnswer = boardState.word.join("");
    const { check, answer } = getCleanWords(
      gameState.questions[gameState.activeQuestion].check,
      boardState.word
    );

    const isCorrect = answer && answer == check;

    const gameOver =
      gameState.activeQuestion === gameState.questions.length - 1;

    const points = isCorrect ? 10 : 0;
    const status = gameOver
      ? gameConfig.status.GAME_OVER
      : gameConfig.status.ACTIVE;

    dispatch(updateCheckmark({ mark: isCorrect ? "correct" : "wrong" }));
    setTimeout(() => {
      dispatch(submitAnswer());
      dispatch(updateCheckmark({ mark: "" }));
      dispatch(
        nextQuestion({
          answer: orgAnswer,
          isCorrect: isCorrect,
          status,
          points,
        })
      );
    }, 1500);
  };

  const handleEnter = () => {
    handleSubmitAnswer();
  };

  useEffect(() => {
    if (
      gameState.activeQuestion >= 0 &&
      gameState.status === gameConfig.status.ACTIVE
    ) {
      playAudio(gameState.questions[gameState.activeQuestion].question);
    }
  }, [gameState.activeQuestion]);

  return (
    <div>
      {gameState.status === gameConfig.status.ACTIVE && (
        <div className="typeboard">
          <QuestionBoard
            question={gameState.questions[gameState.activeQuestion].question}
          />
          <InputArea onSubmitAnswer={handleSubmitAnswer} />
          <hr className="divider" />
          <Keyboard
            setText={setText}
            handleBackspace={handleBackspace}
            handleEnter={handleEnter}
          />
        </div>
      )}
    </div>
  );
}

export default TypeBoard;
