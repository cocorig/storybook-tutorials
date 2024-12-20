# Storybook Tutorials

<div>
	<img src="https://img.shields.io/badge/storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white">
</div>

[스토리북 튜토리얼](https://storybook.js.org/tutorials/)을 학습하고 정리한 글입니다 :)

---

<details><summary> storybook 8.0 변경된 패키지
</summary>

- 제거

  - @storybook/addons 👉 `@storybook/manager-api` or `@storyboook/preview-api`;
  - @storybook/channel-postmessage 👉 `@storybook/channels`
  - @storybook/channel-websocket 👉 `@storybook/channels`
  - @storybook/client-api 👉 `@storybook/preview-api`
  - @storybook/core-client 👉 `@storybook/preview-api`
  - @storybook/preview-web 👉 `@storybook/preview-api`
  - @storybook/store 👉 `@storybook/preview-api`
  - @storybook/api 👉 `@storybook/manager-api`

- 기존 testing-library를 새로운 패키지로 통합
- @storybook/testing-library 👉 `@storybook/test`

</details>

<br>

🔗 [migration notes](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-storybooktesting-library-package)

<br>

## 1. Storybook for React tutorial

### Set up React Storybook

🔗 [스토리북 공식문서](https://storybook.js.org/docs) <br>
🔗 [스토리북 설정](https://storybook.js.org/docs/get-started/setup)

- 설치

```bash
npx storybook@latest init
```

- 실행

```bash
npm run storybook
```

<br>

### 기본 템플릿 예제

🔗 [How to write stories](https://storybook.js.org/docs/writing-stories) <br>
🔗 [spreadable-story-objects](https://storybook.js.org/docs/api/csf#spreadable-story-objects)

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
// Story -> YourComponent의 타입
type Story = StoryObj<typeof YourComponent>;

export const FirstStory: Story = {
  args: {
    //👇 필요한 props를 지정해 스토리를 다르게 설정할 수 있다.
  },
};
```

🔗 [Meta, StoryObk](https://storybook.js.org/docs/writing-stories/typescript#typing-stories-with-meta-and-storyobj)

<br>

### Typing custom args

🔗 [참고](https://storybook.js.org/docs/writing-stories/typescript#typing-stories-with-meta-and-storyobj)

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

<br>

### Build a simple component

#### includeStories , excludeStories

```tsx
const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
  includeStories: ["SimpleStory", "ComplexStory"], // 👈 Storybook에 표시
  excludeStories: /.*Data$/, // 👈 Storybook에 표시되지 않도록 할 때
};
```

#### 포함

includeStories: `/^[A-Z]/` 대문자로 시작하는 스토리만 포함 <br>
includeStories: `/.\*Story$/` Story로 끝나는 스토리만 포함 <br>
includeStories: `['SimpleStory', 'ComplexStory']` 틋정 이름으로 포함 <br>

#### 제외

excludeStories: `/^[a-z]/` 소문자로 시작하는 스토리 제외 <br>
excludeStories: `/.\*Data$/` Data로 끝나는 스토리를 제외 <br>
excludeStories: `['simpleData', 'complexData']` 특정이름으로 제외 <br>

<br>

### 접근성 설정

🔗 [accessibility-testing](https://storybook.js.org/docs/writing-tests/accessibility-testing)

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
    // 추가
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

<br>

### Assemble a composite component

🔗 [Decorators](https://storybook.js.org/docs/writing-stories/decorators)

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

<br>

### Component tests

#### play 함수 사용하여 테스트

<br>

🔗 [play 함수 사용](https://storybook.js.org/docs/writing-stories/play-function) <br>

작업이 업데이트될 때 UI에 무슨 일이 일어나는지 확인하는 데 도움을 준다.

```bash
npm install @storybook/test @storybook/addon-interactions --save-dev
```

🔗 [테스트 함수 문서](https://storybook.js.org/docs/writing-tests/component-testing#api-for-user-events)

🔗 [testing-library 문서](https://testing-library.com/docs/queries/about/)

<br>

#### test-runner 사용하여 테스트

🔗 [test-runner](https://storybook.js.org/docs/writing-tests/test-runner)

모든 스토리를 실행 가능한 테스트로 전환한다.

- 설치

```bash
npm install @storybook/test-runner --save-dev
```

- package.json

```json
{
  "scripts": {
    "test-storybook": "test-storybook"
  }
}
```

- 실행

```bash
npm run test-storybook
```

<br>

### 애드온

#### 컨트롤

컴포넌트의 props를 동적으로 바꿔가면서 편집할 수 있다.

<img width="560" alt="스토리북 애드온 예제사진" src="https://github.com/user-attachments/assets/f047698a-a5e3-494b-ba7f-ae989e3a5183" />

<br>

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

🔗 [controls](https://storybook.js.org/docs/essentials/controls#annotation)

<br>

### 스토리북 문서 테마 변경

🔗 [theming](https://storybook.js.org/docs/configure/user-interface/theming#create-a-theme-quickstart)

```bash
npm install --save-dev @storybook/manager-api @storybook/theming
```

`.storybook / manager.ts` 생성 후 theme 설정

<br>
<br>

## 2. Design Systems for Developers

### 글로벌 스타일 추가

여기선 `emotion` 사용했습니다.

```tsx
import { Global, css } from "@emotion/react";
import { reset } from "./reset";

const baseStyle = css`
  ${reset}
`;

const GlobalStyle = () => <Global styles={baseStyle} />;

export default GlobalStyle;
```

GlobalStyle 을 가져와 preview 파일에 import 한다.
모든 컴포넌트에 적용할 수 있도록 데코레이터 활용해 적용한다.

```tsx
const preview: Preview = {
  //..

  decorators: [
    (Story) => (
      <>
        <GlobalStyle />
        <Story />
      </>
    ),
  ],
};

export default preview;
```

<br>

### 폰트 태그 추가

스토리북에서 설정하는 쉬운 방법으로 `.storybook/preview-head-html` 파일을 생성해 직접 link 태그를 추가하는 방법이다.

<br>

### 애드온 인터렉션 (interaction)

`play 함수`를 사용하여 컴포넌트가 어떻게 동작하는지, 사용자 개입이 필요했던 `시나리오를 테스트`할 수 있다.

```bash
npm install @storybook/test @storybook/addon-interactions --save-dev
```

play 함수는 스토리가 렌더링을 마치면 실행되는 된다.

🔗 [play-function](https://storybook.js.org/docs/writing-stories/play-function) <br>
🔗 [API for user-events](https://storybook.js.org/docs/writing-tests/component-testing#api-for-user-events) <br>
🔗 [official user-event docs](https://testing-library.com/docs/user-event/utility/) <br>

<br>

### 단위 테스트

단위 테스트는 입력이 주어졌을 때 특정 기능이 올바른 출력을 갖는지 확인한다.

#### Testing Library로 테스트 작성하기

🔗 [testing-library](https://testing-library.com/)

```bash
 npm i @testing-library/react
```

<br>

### MDX를 사용해 개별 페이지 설정

예를 들어 `src/Intro.mdx`에 페이지를 생성하면 main.ts에서 파일 경로를 설정해주면 된다.
이렇게 하면 맨 위에 나타나는 걸 볼 수 있다.

```ts
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../src/Intro.mdx", 👈👈
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [".."],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
export default config;
```

<br>
<br>

## 3. UI Testing Handbook

### UI에서 테스트 가능한 요소

- `시각적 요소` <br>
  컴포넌트가 props 및 상태에 대해 올바르게 렌더링 되는지 확인한다.
  모든 컴포넌트의 스크린샷을 찍은 뒤 commit 단위에서 이전과 변경사항을 비교해 식별한다.
- `구성 요소` <br>
  컴포넌트들의 데이터 흐름을 확인한다.

- `상호작용` <br>
  이벤트가 의도한 대로 처리되는지 검증하는 작업한다.
  컴포넌트를 분리해 렌더링 한 다음, 클릭이나, 사용자 동작을 시뮬레이션한다.
  마지막으로 상태가 올바르게 업데이트되었는지 확인한다.

- `접근성` <br>
  접근성 테스트는 시각장애, 청각장애 등 다양한 장애와 관련된 사용성을 확인한다.
  접근성에 위반하는 요소를 확인해 해결할 수 있다.

- `사용자 흐름` <br>
  사용자가 여러 컴포넌트에 걸쳐 일련의 단계를 완료해야 할 때 Cypress 및 Playwright와 같은 도구를 사용하면 전체 애플리케이션에 대해 테스트를 실행하여 이러한 상호작용을 확인할 수 있다.

<br>

### WorkFlow

<img width="578" src="https://github.com/user-attachments/assets/bf2a3e59-5ab2-4743-b8cd-592b3b20ce27" />

1. `Storybook` : props와 모의 테이터를 사용해 테스트 케이스 작성
2. `Chromatic` : 시각적 요소 버그 확인
3. `Jest`와 `Testing Library` : 상호작용 테스트
4. `Axe` : 접근성 검사
5. `Cypress` : e2e 테스트 코드를 작성해 사용자 흐름 검증
6. `GitHub Actions` : 자동으로 테스트를 실행

🔗 [ui-testing-guide-code](https://github.com/chromaui/ui-testing-guide-code/tree/main/.storybook)

<br>

### Visual testing in Storybook

실제 브라우저에서 스토리(story)의 이미지 스냅샷을 캡처하고 비교하여 버그를 포착해 UI의 변경 사항을 파악한다.

<br>

#### workflow

1. 컴포넌트 분리 : 한 번에 한 컴포넌트 씩 테스트
2. 테스트 케이스 작성 : 각 state는 props 및 Mock Data를 사용하여 재현
3. 수동으로 확인 : 각 테스트 케이스의 모양을 수동으로 확인
4. UI 버그를 자동으로 캡쳐 : 각 테스트 케이스를 스냅샷을 캡쳐한 뒤 이전과 비교하며 확인

(데이터, 백엔드, API)에서 UI를 분리하여 각 state를 개별적으로 확인할 수 있다.

<br>

#### 테스트 케이스 작성

스토리북에서 테스트 케이스를 스토리라고 한다. 스토리는 컴포넌트가 실제 브라우저에서 렌더링 된 상태를 보여준다.

Task 컴포넌트에서 기본 상태, 고정되었을 때, 완료되었을 때, 이 세가지의 Mock Data를 만들어 스토리를 추가해야 한다.

```tsx
import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Task } from ".";
import { actionsData } from "../../utils/actionData";

const meta = {
  title: "Components/Task",
  component: Task,
  args: { ...actionsData },
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    task: {
      id: "1",
      title: "Buy milk",
      state: "TASK_INBOX",
    },
  },
};

export const Pinned: Story = {
  args: {
    task: {
      id: "2",
      title: "QA dropdown",
      state: "TASK_PINNED",
    },
  },
};
const longTitleString = `This task's name is absurdly large. In fact, I think if I keep going I might end up with content overflow. What will happen? The star that represents a pinned task could have text overlapping. The text could cut-off abruptly when it reaches the star. I hope not!`;

export const Archived: Story = {
  args: {
    task: {
      id: "3",
      title: "Write schema for account menu",
      state: "TASK_ARCHIVED",
    },
  },
};

export const LongTitle: Story = {
  args: {
    task: {
      ...Default.args.task,
      title: longTitleString,
    },
  },
};
```

그럼 다음과 같은 스토리가 보여진다.

<img width="602"  src="https://github.com/user-attachments/assets/c13b0a7f-7f27-4aca-83b0-78df9a843712" />

<br>

### Actions addon

```ts
import { fn } from "@storybook/test";

export const actionsData = {
  onTogglePinTask: fn(),
  onArchiveTask: fn(),
  onDeleteTask: fn(),
};
```

스토리에서 이벤트 핸들러 인수를 통해 수신된 데이터를 표시하는 데 사용된다.

Actions args를 줄여서 스토리에서 args로 제공한다.

이 args를 얻는 방법 중 `@storybook/test`에서 fn 함수 이용할 수 있는데`fn()`은 컴포넌트의 이벤트 핸들러가 사용자의 상호작용 또는 play 함수로 인해 호출될 때 해당 핸들러가 올바른 인수를 받았는지 Storybook UI의 작업 패널에서 확인할 수 있다.

🔗 [Actions](https://storybook.js.org/docs/essentials/actions) <br>
🔗 [UI 버그를 자동으로 찾아내는 방법 알아보기](https://storybook.js.org/tutorials/ui-testing-handbook/react/ko/visual-testing/)

- 그다음 해야 할 것
  - 자동으로 이전과 비교하기
  - 크로마틱 설정
  - 테스트 실행하기

이렇게 테스트하면 하나의 버그가 여러 개의 버그로 늘어나는 것을 방지할 수 있다.

<br>

### Testing composite components

간단한 컴포넌트로 구성된 복합 (Composite) 컴포넌트에 대해 테스트를 실행해 `전체적으로 작동하는지` 확인할 수 있다.

이번엔 Task 컴포넌트를 포함하는 TaskList 컴포넌트로 스토리를 만들어 보자.

- 만들어야 할 스토리
  - 핀 버튼을 누르면 목록에서 맨 위로 이동.
  - 로딩 중 일 때
  - 아무런 일정이 없을 때

먼저 TaskList 컴포넌트는 TasksContext를 통해 데이터를 제공받아야 하므로, Storybook에서 decorators를 사용해 mock Context를 제공해야 한다.

```tsx
// TaskList.stories.tsx

import { Meta, StoryObj } from "@storybook/react";
import Task, { Default as TaskDefault } from "../Task/Task.stories";

import React from "react";
import { TasksContext } from "../../hook/useTasks";
import { TaskList } from "./TaskList";

export const mockedState = {
  tasks: [
    { id: "1", state: "TASK_INBOX", title: "Build a date picker" },
    { id: "2", state: "TASK_INBOX", title: "QA dropdown" },
    {
      id: "3",
      state: "TASK_INBOX",
      title: "Write a schema for account avatar component",
    },
    { id: "4", state: "TASK_INBOX", title: "Export logo" },
    { id: "5", state: "TASK_INBOX", title: "Fix bug in input error state" },
    {
      id: "6",
      state: "TASK_INBOX",
      title: "Draft monthly blog to customers",
    },
  ],
  error: null,
  loading: false,
  dispatch: () => {},
};

const Mockstore = ({ taskboxState, children }) => (
  <TasksContext.Provider value={{ ...taskboxState }}>
    {children}
  </TasksContext.Provider>
);

const meta = {
  title: "Components/TaskList",
  component: TaskList,
  args: {
    ...Task.args,
  },
  decorators: [
    (story) => <Mockstore taskboxState={mockedState}>{story()}</Mockstore>,
  ],

  excludeStories: /.*mockedState$/,
} satisfies Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * WithPinnedTasks
 */
export const WithPinnedTasks: Story = {
  decorators: [
    (story) => {
      const pinnedtasks = [
        ...mockedState.tasks.slice(0, 5),
        { id: "6", title: "Task 6 (pinned)", state: "TASK_PINNED" },
      ];

      return (
        <Mockstore
          taskboxState={{
            ...mockedState,
            tasks: pinnedtasks,
          }}
        >
          {story()}
        </Mockstore>
      );
    },
  ],
};

/**
 * Loading
 */
export const Loading: Story = {
  decorators: [
    (story) => (
      <Mockstore
        taskboxState={{
          ...mockedState,
          loading: true,
        }}
      >
        {story()}
      </Mockstore>
    ),
  ],
};
/**
 * Empty
 */
export const Empty: Story = {
  decorators: [
    (story) => (
      <Mockstore
        taskboxState={{
          ...mockedState,
          tasks: [],
        }}
      >
        {story()}
      </Mockstore>
    ),
  ],
};
```

<br>

### 상태를 가지는 (Stateful) 복합 컴포넌트

스토리북 애드온을 사용해 컨텍스트, 프로바이더(provider) 및 컴포넌트가 의존하는 모든 것을 모의할 수 있다.

TaskList 컴포넌트를 포함하는 InboxScreen 컴포넌트의 경우 [Mock Service Worker(MSW)](https://github.com/mswjs/msw-storybook-addon) 애드온을 사용해 Mocking된 응답 값을 반환해 보자.

- MSW 및 애드온 설치

```bash
npm install msw msw-storybook-addon
```

- MSW 생성

```bash
npx msw init public/
```

- .storybook/preview.ts에서 애드온 설정

```ts
import { initialize, mswLoader } from "msw-storybook-addon";

// Initialize MSW
initialize();

const preview = {
  parameters: {
    //..
  },
  loaders: [mswLoader],
};

export default preview;
```

<br>

### request handlers 작성

`/tasks`와 같은 요청을 모의해야 한다면 preview 파일에서 MSW 핸들러를 설정해야 한다.

msw-storybook-addon으로 MSW를 시작하는데 `initialize` 함수는 MSW의 옵션을 설정하고 Storybook에서 사용할 초기 핸들러를 등록한다.

```
initialize(options?: InitializeOptions, initialHandlers?: RequestHandler[]): SetupWorker
```

```tsx
import { handlers } from "../src/mocks/handlers";
import { initialize, mswLoader } from "msw-storybook-addon";

initialize({ onUnhandledRequest: "bypass" }, handlers);

const preview = {
  parameters: {
    //..
  },

  loaders: [mswLoader],
};

export default preview;
```

이렇게 설정이 완료되면 Mock Data를 제공해 테스트할 수 있다.
또한 아래의 예시 코드와 같이 paly 함수를 이용해 사용자 개입 없이 시나리오를 테스트할 수 있다.

```tsx
// InboxScreen.stories.tsx
import React from "react";
import { InboxScreen } from ".";
import { http, HttpResponse, delay } from "msw";
import { data } from "../../mocks/data";
import {
  within,
  expect,
  waitForElementToBeRemoved,
  userEvent,
  findByRole,
} from "@storybook/test";
import { Meta, StoryObj } from "@storybook/react";
import { TasksProvider } from "../../hook/useTasks";

const meta = {
  component: InboxScreen,
  title: "Components/InboxScreen",

  decorators: [(story) => <TasksProvider>{story()}</TasksProvider>],
} satisfies Meta<typeof InboxScreen>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/tasks", () => {
          return HttpResponse.json(data);
        }),
      ],
    },
  },
};

