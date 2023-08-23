import React from "react";
import styled from "styled-components";
import { Variant, variants } from "./types";
import { Image } from "../../../../components/Image";
import { BinanceChainIcon, CronosIcon, RefreshIcon, WalletFilledIcon, WarningIcon } from "../../../../components/Svg";
import { Colors } from "../../../../theme/types";

const MenuIconWrapper = styled.div<{ borderColor: keyof Colors }>`
  align-items: center;
  border-style: solid;
  // border-width: 2px;
  display: flex;
  height: 40px;
  justify-content: center;
  left: 0;
  position: absolute;
  top: -4px;
  width: 40px;
  z-index: 102;
`;

const ProfileIcon = styled(Image)`
  left: 0;
  position: absolute;
  top: -4px;
  z-index: 102;

  & > img {
    border-radius: 50%;
  }
`;

export const NoProfileMenuIcon: React.FC = () => (
  <MenuIconWrapper borderColor="primary">
    <BinanceChainIcon color="primary" width="24px" />
  </MenuIconWrapper>
);

export const PendingMenuIcon: React.FC = () => (
  <MenuIconWrapper borderColor="secondary">
    <RefreshIcon color="secondary" width="24px" spin />
  </MenuIconWrapper>
);

export const WarningMenuIcon: React.FC = () => (
  <MenuIconWrapper borderColor="warning">
    <WarningIcon color="warning" width="24px" />
  </MenuIconWrapper>
);

export const DangerMenuIcon: React.FC = () => (
  <MenuIconWrapper borderColor="failure">
    <WarningIcon color="failure" width="24px" />
  </MenuIconWrapper>
);

const MenuIcon: React.FC<{ avatarSrc?: string; variant: Variant }> = ({ avatarSrc, variant }) => {
  return <NoProfileMenuIcon />;
};

export default MenuIcon;
