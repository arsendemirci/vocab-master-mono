import React from "react";
import classes from "./HoverButton.module.scss";
import { Icon } from "components";

const HoverButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`${classes.button} ${classes.spin} ${classes.animated} ${props.className}`}
    >
      <Icon width={40} height={40} icon="power" />
      {props.hovertip && (
        <label className={classes.hovertip}>{props.hovertip}</label>
      )}
    </button>
  );
};

export default HoverButton;
