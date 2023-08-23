import { variants, scales } from "./types";

export const styleVariants = {
  [variants.ROUND]: {
    borderRadius: "15px",
    background: "#625f81",
    boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.30)"
  },
  [variants.FLAT]: {
    borderRadius: 0,
  },
};

export const styleScales = {
  [scales.MD]: {
    height: "23px",
  },
  [scales.SM]: {
    height: "8px",
  },
};

export default styleVariants;
