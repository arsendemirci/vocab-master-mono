import React from "react";
import style from "./QuestionBoard.module.scss";
import { IconButton, Button } from "components";
import { playAudio } from "#gameUtils";

const QuestionBoard = ({ question }) => {
  return (
    <div className={style.board}>
      <div className={style.card}>
        <IconButton
          iconName="play"
          iconColor="white"
          className={style.icon}
          value={question}
          onClick={(e) => playAudio(e.target.value)}
        />
        <div className={style.question}>
          <h5>{question}</h5>
        </div>
      </div>
    </div>
  );
};

export default QuestionBoard;
