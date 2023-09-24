import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const group = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const item = style({
  display: "flex",
  alignItems: "baseline",
});

export const radio = style({
  all: "unset",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexBasis: "1.5rem",
  width: "1.5rem",
  height: "1.5rem",
  borderRadius: "50%",
  backgroundColor: vars.colors.white,
  boxShadow: `0 2px 2px 2px ${vars.colors.alphas.black[200]}`,

  selectors: {
    [`${item} &`]: {
      marginRight: "0.5rem",
    },

    "&:hover, &:focus": {
      borderColor: vars.colors.gray["500"],
    },

    "&:focus": {
      outline: "2px solid black",
      outlineOffset: "2px",
    },

    "&[data-state=checked]": {
      borderColor: vars.colors.blue["500"],
      backgroundColor: vars.colors.blue["500"],
    },
  },
});

export const indicator = style({
  display: "block",

  width: "50%",
  height: "50%",
  borderRadius: "50%",

  selectors: {
    "&[data-state=checked]": {
      backgroundColor: vars.colors.white,
    },
  },
});

export const label = style({
  fontSize: vars.fontSizes.lg,
});

export const hiddenInput = style({});
