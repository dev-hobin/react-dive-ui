import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const trigger = style({
  color: vars.colors.black[500],
  borderRadius: 8,
  backgroundColor: vars.colors.white,
  fontSize: vars.fontSizes.lg,
  padding: "0.4em 0.8em",
  fontWeight: vars.fontWeights.medium,
  border: `1px solid ${vars.colors.gray[100]}`,

  ":hover": {
    backgroundColor: vars.colors.gray[50],
  },

  ":focus": {
    outline: `2px solid ${vars.colors.gray[200]}`,
    outlineOffset: 2,
  },
});

export const backdrop = style({
  position: "fixed",
  inset: 0,
  backgroundColor: vars.colors.alphas.black[50],
});

export const panel = style({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "20rem",
  backgroundColor: vars.colors.white,
  borderRadius: "1rem",
  padding: "1rem",
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

export const title = style({
  fontWeight: vars.fontWeights.bold,
  fontSize: vars.fontSizes["2xl"],
});

export const description = style({
  fontWeight: vars.fontWeights.medium,
  fontSize: vars.fontSizes.md,
  color: vars.colors.gray[700],
});

export const footer = style({
  marginTop: "1rem",
});
