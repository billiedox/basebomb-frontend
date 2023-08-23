import React from "react";
import styled from "styled-components";
import SpadeTechIcon from "../Svg/Icons/SpadeTech";
import Text from "../Text/Text";
import Skeleton from "../Skeleton/Skeleton";
import { Colors } from "../../theme";

export interface Props {
  color?: keyof Colors;
  cakePriceUsd?: number;
  showSkeleton?: boolean;
}

const AuditLink = styled.a`
  display: flex;
  align-items: center;
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

const Audit: React.FC<Props> = ({ cakePriceUsd, color = "textSubtle", showSkeleton = true }) => {
  return cakePriceUsd ? (
    <AuditLink
      href="https://drive.google.com/file/d/1kJkVsFuK0GAysk1yOVe_Hwu6eFI39L--/view"
      target="_blank"
    >
      <SpadeTechIcon width="108px" mr="8px" />
    </AuditLink>
  ) : showSkeleton ? (
    <Skeleton width={80} height={24} />
  ) : null;
};

export default React.memo(Audit);
