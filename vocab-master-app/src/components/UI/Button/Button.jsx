import React, { useEffect, useState } from "react";
import { useRippleEffect } from "#hooks";
import classes from "./Button.module.scss";

const Button = (props) => {
  const [clickHandler, renderRipple] = useRippleEffect({
    onClick: props.onClick,
    origin: "center",
  });

  return (
    <button
      type={props.type || "button"}
      onClick={clickHandler}
      className={`${classes.button} ${props.className}`}
    >
      {props.children}
      {renderRipple()}
    </button>
  );
};

export default Button;
