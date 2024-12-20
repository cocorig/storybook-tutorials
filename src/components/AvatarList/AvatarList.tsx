import styled from "@emotion/styled";
import { Avatar } from "../Avatar/Avatar";
import { color, typography } from "../../shared";

type AvatarListProps = {
  loading?: boolean;
  users: { id: string; avatarUrl: string; name: string }[];
  userCount?: number;
  size?: "tiny" | "small" | "medium" | "large";
};
export const AvatarList = ({
  loading,
  users,
  userCount,
  size,
  ...props
}: AvatarListProps) => {
  const count = userCount || users.length;
  return (
    <Users aria-label="users" {...props}>
      {users.slice(0, 3).map(({ id, name, avatarUrl }) => (
        <User key={id}>
          <UserAvatar
            size={size}
            username={name}
            src={avatarUrl}
            loading={loading}
          />
        </User>
      ))}
      {count > 3 && (
        <UserEllipses aria-label={`${count - 3} more user(s)`}>
          &#43; {count - 3}{" "}
        </UserEllipses>
      )}
    </Users>
  );
};

const UserAvatar = styled(Avatar)`
  box-shadow: ${color.lightest} 0 0 0 2px;
  display: block;
`;

const UserEllipses = styled.li`
  display: inline-flex;
  font-size: ${typography.size.s1}px;
  color: ${color.mediumdark};
  margin-left: 6px;
  white-space: nowrap;
`;

const User = styled.li`
  display: inline-flex;
`;

const Users = styled.ul`
  display: inline-flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  vertical-align: top;
  margin: 0;
  padding: 0;
  list-style: none;

  & > li {
    position: relative;

    &:not(:first-child) {
      margin-left: -6px;
    }
    &:nth-child(1) {
      z-index: 3;
    }
    &:nth-child(2) {
      z-index: 2;
    }
    &:nth-child(3) {
      z-index: 1;
    }
  }
`;
