import { css } from "@emotion/react";

type TransitionProps = {
  property?: string;
  duration?: string;
  timingFunction?: string;
};
export const customTransition = ({
  property,
  duration,
  timingFunction,
}: TransitionProps) => css`
  transition-property: ${property};
  transition-duration: ${duration};
  transition-timing-function: ${timingFunction};
`;
