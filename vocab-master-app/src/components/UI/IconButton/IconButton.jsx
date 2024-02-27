import React from "react";
import classes from "./IconButton.module.scss";
import { useRippleEffect } from "#hooks";

import { Icon } from "components";

const IconButton = (props) => {
  const [clickHandler, renderRipple] = useRippleEffect({
    onClick: props.onClick,
    origin: "center",
  });
  return (
    <button
      value={props.value}
      onClick={clickHandler}
      className={`${classes.button} ${props.className}`}
    >
      <Icon
        icon={props.iconName}
        width={props.iconWidth}
        height={props.iconHeight}
      />

      {renderRipple()}
    </button>
  );
};

export default IconButton;
