import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { color } from "../../shared";
import { Icon } from "../Icon";

type LinkProps = {
  containsIcon?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  nochrome?: boolean;
  inverse?: boolean;
  isButton?: boolean;
  withArrow?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const baseLinkStyles = css`
  display: inline-block;
  transition:
    transform 150ms ease-out,
    color 150ms ease-out;
  text-decoration: none;
  color: ${color.secondary};

  &:hover,
  &:focus {
    cursor: pointer;
    transform: translateY(-1px);
    color: ${color.dark};
  }

  &:active {
    transform: translateY(0);
    color: ${color.darker};
  }

  svg {
    display: inline-block;
    height: 1em;
    width: 1em;
    vertical-align: text-top;
    position: relative;
    bottom: -0.125em;
    margin-right: 0.4em;
  }
`;

const dynamicLinkStyles = (props: LinkProps) => css`
  ${props.containsIcon &&
  css`
    svg {
      height: 1em;
      width: 1em;
      vertical-align: middle;
      position: relative;
      bottom: 0;
      margin-right: 0;
    }
  `}

  ${props.secondary &&
  css`
    color: ${color.mediumdark};
    &:hover {
      color: ${color.dark};
    }
    &:active {
      color: ${color.darker};
    }
  `}

  ${props.tertiary &&
  css`
    color: ${color.dark};
    &:hover {
      color: ${color.darkest};
    }
    &:active {
      color: ${color.mediumdark};
    }
  `}

  ${props.nochrome &&
  css`
    color: inherit;
    &:hover,
    &:active {
      color: inherit;
      text-decoration: underline;
    }
  `}

  ${props.inverse &&
  css`
    color: ${color.lightest};
    &:hover {
      color: ${color.lighter};
    }
    &:active {
      color: ${color.light};
    }
  `}

  ${props.isButton &&
  css`
    border: 0;
    border-radius: 0;
    background: none;
    padding: 0;
    font-size: inherit;
  `}
`;

const StyledLink = styled.a<LinkProps>`
  ${baseLinkStyles};
  ${(props) => dynamicLinkStyles(props)};
`;

const StyledButton = styled.button<LinkProps>`
  ${baseLinkStyles};
  ${(props) => dynamicLinkStyles(props)};
`;

export const Link: React.FC<LinkProps> = ({
  isButton = false,
  withArrow = false,
  children,
  ...props
}) => {
  const Component = isButton ? StyledButton : StyledLink;

  return (
    <Component {...props}>
      {children}
      {withArrow && <Icon icon="arrowright" />}
    </Component>
  );
};
