# React Dive UI (...비밀리에 리빌딩 중...)

직접 만들어보는 컴포넌트 라이브러리

## Goal

- 유연하고 확장 가능하며 사용하기 편한 컴포넌트 설계에 관해 탐구하여 직접 만들어 봄으로써 컴포넌트 설계 능력을 높이는 것을 목표로 한다.
- [w3c](https://www.w3.org/WAI/ARIA/apg/patterns/) 기준 웹 접근성을 지키는 컴포넌트를 만들어본다.

## Storybook

스토리북 실행하기

```bash
pnpm install
pnpm build
cd apps/docs
pnpm preview-storybook
```

## Installation

```bash
npm install @react-dive-ui/{component}

# or

yarn add @react-dive-ui/{component}
```

> {component}는 제공하는 컴포넌트의 이름을 나타냅니다. (`@react-dive-ui/accordion`, `@react-dive-ui/dialog`, ...)

## Usage

- headless-component

```tsx
import { Accordion } from "@react-dive-ui/accordion";

const AccordionExample = () => {
  return (
    <Accordion.Provider type="single" defaultValue="value-1" collapsible>
      <Accordion.Root>
        <Accordion.ItemProvider value="value-1">
          <Accordion.Heading>
            <Accordion.Trigger>Item 1</Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>Item 1 Content</Accordion.Panel>
        </Accordion.ItemProvider>
        <Accordion.ItemProvider value="value-2" disabled>
          <Accordion.Heading>
            <Accordion.Trigger>Item 2</Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>Item 2 Content</Accordion.Panel>
        </Accordion.ItemProvider>
        <Accordion.ItemProvider value="value-3">
          <Accordion.Heading>
            <Accordion.Trigger>Item 3</Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>Item 3 Content</Accordion.Panel>
        </Accordion.ItemProvider>
      </Accordion.Root>
    </Accordion.Provider>
  );
};
```

- hook

```tsx
import { useAccordion } from "@react-dive-ui/accordion";

const AccordionExample = () => {
  const { state, apis, props } = useAccordion({
    type: "single",
    collapsible: true,
    defaultValue = "value-1",
  });

  const { rootProps, getHeadingProps, getPanelProps, getTriggerProps } = props;

  return (
    <div {...rootProps}>
      <h3 {...getHeadingProps({ value: "value-1" })}>
        <button {...getTriggerProps({ value: "value-1" })}>Item 1</button>
      </h3>
      <div {...getPanelProps({ value: "value-1" })}>Item 1 Content</div>
      <h3 {...getHeadingProps({ value: "value-2" })}>
        <button {...getTriggerProps({ value: "value-2", disabled: true })}>
          Item 2
        </button>
      </h3>
      <div {...getPanelProps({ value: "value-2" })}>Item 2 Content</div>
      <h3 {...getHeadingProps({ value: "value-3" })}>
        <button {...getTriggerProps({ value: "value-3" })}>Item 3</button>
      </h3>
      <div {...getPanelProps({ value: "value-3" })}>Item 3 Content</div>
    </div>
  );
};
```

## Inspirations

- [xstate](https://github.com/statelyai/xstate) : 상태머신을 활용한 컴포넌트 로직 추상화
- [radix-ui](https://github.com/radix-ui/primitives), [headless-ui](https://github.com/tailwindlabs/headlessui), [ark-ui](https://github.com/chakra-ui/ark), [ariakit](https://github.com/ariakit/ariakit) : 컴포넌트의 구조, 인터페이스의 모양
