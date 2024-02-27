import React from "react";
import styled, { keyframes } from "styled-components";

const stroke = keyframes`   
100% {
    stroke-dashoffset: 0;
  }
`;
const scale = keyframes`
0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
`;

const fillred = keyframes`
100% {
    box-shadow: inset 0px 0px 0px 30px #c60000;
  }
`;

const Svg = styled.svg`
  position: absolute;
  right: 60px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: block;
  stroke-width: 5;
  stroke: #fff;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px #c60000;
  animation: ${fillred} 0.3s ease-in-out 0.3s forwards,
    ${scale} 0.2s ease-in-out 0.3s both;
`;

const Circle = styled.circle`
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #c60000;
  fill: none;
  animation: ${stroke} 0.3s cubic-bezier(0.65, 0, 0.45, 1) forwards;
`;

const Path = styled.path`
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: ${stroke} 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.4s forwards;
`;

// Hook
function TimesSVG() {
  return (
    <Svg viewBox="0 0 52 52">
      <Circle cx="26" cy="26" r="25" fill="none" />
      <Path fill="none" d="M16 16 36 36 M36 16 16 36" />
    </Svg>
  );
}

export default TimesSVG;
