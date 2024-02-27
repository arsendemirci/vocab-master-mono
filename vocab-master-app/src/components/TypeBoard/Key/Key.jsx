import React, { forwardRef, useState, useImperativeHandle } from "react";
import "./Key.scss";

const Key = forwardRef(function ({ keyMap, setText }, ref) {
  const [animation, setAnimation] = useState("");
  const pressKey = (event) => {
    if (!event) {
      setAnimation("");
      setTimeout(() => {
        setAnimation("animation");
      });
    } else {
      setText(keyMap.char);
    }
  };
  useImperativeHandle(ref, () => ({
    pressKey,
  }));

  const onAnimationEnd = () => {
    setAnimation("");
  };

  return (
    <button
      onClick={pressKey}
      className={`key ${animation} ${keyMap.class}`}
      ref={ref}
      onAnimationEnd={onAnimationEnd}
    >
      {keyMap.label}
    </button>
  );
});

export default Key;
