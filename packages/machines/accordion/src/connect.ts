// import { properties } from "@react-dive-ui/properties";

// import { dom } from "./dom";

// export function connect(state: MachineState, send: MachineSend) {
//   const { context } = state;

//   return {
//     rootProps: properties.element({
//       id: dom.getRootId(context),
//       "data-part": "root",
//       "data-orientation": context.orientation,
//     }),
//     getItemProps(value: string, disabled?: boolean) {
//       return properties.element({
//         id: dom.getItemId(context, value),
//         "data-part": "item",
//         "data-disabled": disabled ? "" : undefined,
//         "data-orientation": context.orientation,
//         "data-state": context.expandedValues.includes(value)
//           ? "open"
//           : "closed",
//       });
//     },
//     getHeadingProps(value: string, disabled?: boolean) {
//       return properties.h3({
//         id: dom.getHeadingId(context, value),
//         "data-part": "heading",
//         "data-disabled": disabled ? "" : undefined,
//         "data-orientation": context.orientation,
//         "data-state": context.expandedValues.includes(value)
//           ? "open"
//           : "closed",
//       });
//     },
//     getTriggerProps(value: string, disabled?: boolean) {
//       return properties.button({
//         type: "button",
//         id: dom.getTriggerId(context, value),
//         onClick() {
//           send({ type: "ITEM.TOGGLE", value });
//         },
//         onFocus() {
//           send({ type: "TRIGGER.FOCUS", value });
//         },
//         onBlur() {
//           send({ type: "TRIGGER.BLUR" });
//         },
//         onKeyDown(ev) {
//           if (ev.key === "Home") {
//             send({ type: "TRIGGER.FOCUS.FIRST" });
//           } else if (ev.key === "End") {
//             send({ type: "TRIGGER.FOCUS.LAST" });
//           } else if (context.orientation === "vertical") {
//             if (ev.key === "ArrowUp") {
//               send({ type: "TRIGGER.FOCUS.PREV" });
//             } else if (ev.key === "ArrowDown") {
//               send({ type: "TRIGGER.FOCUS.NEXT" });
//             }
//           } else {
//             if (ev.key === "ArrowRight") {
//               send({ type: "TRIGGER.FOCUS.NEXT" });
//             } else if (ev.key === "ArrowLeft") {
//               send({ type: "TRIGGER.FOCUS.PREV" });
//             }
//           }
//         },
//         "aria-expanded": context.expandedValues.includes(value),
//         "aria-controls": dom.getPanelId(context, value),
//         "aria-disabled": context.expandedValues.includes(value) && disabled,
//         "data-part": "trigger",
//         "data-disabled": disabled ? "" : undefined,
//         "data-orientation": context.orientation,
//         "data-state": context.expandedValues.includes(value)
//           ? "open"
//           : "closed",
//       });
//     },
//     getPanelProps(value: string, disabled?: boolean) {
//       return properties.element({
//         id: dom.getPanelId(context, value),
//         role: "region",
//         "aria-labelledby": dom.getTriggerId(context, value),
//         "data-part": "panel",
//         "data-disabled": disabled ? "" : undefined,
//         "data-orientation": context.orientation,
//         "data-state": context.expandedValues.includes(value)
//           ? "open"
//           : "closed",
//       });
//     },
//   };
// }
