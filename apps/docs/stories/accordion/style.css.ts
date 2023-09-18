import { vars } from "../../styles/theme.css";
import { style } from "@vanilla-extract/css";

export const rootStyle = style({
  borderRadius: "0.25rem",
  width: "20rem",
  backgroundColor: vars.colors.gray[100],
  boxShadow: `0 2px 10px ${vars.colors.alphas.black[50]}`,
});

export const itemStyle = style({
  overflow: "hidden",
  marginTop: "1px",

  ":first-child": {
    marginTop: 0,
    borderTopLeftRadius: "0.25rem",
    borderTopRightRadius: "0.25rem",
  },

  ":last-child": {
    borderBottomLeftRadius: "0.25rem",
    borderBottomRightRadius: "0.25rem",
  },

  ":focus-within": {
    boxShadow: `0 0 0 1.5px ${vars.colors.black}`,
    position: "relative",
    zIndex: 1,
  },
});

export const headingStyle = style({
  all: "unset",
  display: "flex",
});

export const triggerStyle = style({
  all: "unset",

  backgroundColor: vars.colors.white,
  padding: "0 1.125rem",
  height: "2.8125rem",
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: vars.fontSizes.md,
  fontWeight: vars.fontWeights.bold,
  lineHeight: vars.lineHeights.none,
  color: vars.colors.purple[800],
});

export const panelStyle = style({
  overflow: "hidden",
  fontSize: vars.fontSizes.md,
  color: vars.colors.alphas.black[800],
  backgroundColor: vars.colors.gray[50],
  padding: "1rem 1.25rem",

  selectors: {
    "&[data-state='closed']": {
      display: "none",
    },
  },
});
