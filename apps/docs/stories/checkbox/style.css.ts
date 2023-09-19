import { vars } from "../../styles/theme.css";
import { style } from "@vanilla-extract/css";

export const controlStyle = style({
  all: "unset",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  borderRadius: "0.25rem",
  border: `1px solid ${vars.colors.gray["400"]}`,
  width: "1.25rem",
  height: "1.25rem",
  transition: "border-color, background 300ms",

  ":hover": {
    borderColor: vars.colors.blue[500],
  },

  ":focus-within": {
    boxShadow: `0 0 0 1.5px ${vars.colors.black}`,
  },

  selectors: {
    "&[data-state=checked]": {
      background: vars.colors.blue[500],
      border: `1px solid ${vars.colors.blue[500]}`,
    },
  },
});

export const iconStyle = style({
  color: vars.colors.white,
  display: "none",

  selectors: {
    [`${controlStyle}[data-state=checked] &`]: {
      display: "block",
    },
  },
});

export const labelStyle = style({
  selectors: {
    [`${controlStyle} + &`]: {
      marginLeft: "0.5rem",
    },
  },
});