export const Error: Story = {
  args: {
    error: "Something",
  },
  parameters: {
    msw: {
      handlers: [
        http.get("/tasks", async () => {
          await delay(500);
          return new HttpResponse(null, {
            status: 403,
          });
        }),
      ],
    },
  },
};

export const ArchiveTask = {
  parameters: {
    ...Default.parameters,
  },
  play: async ({ canvasElement }) => {
    // Storybook의 canvas 영역을 선택
    const canvas = within(canvasElement);

    // 로딩 상태가 없어질 때까지 기다린다.
    await waitForElementToBeRemoved(await canvas.findByTestId("loading"));

    // listitem와 일치하는 요소를 찾으면 Promise를 반환
    const getTask = (name) => canvas.findByRole("listitem", { name });

    // "2-QA dropdown" 요소를 가져온다.
    const itemToArchive = await getTask("2-QA dropdown");
    // itemToArchive 안에서 체크박스 요소를 찾는다.
    const archiveCheckbox = (await within(itemToArchive).findByRole(
      "checkbox",
    )) as HTMLInputElement;

    // 체크박스를 클릭한다.
    await userEvent.click(archiveCheckbox);

    // 체크박스가 체크되었는지 확인한다.
    await expect(archiveCheckbox.checked).toBe(true);
  },
};

