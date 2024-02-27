import React, { useRef } from "react";
import classes from "./IconButton.module.scss";
import { useRippleEffect } from "#hooks";

const IconButton = (props) => {
  const logoGifr = require("/src/assets/images/icon/speaker.gif").default;
  const logoGifp = require("/src/assets/images/icon/speaker.png").default;
  const imgRef = useRef();
  const [clickHandler, renderRipple] = useRippleEffect({
    onClick: props.onClick,
    origin: "center",
  });
  return (
    <button
      value={props.value}
      onClick={clickHandler}
      className={`${classes.button} ${props.className}`}
      onMouseEnter={() => (imgRef.current.src = logoGifr)}
      onMouseLeave={() => (imgRef.current.src = logoGifp)}
    >
      <img ref={imgRef} width={40} height={40} src={logoGifp} alt="m" />
      {renderRipple()}
    </button>
  );
};

export default IconButton;
