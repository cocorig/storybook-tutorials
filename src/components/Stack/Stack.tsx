import styled from "@emotion/styled";
import {
  vStack,
  hStack,
  stack,
  StackProps,
  FixedDirectionStackProps,
} from "../../css/stack";

export const VStack = styled.div<FixedDirectionStackProps>`
  ${vStack}
`;

export const HStack = styled.div<FixedDirectionStackProps>`
  ${hStack}
`;

export const Stack = styled.div<StackProps>`
  ${stack}
`;