export const PinTask = {
  parameters: {
    ...Default.parameters,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const getTask = (name) => canvas.findByRole("listitem", { name });
    // "4-Export logo" 요소를 가져온다.
    const itemToPin = await getTask("4-Export logo");
    // itemToPin에서 unpin 버튼을 찾는다.
    const pinButton = await findByRole(itemToPin, "button", { name: "unpin" });
    // itemToPin를 클릭한다.
    await userEvent.click(pinButton);
    // itemToPin이  "unpin"에서 "pin"으로 변경되었는지 확인한다.
    const unpinButton = within(itemToPin).getByRole("button", {
      name: "pin",
    });
    await expect(unpinButton).toBeInTheDocument();
  },
};

export const DeleteTask = {
  parameters: {
    ...Default.parameters,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const getTask = (name) => canvas.findByRole("listitem", { name });

    const itemToDelete = await getTask("5-Fix bug in input error state");
    // itemToDelete요소에서 삭제 버튼을 찾는다.
    const deleteButton = await findByRole(itemToDelete, "button", {
      name: "delete",
    });

    // 삭제 버튼을 클릭한다.
    await userEvent.click(deleteButton);
    // listitem요소의 길이가 5개로 줄어들었는지 확인한다.
    await expect(canvas.getAllByRole("listitem").length).toBe(5);
  },
};
```

🔗 [Play function](https://storybook.js.org/docs/writing-stories/play-function)

<br>

### User Flow 테스트하기

전체적인 흐름을 검증하고 문제를 파악하려면 E2E(End-to-End) UI 테스트가 필요하다.

이 튜토리얼에서는 모의 벡엔드와 Cypress를 사용해 E2E 테스트를 수행한다.

1. 설정: 앱을 실행하고 모의 네트워크를 요청
2. 실행 : Cypress를 사용해 페이지를 방문하고 상호 작용을 시뮬레이션
3. 명령(선언)을 실행 : UI가 올바르게 업데이트되었는지 확인

<br>

### Cypress 설정

- 설치

```bash
npm install cypress --save-dev
```

- 실행

```bash
 npx cypress open
