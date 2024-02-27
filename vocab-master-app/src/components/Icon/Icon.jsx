import React from "react";
import { iconConfig } from "#config";

function Icon(props) {
  let { width, height, color } = props;
  width = width ?? 20;
  height = height ?? 20;
  return (
    <svg width={width} height={height} viewBox={iconConfig[props.icon].viewBox}>
      <path
        fill={
          color
            ? color
            : iconConfig[props.icon].fill
            ? iconConfig[props.icon].fill
            : "currentColor"
        }
        d={iconConfig[props.icon].d}
      ></path>
    </svg>
  );
}

export default Icon;
