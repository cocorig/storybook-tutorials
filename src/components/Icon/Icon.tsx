import styled from "@emotion/styled";
import { icons, IconsType } from "../../shared";
const Svg = styled.svg<{ block?: boolean }>`
  display: ${(props) => (props.block ? "block" : "inline-block")};
  vertical-align: middle;
  shape-rendering: inherit;
  transform: translate3d(0, 0, 0);
`;

const Path = styled.path`
  fill: currentColor;
`;

type IconProps = {
  icon: IconsType;
  block?: boolean;
};
export const Icon = ({ icon, block = false, ...props }: IconProps) => {
  return (
    <Svg
      viewBox="0 0 1024 1024"
      width="20px"
      height="20px"
      block={block}
      {...props}
    >
      <Path d={icons[icon]} />
    </Svg>
  );
};
