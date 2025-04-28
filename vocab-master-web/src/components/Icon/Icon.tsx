import { IconPropsType } from "@types";
import { useEffect, useState } from "react";

const Icon: React.FC<IconPropsType> = ({
  width,
  height,
  color,
  icon,
  type,
}) => {
  if (type == "png")
    return (
      <img
        src={`/assets/images/icon/${icon}.png`}
        width={width}
        height={height}
      />
    );
  else {
    const [SvgIcon, setIcon] = useState<any>();
    useEffect(() => {
      const loadIcon = async () => {
        const Svg = (await import(`./SvgIcons/${icon}`)).default;
        setIcon(() => Svg);
      };

      loadIcon();
    }, [SvgIcon]);

    return SvgIcon ? (
      <SvgIcon
        {...(color && { fill: color })}
        height={height ?? 22}
        width={width ?? 22}
        // fill={color ? `${color}` : `currentColor`}
      />
    ) : null;
  }
};
export default Icon;
