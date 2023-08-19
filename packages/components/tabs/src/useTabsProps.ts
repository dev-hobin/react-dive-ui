import type { DivePropsWithoutRef } from "@react-dive-ui/dive";
import type { UseTabsReturn } from "./useTabs";

const ARROW_KEYS = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];

export type TabsProps = {
  rootProps: DivePropsWithoutRef<"div">;
  listProps: DivePropsWithoutRef<"ol">;
  getTriggerProps: (value: string) => DivePropsWithoutRef<"button">;
  getContentProps: (value: string) => DivePropsWithoutRef<"div">;
};
export function useTabsProps(logic: UseTabsReturn): TabsProps {
  const tabs = logic;

  const state = tabs.state;
  const events = tabs.events;

  const orientation = state.orientation;
  const currentActivatedValue = state.value;

  return {
    rootProps: {
      id: state.id,
      "data-part": "root",
      "data-orientation": orientation,
    },
    listProps: {
      "data-part": "list",
      "data-orientation": orientation,
    },
    getTriggerProps: (value: string) => {
      return {
        "data-part": "trigger",
        "data-orientation": orientation,
        onClick: () => {
          events.activateTab(value);
        },
      };
    },
    getContentProps: (value: string) => {
      return {
        "data-part": "content",
        "data-orientation": orientation,
      };
    },
  };
}
