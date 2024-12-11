# Storybook Tutorials

## 1. Set up React Storybook

- [스토리북 공식문서](<[text](https://storybook.js.org/docs)>)
- [스토리북 설정](https://storybook.js.org/docs/get-started/setup)

- 설치

```bash
npx storybook@latest init
```

- 실행

```bash
npm run storybook
```

### 기본 템플릿 예제 (YourComponent.stories.ts|tsx)

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { YourComponent } from "./YourComponent";

//👇 meta 객체는 해당 컴포넌트에 대한 정보를 정의, 스토리 목록에서 어떻게 표시되는지를 설정할 수 있다.
const meta: Meta<typeof YourComponent> = {
  component: YourComponent, // 컴포넌트 자체를 임력
  title: "Components/YourComponent", // 스토리북 사이드바에 그대로 출력된다. `/` 분류하는 방법

  args: { onClick: fn() }, // 액션을 입력
};

export default meta;
type Story = StoryObj<typeof YourComponent>;

export const FirstStory: Story = {
  args: {
    //👇 필요한 props를 지정해 스토리를 다르게 설정할 수 있다.
  },
};
```

- [Meta, StoryObk](https://storybook.js.org/docs/writing-stories/typescript#typing-stories-with-meta-and-storyobj)

### Typing custom args

- (참고)[https://storybook.js.org/docs/writing-stories/typescript#typing-stories-with-meta-and-storyobj]

```tsx
import type { Meta, StoryObj } from "@storybook/react";

import { Page } from "./Page";

type PagePropsAndCustomArgs = React.ComponentProps<typeof Page> & {
  footer?: string;
};

const meta: Meta<PagePropsAndCustomArgs> = {
  component: Page,
  render: ({ footer, ...args }) => (
    <Page {...args}>
      <footer>{footer}</footer>
    </Page>
  ),
};
export default meta;

type Story = StoryObj<PagePropsAndCustomArgs>;

export const CustomFooter: Story = {
  args: {
    footer: "Built with Storybook",
  },
};
```

## 2. Build a simple component

### includeStories , excludeStories

```tsx
const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
  includeStories: ["SimpleStory", "ComplexStory"], // 👈 Storybook에 표시
  excludeStories: /.*Data$/, // 👈 Storybook에 표시되지 않도록 할 때
};
```

### 포함

includeStories: `/^[A-Z]/` // 대문자로 시작하는 스토리만 포함
includeStories: `/.\*Story$/` // Story로 끝나는 스토리만 포함
includeStories: `['SimpleStory', 'ComplexStory']` // 틋정 이름으로 포함

### 제외

excludeStories: `/^[a-z]/` // 소문자로 시작하는 스토리 제외
excludeStories: `/.\*Data$/` // Data로 끝나는 스토리를 제외
excludeStories: `['simpleData', 'complexData']` // 특정이름으로 제외

## 접근성 설정

- [accessibility-testing](https://storybook.js.org/docs/writing-tests/accessibility-testing)

- 설치

```bash
npx storybook add @storybook/addon-a11y
```

- main.ts 파일에 추가

```ts
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",

    // 추가~
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
```

## 3. 복합 구성 컴포넌트

- [Decorators](https://storybook.js.org/docs/writing-stories/decorators)

```tsx
import type { Meta } from "@storybook/react";

import { YourComponent } from "./YourComponent";

const meta: Meta<typeof YourComponent> = {
  component: YourComponent,
  decorators: [
    (Story) => (
      <div style={{ margin: "3em" }}>
        {/* 👇 데코레이터 내부에서 Story를 호출하여 컴포넌트 렌더링 */}
        <Story />
      </div>
    ),
  ],
};

export default meta;
```

- 데코레이터를 사용하여 컨텍스트 제공

```tsx
export default {
  component: InboxScreen,
  title: "Components/InboxScreen",
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  tags: ["autodocs"],
};
```

## 4. 컴포넌트 테스트

#### play 함수 사용하여 테스트

- [play 함수 사용](https://storybook.js.org/docs/writing-stories/play-function)
  작업이 업데이트될 때 UI에 무슨 일이 일어나는지 확인하는 데 도움을 준다.

```bash
npm install @storybook/test @storybook/addon-interactions --save-dev
```

- [테스트 함수 문서](https://storybook.js.org/docs/writing-tests/component-testing#api-for-user-events)

- [testing-library 문서](https://testing-library.com/docs/queries/about/)

#### test-runner 사용하여 테스트

- [test-runner](https://storybook.js.org/docs/writing-tests/test-runner)

모든 스토리를 실행 가능한 테스트로 전환한다.

- 설치

```bash
npm install @storybook/test-runner --save-dev
```

- 실행

```bash
npm run test-storybook
```

## 5. 애드온

#### 컨트롤

컴포넌트의 props를 동적으로 바꿔가면서 편집할 수 있다.

<img width="560" alt="스토리북 애드온 예제사진" src="https://github.com/user-attachments/assets/f047698a-a5e3-494b-ba7f-ae989e3a5183" />

```tsx
const meta = {
  title: "Example/Button",
  component: Button,
  args: {
    onClick: action("on-click"),
  },
  parameters: {

    layout: "centered",
    action: { argTypesRegex: "^on.*" },
  },

  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: {
      control: "color",
    },
    variant: {
      control: {
        type: "radio",
      },
    },
    size: {
      options: ["sm", "md", "lg"],
      control: {
        type: "select",
      },
    },
  }
```

[controls](https://storybook.js.org/docs/essentials/controls#annotation)

### 추가로 스토리북 뭉서 테마 변경

(theming)[https://storybook.js.org/docs/configure/user-interface/theming#create-a-theme-quickstart]

```bash
npm install --save-dev @storybook/manager-api @storybook/theming

```

`.storybook / manager.ts` 생성 후 theme 설정

## 2. Design Systems for Developers

## 3. UI Testing Handbook

## 4. Visual Testing Handbook
