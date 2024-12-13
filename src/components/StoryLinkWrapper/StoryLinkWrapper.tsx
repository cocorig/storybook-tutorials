import { action } from "@storybook/addon-actions";
import { ReactNode, MouseEvent } from "react";

const fireClickAction = action("onLinkClick");

type StoryLinkWrapperProps = {
  children: ReactNode;
  className?: string;
  href: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  to?: string;
};

export const StoryLinkWrapper = ({
  children,
  className,
  href,
  onClick,
  to,
  ...props
}: StoryLinkWrapperProps) => {
  const modifiedOnClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (onClick) onClick(event);
    fireClickAction(href || to);
  };

  return (
    <a className={className} href={href} onClick={modifiedOnClick} {...props}>
      {children}
    </a>
  );
};
