import React from "react";
import { SpaceProps, Space as VantSpace } from "react-vant";
import { useFormLayout } from "../form-layout";

interface ISpaceProps extends SpaceProps {
  size?: "small" | "middle" | "large" | number;
}

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
};

function getNumberSize(size) {
  return typeof size === "string" ? spaceSize[size] : size || 0;
}

export const Space: React.FC<ISpaceProps> = ({ direction, size, ...props }) => {
  const layout = useFormLayout();
  const numberSize = getNumberSize(size ?? layout.size ?? "small");
  return React.createElement(VantSpace, {
    direction: direction ?? layout?.layout,
    ...props,
    style: {
      ["--gap"]: `${numberSize}px`,
    },
  });
};

export default Space;
