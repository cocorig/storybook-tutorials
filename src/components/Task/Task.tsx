import { css } from "@emotion/react";

import styled from "@emotion/styled";
import { color, IconsType } from "../../shared";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Checkbox } from "../Checkbox/Checkbox";

export type TaskType = {
  id: string;
  title: string;
  state: "TASK_INBOX" | "TASK_PINNED" | "TASK_ARCHIVED";
};

export type TaskProps = {
  task: TaskType;
} & ActionType;
export type ActionType = {
  onArchiveTask: (checked: boolean, id: string) => void;
  onTogglePinTask: (state: string, id: string) => void;
  onDeleteTask: (id: string) => void;
};
export const Task = ({
  task: { state, id, title },
  onArchiveTask,
  onTogglePinTask,
  onDeleteTask,
  ...props
}: TaskProps) => {
  // const { onArchiveTask, onTogglePinTask, onDeleteTask } = useTasksContext();
  return (
    <TaskItem
      role="listitem"
      aria-label={`${id}-${title}`}
      tabIndex={0}
      {...props}
    >
      <Checkbox
        aria-label={`checked ${id}`}
        checked={state === "TASK_ARCHIVED"}
        onCheckedChange={(event) => onArchiveTask(event.target.checked, id)}
      >
        {title}
      </Checkbox>

      <TaskButton
        data-testid={`${id}-delete`}
        ariaLabel="delete"
        baseColor="#e2e8f0"
        hoverColor="#ff5151"
        icon="trash"
        onClick={() => onDeleteTask(id)}
      />

      <TaskButton
        data-testid={`${id}-bookmark`}
        baseColor="#e2e8f0"
        hoverColor="#2386f8"
        icon="bookmark"
        ariaLabel={state === "TASK_PINNED" ? "pin" : "unpin"}
        onClick={() => onTogglePinTask(state, id)}
      />
    </TaskItem>
  );
};

const TaskItem = styled.li`
  display: flex;
  align-items: center;
  border: 1px solid ${color.border};
  background-color: white;
  height: 3rem;
  overflow-wrap: break-word;

  & > label {
    padding-inline: 0.75rem;
  }
`;

type TaskButtonProps = {
  ariaLabel: string;
  baseColor: string;
  hoverColor: string;
  icon: IconsType;
  onClick?: () => void;
};

const TaskButton = ({
  ariaLabel,
  baseColor,
  hoverColor,
  icon,
  onClick,
  ...props
}: TaskButtonProps) => {
  return (
    <Button
      containsIcon
      aria-label={ariaLabel}
      onClick={onClick}
      {...props}
      css={css`
        flex: 0 0 auto;
        width: auto;
        color: ${baseColor};
        &[aria-label="pin"] {
          color: ${hoverColor};
        }

        &:hover,
        &:focus {
          box-shadow: none;
          transform: none;
          box-shadow: none;
          color: ${hoverColor};
        }
      `}
    >
      <Icon
        icon={icon}
        css={css`
          color: currentColor;
        `}
      />
    </Button>
  );
};
