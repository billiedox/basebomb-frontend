import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 16 16" {...props}>
      <circle cx="8" cy="8" r="8">smalldot</circle>
    </Svg>
  );
};

export default Icon;