```

- 설정

```json
{
  "scripts": {
    "cypress": "cypress open"
  }
}
```

이제 실행하면 모든 테스트 파일이 보관될 cypress 폴더가 추가된다.

- cypress.config.js 파일 설정

```ts
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:6006/",
  },
});
```

🔗 [cypress-docs](https://docs.cypress.io)

<br>

### 인증 플로우 테스트하기

로그인 페이지로 이동 후 로그인 폼을 입력한다. 인증이 완료되면 사용자는 Task목록을 볼 수 있다.

- 시나리오

1. 테스트할 주소로 브라우저를 열어 이메일과 비밀번호 필드를 찾아 설정한 값으로 채운다.
2. 제출 버튼을 클릭한다.
3. 인증을 성공하면 사용자에게 Task 목록을 보여준다.

이렇게 인증 작업을 체크한다.

```ts
// cypress/e2e/auth.cy.ts

describe("The Login Page", () => {
  // 각 테스트가 실행되기 전에 실행되는 설정
  beforeEach(() => {
    // POST 요청이 /authenticate에 들어오면 모의 인증으로 반환
    cy.intercept("POST", "/authenticate", {
      statusCode: 201,
      body: {
        user: {
          name: "Alice Carr",
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", // 토큰
        },
      },
    });

    // GET 요청이 /tasks에 들어오면  목록을 반환
    cy.intercept("GET", "/tasks", {
      statusCode: 201,
      body: {
        tasks: [
          { id: "1", state: "TASK_INBOX", title: "Build a date picker" },
          { id: "2", state: "TASK_INBOX", title: "QA dropdown" },
          {
            id: "3",
            state: "TASK_INBOX",
            title: "Write a schema for account avatar component",
          },
          { id: "4", state: "TASK_INBOX", title: "Export logo" },
          {
            id: "5",
            state: "TASK_INBOX",
            title: "Fix bug in input error state",
          },
          {
            id: "6",
            state: "TASK_INBOX",
            title: "Draft monthly blog to customers",
          },
        ],
      },
    });
  });

  it("user can authenticate using the login form", () => {
    // 테스트할 이메일과 비밀번호
    const email = "alice.carr@test.com";
    const password = "k12h1k0$5;lpa@Afn";

    // 특정 페이지로 이동 (스토리북 iframe )
    cy.visit("iframe.html?viewMode=story&id=components-page--default");

    // 이메일 입력 필드에 이메일을 입력
    cy.get("#email").type(email);
    // 비밀번호 입력 필드에 비밀번호를 입력
    cy.get("#password").type(`${password}`);

    // 로그인 버튼을 클릭
    cy.get("button[type=submit]").click();

    // 로그인 후 작업 목록 UI에 항목 6개가 있는지 확인
    cy.get('[aria-label="tasks"] li').should("have.length", 6);
  });
});
```

작성 후 cypress를 실행하면 된다.

- [cy.intercept](https://docs.cypress.io/api/commands/intercept)
  : 네트워크 요청을 가로채고, Mock Data로 대응할 수 있게 해주는 메서드이다.
- [cy.visit](https://docs.cypress.io/api/commands/origin#Navigating-to-secondary-origin-with-cyvisit)
  : 주어진 url로 이동해 해당 페이지를 로드한다.

- [cy.get](https://docs.cypress.io/api/commands/get#cyget-in-the-within-command)
  : 주어진 선택자로 dom에서 요소를 찾는다. 찾은 요소를 여러 액션을 수행해 테스트할 수 있다.
- beforeEach : 각 테스트가 실행되기 전에 실행되는 코드 블록이다.

- [should](https://docs.cypress.io/api/commands/should#__docusaurus_skipToContent_fallback)
  : 선택한 요소에 대해 특정 조건을 확인하는 명령어.

### [깃허브(Github) 액션으로 UI 테스트 자동화하기](https://storybook.js.org/tutorials/ui-testing-handbook/react/ko/automate/)

CI(Continuous Integration) 서버를 사용하여 매 코드가 push될 때마다 자동으로 전체 테스트 세트를 수행한다.

### [테스팅 작업 흐름(workflow)](https://storybook.js.org/tutorials/ui-testing-handbook/react/ko/workflow/)

<br>
<br>

## 4. Visual Testing Handbook

ui를 별도로 빌드 하는 이유?

- 컴포넌트와 상태가 많아질수록, 컴포넌트가 올바르게 렌더링 되는지 확인하는 게 점점 어려워진다.
  각 컴포넌트의 상태에 독립적으로 집중해 각각 variation을 개별적으로 테스트할 수 있고, mocking을 통해 복잡한 케이스들을 재현할 수 있다.

<br>

### 컴포넌트 설계를 위한 테스트 주도(test-driven) 작업 흐름(workflow)

<br>

#### Test-driven development

주요 핵심 개념은 테스트 중인 기능을 개발하기 전에 테스트를 작성하는 것이다.
테스트 주도 방법론(TDD)를 통해 사용자는 정확한 입력값의 측면에서 어떤 코드가 필요한지 명확하게 파악할 수 있게 된다.
하지만, UI 개발을 할 때는 TDD와 잘 맞진 않는다. 테스트를 미리 정의하기 어렵고, 모듈을 분리하기 어렵기 때문이다. 이러한 단점은 컴포넌트를 개별적으로 분리해 시각적 테스트를 함으로써 해결할 수 있다.

<br>

### 시각적 테스트의 작업 흐름(workflow)

```
test do
  setup
  execute 👈 실행단계: 스토리 테스트 작성해 확인하는 주기
  verify 👈 확인단계: 눈으로 확인하는 단계
  teardown
