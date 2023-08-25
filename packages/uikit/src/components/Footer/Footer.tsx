import React from "react";
import styled from "styled-components";
import { baseColors, darkColors, lightColors } from "../../theme/colors";
import { Flex, Box } from "../Box";
import {Text} from "../Text";
import { Link } from "../Link";
import {
  StyledFooter,
  StyledIconMobileContainer,
  StyledList,
  StyledListItem,
  StyledText,
  StyledToolsContainer,
} from "./styles";
import { FooterProps } from "./types";
import { ThemeSwitcher } from "../ThemeSwitcher";
import LangSelector from "../LangSelector/LangSelector";
import CakePrice from "../CakePrice/CakePrice";
import { LogoWithTextIcon, ArrowForwardIcon } from "../Svg";
import { Button } from "../Button";
import { Image } from "../Image";
import { useMatchBreakpoints } from "../..";
import SocialLinks from "./Components/SocialLinks";

const EarthQuake = styled.img<{ isMobile: boolean; isMd: boolean }>`
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: auto;
  width: 300px;
  opacity: ${({ isMobile, isMd }) => (isMobile || isMd ? "0" : "0.6")};
  display: ${({ isMobile, isMd }) => (isMobile || isMd ? "none" : "block")};
`;

const Bomb = styled.img<{ isMobile: boolean; isMd: boolean }>`
  position: absolute;
  bottom: ${({ isMobile, isMd }) => (isMobile || isMd ? "0" : "160px")};
  left: ${({ isMobile, isMd }) => (isMobile || isMd ? "50%" : "auto")};
  top: ${({ isMobile, isMd }) => (isMobile || isMd ? "50%" : "auto")};
  transform: ${({ isMobile, isMd }) => (isMobile || isMd ? "rotateZ(15deg) translate(-50%, -50%)" : "rotateZ(15deg)")};
  right: 50px;
  opacity: ${({ isMobile, isMd }) => (isMobile || isMd ? "0.5" : "1")};
  max-width: ${({ isMobile, isMd }) => (isMd ? "80%" : isMobile ? "120%" : "400px")};
  z-index: 1;
`;

const MenuItem: React.FC<FooterProps> = ({
  items,
  isDark,
  toggleTheme,
  currentLang,
  langs,
  setLang,
  cakePriceUsd,
  buyCakeLabel,
  ...props
}) => {
  const { isMobile, isMd } = useMatchBreakpoints();
  return (
    <StyledFooter p={["40px 16px", null, "56px 40px 32px 40px"]} {...props} justifyContent="center">
      <Flex flexDirection="column" width={["100%", null, "1200px;"]} zIndex={100}>
        <StyledIconMobileContainer display={["block", null, "none"]}>
          <Image src="/images/basebomb.png" isDark width={130} height={15} />
        </StyledIconMobileContainer>
        <Flex
          order={[1, null, 2]}
          flexDirection={["column", null, "row"]}
          justifyContent="space-between"
          alignItems="flex-start"
          mb={["42px", null, "36px"]}
        >
          <Box>
            <Box display={["none", null, "block"]}>
              <SocialLinks order={[2, null, 1]} pb={["42px", null, "32px"]} />
              <Image src="/images/basebomb.png" isDark width={160} height={17} />
              <Text mt={12}>runs on the fastest Layer2 blockchain Base</Text>
            </Box>
          </Box>
          {items?.map((item) => (
            <StyledList key={item.label}>
              <StyledListItem>{item.label}</StyledListItem>
              {item.items?.map(({ label, href, isHighlighted = false }) => (
                <StyledListItem key={label}>
                  {href ? (
                    <Link
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      color={darkColors.textSubtle}
                      bold={false}
                    >
                      {label}
                    </Link>
                  ) : (
                    <StyledText>{label}</StyledText>
                  )}
                </StyledListItem>
              ))}
            </StyledList>
          ))}
        </Flex>
      </Flex>
      <EarthQuake src="/images/earthquake.png" isMd={isMd} isMobile={isMobile} />
      <Bomb src="images/flamingbomb.png" isMd={isMd} isMobile={isMobile} />
    </StyledFooter>
  );
};

export default MenuItem;
