import { css } from "@emotion/react";

export const hideScrollbars = css`
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;
