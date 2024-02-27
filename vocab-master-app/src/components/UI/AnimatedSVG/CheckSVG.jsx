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

const fill = keyframes`
100% {
    box-shadow: inset 0px 0px 0px 30px #fff;
  }
`;

const Svg = styled.svg`
  position: absolute;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: block;
  stroke-width: 3;
  right: 60px;
  stroke: green;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px #7ac142;
  animation: ${fill} 0.3s ease-in-out 0.3s forwards,
    ${scale} 0.3s ease-in-out 0.4s both;
`;

const Circle = styled.circle`
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: green;
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
function CheckSVG() {
  return (
    <Svg viewBox="0 0 52 52">
      <Circle cx="26" cy="26" r="25" fill="none" />
      <Path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
    </Svg>
  );
}

export default CheckSVG;
