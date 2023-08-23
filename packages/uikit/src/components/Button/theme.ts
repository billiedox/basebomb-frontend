import { scales, variants } from "./types";

export const scaleVariants = {
  [scales.MD]: {
    height: "40px",
    padding: "0 24px",
  },
  [scales.SM]: {
    height: "32px",
    padding: "0 16px",
  },
  [scales.XS]: {
    height: "20px",
    fontSize: "12px",
    padding: "0 8px",
  },
};

export const styleVariants = {
  [variants.PRIMARY]: {
    background: "linear-gradient(143deg, #CA1CE6 0%, #00C2FF 100%)",
    color: "white",
  },
  [variants.SECONDARY]: {
    backgroundColor: "secondary",
    borderColor: "white",
    boxShadow: "none",
    color: "white",
    ":disabled": {
      backgroundColor: "secondary",
    },
  },
  [variants.TERTIARY]: {
    backgroundColor: "tertiary",
    boxShadow: "none",
    color: "primary",
  },
  [variants.SUBTLE]: {
    backgroundColor: "textSubtle",
    color: "input",
  },
  [variants.DANGER]: {
    backgroundColor: "failure",
    color: "white",
  },
  [variants.SUCCESS]: {
    backgroundColor: "success",
    color: "white",
  },
  [variants.TEXT]: {
    backgroundColor: "transparent",
    color: "white",
    boxShadow: "none",
  },
  [variants.LIGHT]: {
    backgroundColor: "input",
    color: "textSubtle",
    boxShadow: "none",
  },
  [variants.OUTLINED]: {
    backgroundColor: "transparent",
    border: "1px solid white",
    color: "white",
    boxShadow: "none",
  },
};
