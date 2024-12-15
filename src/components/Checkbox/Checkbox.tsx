import { css } from "@emotion/react";
import { InputHTMLAttributes, ChangeEvent, ReactNode } from "react";
import styled from "@emotion/styled";
import { Icon } from "../Icon";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  children?: string | ReactNode;
  onCheckedChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({
  checked,
  children,

  onCheckedChange,
  ...props
}: CheckboxProps) => {
  return (
    <>
      <CheckboxLabel>
        <input
          css={[inputStyle]}
          type="checkbox"
          checked={checked}
          onChange={onCheckedChange}
          {...props}
        />
        <Box data-state={checked ? "checked" : "unchecked"}>
          {checked && <Icon icon="check" />}
        </Box>
      </CheckboxLabel>
      {children && <Text>{children}</Text>}
    </>
  );
};
const CheckboxLabel = styled.label`
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
  vertical-align: top;
`;
const Box = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 0.4rem;
  border: 1px solid lightcoral;
  padding: 0.125rem;
  cursor: pointer;
  color: white;

  &[data-state="checked"] {
    background-color: coral;
  }

  svg {
    fill: none;
    stroke: currentColor;
    stroke-width: 15px;
    stroke-linecap: round;
    stroke-linejoin: round;
    width: 100%;
    height: 100%;
  }
`;

const Text = styled.label`
  width: 100%;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  user-select: none;
  display: block;
  overflow: hidden;
  overflow-wrap: break-word;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const inputStyle = css`
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
`;
