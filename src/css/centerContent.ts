import { css } from "@emotion/react";

export const centerContent = (displayType?: "inline" | "flex") => css`
  display: ${displayType === "inline" ? "inline-flex" : "flex"};
  align-items: center;
  justify-content: center;
`;
