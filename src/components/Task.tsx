import React from "react";

type TaskProps = {
  onArchiveTask: (id: string) => void;
  onPinTask: (id: string) => void;
} & { task: TaskType };

export type TaskType = {
  id: string;
  title: string;
  state: string;
};

export const Task = ({
  task: { state, id, title },
  onArchiveTask,
  onPinTask,
  ...props
}: TaskProps) => {
  return (
    <div className={`list-item ${state}`} {...props}>
      <label
        htmlFor={`archiveTask-${id}`}
        aria-label={`archiveTask-${id}`}
        className="checkbox"
      >
        <input
          type="checkbox"
          disabled={true}
          name="checked"
          id={`archiveTask-${id}`}
          checked={state === "TASK_ARCHIVED"}
        />
        <span className="checkbox-custom" onClick={() => onArchiveTask(id)} />
      </label>

      <label htmlFor={`title-${id}`} aria-label={title} className="title">
        <input
          type="text"
          value={title}
          readOnly={true}
          name="title"
          id={`title-${id}`}
          placeholder="Input title"
        />
      </label>
      {state !== "TASK_ARCHIVED" && (
        <button
          className="pin-button"
          onClick={() => onPinTask(id)}
          id={`pinTask-${id}`}
          aria-label={`pinTask-${id}`}
          key={`pinTask-${id}`}
        >
          <span className={`icon-star`} />
        </button>
      )}
    </div>
  );
};
