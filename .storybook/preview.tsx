import React from "react";
import type { Preview } from "@storybook/react";
import "../src/index.css";

import { Global, css, ThemeProvider } from "@emotion/react";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";

// Registers the msw addon
import { initialize, mswLoader } from "msw-storybook-addon";

// Initialize MSW
initialize();

const GlobalStyles = () => (
  <Global
    styles={css`
      body {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      }
    `}
  />
);
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
  },
  loaders: [mswLoader],
  decorators: [
    withThemeFromJSXProvider({
      GlobalStyles,
    }),
    // (Story) => (
    //   <>
    //     <Story />
    //   </>
    // ),
  ],
};

export default preview;
