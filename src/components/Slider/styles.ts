import { Text } from "@pancakeswap/uikit";
import { InputHTMLAttributes } from "react";
import styled from "styled-components";

interface SliderLabelProps {
  progress: string;
}

interface StyledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isMax: boolean;
}

interface DisabledProp {
  disabled?: boolean;
}

const getCursorStyle = ({ disabled = false }: DisabledProp) => {
  return disabled ? "not-allowed" : "cursor";
};

const getBaseThumbStyles = ({
  // isMax,
   disabled }: StyledInputProps) => `
  -webkit-appearance: none;
  background-color: #FBAB34;
  border: 0;
  cursor: ${getCursorStyle};
  width: 18px;
  height: 18px;
  border-radius: 9px;
  filter: ${disabled ? "grayscale(100%)" : "none"};
  transform: translate(0px, -2px);
  transition: 200ms transform;

  &:hover {
    transform: ${disabled ? "scale(1) translate(0px, -2px)" : "scale(1.1) translate(0px, -2px)"};
  }
`;

export const SliderLabelContainer = styled.div`
  bottom: 0;
  position: absolute;
  left: 14px;
  width: calc(100% - 30px);
`;

export const SliderLabel = styled(Text)<SliderLabelProps>`
  bottom: 0;
  font-size: 12px;
  left: ${({ progress }) => progress};
  position: absolute;
  text-align: center;
  min-width: 24px; // Slider thumb size
`;

export const BunnyButt = styled.div<DisabledProp>`
  height: 10px;
  filter: ${({ disabled }) => (disabled ? "grayscale(100%)" : "none")};
  position: absolute;
  top: 9px;
  left: 8px;
  width: 10px;
  border-radius: 8px;
  background-color: #FBAB34;
`;

export const BunnySlider = styled.div`
  position: absolute;
  left: 8px;
  width: calc(100% - 16px);
`;

export const StyledInput = styled.input<StyledInputProps>`
  cursor: ${getCursorStyle};
  height: 32px;
  position: relative;

  ::-webkit-slider-thumb {
    ${getBaseThumbStyles}
  }

  ::-moz-range-thumb {
    ${getBaseThumbStyles}
  }

  ::-ms-thumb {
    ${getBaseThumbStyles}
  }
`;

export const BarBackground = styled.div<DisabledProp>`
  background-color: ${({ theme, disabled }) => theme.colors[disabled ? "textDisabled" : "inputSecondary"]};
  height: 2px;
  position: absolute;
  top: 14px;
  width: 100%;
`;

export const BarProgress = styled.div<DisabledProp>`
  background-color: ${({ theme }) => theme.colors.primary};
  filter: ${({ disabled }) => (disabled ? "grayscale(100%)" : "none")};
  height: 6px;
  position: absolute;
  top: 11px;
  left: 4px;
`;
