import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const scale = keyframes`   
    to { 
    transform: translate(-50%, -50%) scale(3); 
    opacity: 0 
    }
`;

const Span = styled.span`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.404);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  animation: ${scale} 0.5s ease-out;
  width: 100px;
  height: 100px;
  pointer-events: none;
`;
const initial = {
  click: true,
  x: null,
  y: null,
  width: "100px",
  height: "100px",
};
// Hook
function useRippleEffect({ onClick, origin }) {
  console.log("useripple effect triggered");

  const [state, setState] = useState(initial);

  const clickHandler = (e) => {
    let maxWave = Math.max(e.target.offsetWidth, e.target.offsetHeight);
    let stSet = {
      width: maxWave + "px",
      height: maxWave + "px",
      click: false,
    };

    if (origin === "center") {
      setState({
        ...stSet,
        x: "50%",
        y: "50%",
      });
    } else {
      const xInside = e.clientX - e.target.offsetLeft;
      const yInside = e.clientY - e.target.offsetTop;
      setState({
        ...stSet,
        x: xInside + "px",
        y: yInside + "px",
      });
    }
    if (onClick) onClick(e);
  };
  const onAnimationEnd = () => {
    setState(initial);
  };

  useEffect(() => {
    if (!state.click) {
      setState((prev) => {
        return { ...prev, click: true };
      });
    }
  }, [state]);

  const renderRipple = () => {
    return (
      state.click &&
      state.y && (
        <Span
          style={{
            top: state.y,
            left: state.x,
            width: state.width,
            height: state.height,
          }}
          onAnimationEnd={onAnimationEnd}
        ></Span>
      )
    );
  };

  return [clickHandler, renderRipple];
}

export default useRippleEffect;