end
```

시각적 테스트 케이스를 작성하려면 `컴포넌트와 관련된 상태`에 대해 짚고 넘어가야 한다.
이것을 스토리북 용어로 `story`라고 한다.
컴포넌트를 변화시키는 코드를 작성하는 것 또한 미리 입력값을 작성하고 시각적으로 출력값을 확인하기만 하면 되므로, 자연스럽게 테스트 주도 방법론 식으로 ui를 설계할 수 있다.

<br>

### 시각적 테스트 주도(test-driven) 개발 배워보기

1. `시각적 테스트 케이스 구축`
   컴포넌트 작성, 테스트할 스토리 파일 생성 후 테스트 케이스 작성
2. `스토리북 테스트 검토`
   작성 후, 스토리북을 시작해 의도대로 렌더링 되는지 확인
3. `구현 구축`
   각각 state나 props에 따라 달라지는지 확인
4. `디자인에 대한 구현 검토`
   컴포넌트가 스토리북에서 어떻게 보이는지 검토
5. `반복`

<br>

### [How to test UIs with Storybook](https://storybook.js.org/docs/writing-tests)

[Component tests](https://storybook.js.org/docs/writing-tests/component-testing)
: 사용자 동작을 시뮬레이션해 UI 및 컴포넌트가 올바르게 업데이트되는지 확인

[Visual tests](https://storybook.js.org/docs/writing-tests/visual-testing)
: 이전 버전과 비교하며 시각적 변화 식별

[Accessibility tests](https://storybook.js.org/docs/writing-tests/accessibility-testing) : 접근성 테스트

[Test runner](https://storybook.js.org/docs/writing-tests/test-runner): 모든 스토리를 실행 가능한 테스트로 전환해 실행

[Test coverage](https://storybook.js.org/docs/writing-tests/test-coverage)

[Stories in end-to-end tests](https://storybook.js.org/docs/writing-tests/import-stories-in-tests/stories-in-end-to-end-tests): 실제 사용자 시나리오를 시뮬레이션

[Unit tests](https://storybook.js.org/docs/writing-tests/import-stories-in-tests/stories-in-unit-tests) : 기능을 위한 테스트
