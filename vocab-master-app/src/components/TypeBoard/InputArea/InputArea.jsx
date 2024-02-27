import React, { useEffect, useRef } from "react";
import { setOverflowFlag } from "#boardSlice";

import { IconButton, TimesSVG, CheckSVG } from "components";
import style from "./InputArea.module.scss";
import { useSelector, useDispatch } from "react-redux";

const InputArea = ({ onSubmitAnswer }) => {
  const boardState = useSelector((state) => state.boardStore);
  const gameState = useSelector((state) => state.gameStore.game);
  const dispatch = useDispatch();
  const refKey = useRef(null);
  const refArea = useRef(null);

  const isOverflowActive = (event) => {
    const areaPaddingX =
      parseFloat(window.getComputedStyle(refArea.current).paddingLeft) +
      parseFloat(window.getComputedStyle(refArea.current).paddingRight);
    const areaLength = refArea.current.offsetWidth - areaPaddingX;

    return event.scrollWidth > areaLength;
  };
  const inputAreaClass = `${style["input-area"]} ${
    style[boardState.mark] || ""
  }`;
  const inputClass = `${style.input} ${
    boardState.overflowActive && style["float-right"]
  }`;
  useEffect(() => {
    if (isOverflowActive(refKey.current) && !boardState.overflowActive) {
      dispatch(setOverflowFlag({ isOverflow: true }));
    }
    if (!isOverflowActive(refKey.current) && boardState.overflowActive) {
      dispatch(setOverflowFlag({ isOverflow: false }));
    }
  });

  return (
    <div className={inputAreaClass} ref={refArea}>
      <div className={inputClass} ref={refKey}>
        {boardState.word.map((w, index) => {
          let styles = {};
          if (w === " ") {
            styles["marginLeft"] = "10px";
          }

          return (
            <div key={index} className={style["input-char"]} style={styles}>
              {w}
            </div>
          );
        })}
      </div>
      {boardState.mark === "wrong" && <TimesSVG />}
      {boardState.mark === "correct" && <CheckSVG />}
      <IconButton
        className={style.icon}
        iconName="send"
        onClick={onSubmitAnswer}
        iconHeight={32}
        iconWidth={32}
      />
    </div>
  );
};

export default InputArea;
