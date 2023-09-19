# React Dive UI

직접 만들어보는 디자인 시스템

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

## Inspirations

- [xstate](https://github.com/statelyai/xstate) : 상태머신을 활용한 컴포넌트 로직 추상화
- [radix-ui](https://github.com/radix-ui/primitives), [headless-ui](https://github.com/tailwindlabs/headlessui), [ark-ui](https://github.com/chakra-ui/ark), [ariakit](https://github.com/ariakit/ariakit) : 컴포넌트의 구조, 인터페이스의 모양
