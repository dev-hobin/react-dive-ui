import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const trigger = style({
  color: vars.colors.black[500],
  borderRadius: 8,
  boxShadow: `0px 0px 10px 0px ${vars.colors.alphas.black[50]}`,
  backgroundColor: vars.colors.white,
  fontSize: vars.fontSizes.lg,
  border: `1px solid transparent`,
  padding: "0.4em 0.8em",
  fontWeight: vars.fontWeights.medium,

  ":hover": {
    backgroundColor: vars.colors.gray[50],
  },

  ":focus": {
    outline: `2px solid ${vars.colors.gray[200]}`,
    outlineOffset: 2,
  },
});

export const panel = style({
  boxShadow: `0px 0px 10px 0px ${vars.colors.alphas.black[50]}`,
  borderRadius: 8,
  padding: "1rem",
  background: vars.colors.white,
  maxWidth: "20rem",
});

export const arrow = style({
  boxShadow: `0px 0px 10px 4px ${vars.colors.alphas.black[50]}`,
  background: vars.colors.white,
  width: 8,
  height: 8,
  rotate: "45deg",
  clipPath: "inset(-10px 0px 0px -10px)",
});

export const title = style({
  fontSize: vars.fontSizes.lg,

  selectors: {
    [`${panel} &`]: {
      paddingBottom: "0.5rem",
    },
  },
});

export const description = style({
  fontSize: vars.fontSizes.md,

  selectors: {
    [`${panel} &`]: {
      paddingBottom: "1rem",
    },
  },
});

export const close = style({
  color: vars.colors.black[500],
  borderRadius: 8,
  backgroundColor: vars.colors.white,
  fontSize: vars.fontSizes.md,
  border: `1px solid ${vars.colors.gray[100]}`,
  padding: "0.4em 0.8em",
  fontWeight: vars.fontWeights.medium,

  ":hover": {
    backgroundColor: vars.colors.gray[50],
  },

  ":focus": {
    outline: `2px solid ${vars.colors.gray[200]}`,
    outlineOffset: 2,
  },
});
