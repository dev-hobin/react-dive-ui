import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const root = style({
  width: 300,
  background: vars.colors.white,
  borderRadius: 8,
});

export const list = style({
  display: "flex",
  alignItems: "center",
});

export const trigger = style({
  all: "unset",
  cursor: "pointer",
  position: "relative",

  padding: "0.5rem",
  textAlign: "center",
  fontWeight: vars.fontWeights.medium,
  color: vars.colors.purple[600],
  borderBottom: `1.5px solid ${vars.colors.gray[200]}`,

  ":first-child": {
    borderTopLeftRadius: 8,
  },

  ":last-child": {
    borderTopRightRadius: 8,
  },

  ":focus": {
    boxShadow: `0 0 0 1.5px ${vars.colors.black}`,
    position: "relative",
    zIndex: 1,
  },

  selectors: {
    [`${list} &`]: {
      flex: 1,
    },

    "&[data-state=active]": {
      borderBottomColor: vars.colors.purple[600],
    },
  },
});

export const panel = style({
  padding: "1rem",
  outline: "none",

  ":focus": {
    boxShadow: `0 0 0 1.5px ${vars.colors.black}`,
    position: "relative",
    zIndex: 1,
  },

  selectors: {
    "&[data-state=inactive]": {
      display: "none",
    },
  },
});
