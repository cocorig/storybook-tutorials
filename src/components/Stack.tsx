import { CSSProperties, PropsWithChildren } from "react";

// type StackProps = PropsWithChildren & {
//   orientation: "horizontal" | "vertical";
// };

// export default function Stack({
//   children,
//   orientation = "horizontal",
// }: StackProps) {
//   const orientationStyles: Record<StackProps["orientation"], CSSProperties> = {
//     horizontal: {
//       display: "flex",
//       flexDirection: "row",
//       gap: "1rem",
//     },
//     vertical: {
//       display: "flex",
//       flexDirection: "column",
//       gap: "1rem",
//     },
//   };

//   return <div style={{ ...orientationStyles[orientation] }}>{children}</div>;
// }

import styled from "@emotion/styled";
import {
  vStack,
  hStack,
  stack,
  StackProps,
  FixedDirectionStackProps,
} from "../css";

export const VStack = styled.div<FixedDirectionStackProps>`
  ${vStack}
`;

export const HStack = styled.div<FixedDirectionStackProps>`
  ${hStack}
`;

export const Stack = styled.div<StackProps>`
  ${stack}
`;
