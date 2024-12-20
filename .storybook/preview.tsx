import React from "react";
import type { Preview } from "@storybook/react";
import GlobalStyle from "../src/shared/global";
import { initialize, mswLoader } from "msw-storybook-addon";
import { handlers } from "../src/mocks/handlers";

// Initialize MSW
initialize({ onUnhandledRequest: "bypass" }, handlers);

const preview: Preview = {
  parameters: {
    // mswLoader: {
    //   handlers: {
    //     tasks: http.get("/tasks", () => {
    //       return HttpResponse.json(data);
    //     }),
    //   },
    // },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    a11y: {
      element: "#root",
      manual: false,
    },
  },
  tags: ["autodocs"],
  loaders: [mswLoader],
  // 모든 컴포넌트에 적용할 수 있도록 preview파일에서 데코레이터 활용
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
