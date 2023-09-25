import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const trigger = style({});

export const backdrop = style({
  position: "fixed",
  inset: 0,
  backgroundColor: vars.colors.alphas.black[50],
});

export const panel = style({
  position: "fixed",
  inset: "calc(50% - 10rem)",
  width: "20rem",
  backgroundColor: vars.colors.white,
});

export const close = style({});

export const title = style({});

export const description = style({});
