import React from "react";
import type { Preview } from "@storybook/react";
// import '../src/index.css';
import GlobalStyle from "../src/shared/global";
import { worker } from "../src/mocks/browser";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";

// Registers the msw addon
import { initialize, mswDecorator, mswLoader } from "msw-storybook-addon";
import { handlers } from "../src/mocks/handlers";
import { http, HttpResponse } from "msw";
import { data } from "../src/mocks/data";

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
    // Storybook a11y addon configuration
    a11y: {
      // the target DOM element
      element: "#root",
      // sets the execution mode for the addon
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
