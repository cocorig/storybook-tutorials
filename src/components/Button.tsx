import { PropsWithChildren, ReactNode } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

export interface ButtonProps {
  /** Is this the principal call to action on the page?? */
  variant: "primary" | "secondary";
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: "sm" | "md" | "lg";
  /** Optional click handler */
  onClick?: () => void;
  children: ReactNode;
}
export const centerContent = (displayType?: "inline" | "flex") => css`
  display: ${displayType === "inline" ? "inline-flex" : "flex"};
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled.button<{
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  backgroundColor?: string;
}>`
  ${centerContent("")}
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  color: white;

  /* Variant styles */
  background-color: ${({ variant, backgroundColor }) => {
    if (backgroundColor) return backgroundColor;
    return variant === "primary" ? "blue" : "gray";
  }};

  /* Size styles */
  padding: ${({ size }) => {
    switch (size) {
      case "sm":
        return "0.5rem";
      case "md":
        return "0.75rem";
      case "lg":
        return "1rem";
      default:
        return "0.75rem";
    }
  }};
`;

export const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  backgroundColor,
}: ButtonProps) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      backgroundColor={backgroundColor}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};
