import React from "react";
import Image from "next/image";
import { SvgProps } from "../types";

interface LogoProps extends SvgProps {
  isDark: boolean;
}

const Logo: React.FC<LogoProps> = ({ isDark, ...props }) => {
  return (
    <Image src="/images/logo-with-text.png" {...props} />
  );
};

export default React.memo(Logo, (prev, next) => prev.isDark === next.isDark);
