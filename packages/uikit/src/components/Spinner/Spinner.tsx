import React from "react";
import styled, { keyframes } from "styled-components";
import PanIcon from "./PanIcon";
import { SpinnerProps } from "./types";


const pulse = keyframes`
  0% { transform: scale(1); }
  10% { transform: scale(1.1); }
  20% { transform: scale(1.2); }
  30% { transform: scale(1.3); }
  40% { transform: scale(1.4); }
  50% { transform: scale(1.5); }
  60% { transform: scale(1.4); }
  70% { transform: scale(1.3); }
  80% { transform: scale(1.2); }
  90% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const Container = styled.div`
  position: relative;
`;

const FloatingPanIcon = styled(PanIcon)`
// position: absolute;
top: 0;
left: 0;
animation: ${pulse} 5s linear infinite;
transform: translate3d(0, 0, 0);
`;

const Spinner: React.FC<SpinnerProps> = ({ size = 128 }) => {
  return (
    <Container>
      <FloatingPanIcon width={`${size}px`} />
    </Container>
  );
};

export default Spinner;