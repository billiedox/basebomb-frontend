import styled from "styled-components";
import { StyledMenuItemProps } from "./types";

export const StyledMenuItemContainer = styled.div<StyledMenuItemProps>`
  position: relative;

  ${({ $isActive, $variant, theme }) =>
    $isActive &&
    $variant === "subMenu" &&
    `
      &:after{
        content: "";
        position: absolute;
        bottom: 0;
        height: 4px;
        width: 100%;
        background-color: ${theme.colors.primary};
        border-radius: 2px 2px 0 0;
      }
    `};
`;

const StyledMenuItem = styled.a<StyledMenuItemProps>`
  position: relative;
  display: flex;
  align-items: center;

  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.white : theme.colors.textSubtle)};
  font-size: 14px;
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "400")};

  ${({ $statusColor, theme }) =>
    $statusColor &&
    `
    &:after {
      content: "";
      border-radius: 100%;
      background: ${theme.colors[$statusColor]};
      height: 8px;
      width: 8px;
      margin-left: 12px;
    }
  `}

  ${({ $variant }) =>
    $variant === "default"
      ? `
    padding: 0 16px;
    height: 36px;
  `
      : `
    padding: 4px 4px 0px 4px;
    height: 32px;
  `}

  &:hover {
    background: ${({ theme }) => theme.colors.tertiary};
    ${({ $variant }) => $variant === "default" && "border-radius: 30px;"};
  }
  ${({ theme, $isActive}) =>  $isActive && `
    background: ${theme.colors.tertiary};
    border-radius: 30px;
  `}
`;

export default StyledMenuItem;
