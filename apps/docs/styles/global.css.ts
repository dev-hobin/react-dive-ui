import { globalStyle } from "@vanilla-extract/css";

/*
  1. Use a more-intuitive box-sizing model.
*/
globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});
/*
  2. Remove default margin
*/
globalStyle("*", {
  margin: 0,
});
/*
  3. Allow percentage-based heights in the application
*/
globalStyle("html, body", {
  height: "100%",
});
/*
  4. Add accessible line-height
*/
globalStyle("body", {
  lineHeight: 1.5,
});
/*
  5. Improve media defaults
*/
globalStyle("img, picture, video, canvas, svg", {
  display: "block",
  maxWidth: "100%",
});
/*
  6. Remove built-in form typography styles
*/
globalStyle("input, button, textarea, select", {
  font: "inherit",
});
/*
  7. Avoid text overflows
*/
globalStyle("p, h1, h2, h3, h4, h5, h6", {
  overflowWrap: "break-word",
});
