import iconConfig from "@/config/svgIcons";
import { IconPropsType } from "@types";
import { useEffect, useState } from "react";

const Icon: React.FC<IconPropsType> = ({
  width,
  height,
  color,
  icon,
  bg,
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
        style={{ backgroundColor: iconConfig[icon]?.bg || "" }}
        height={height ?? 20}
        width={width ?? 20}
        fill={
          color
            ? `${color}`
            : iconConfig[icon]?.fill
            ? `${iconConfig[icon].fill}`
            : `currentColor`
        }
      />
    ) : null;
  }
};
export default Icon;
