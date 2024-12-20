import React from "react";
import { InboxScreen } from ".";
import { http, HttpResponse, delay } from "msw";
import { data } from "../../mocks/data";
import {
  within,
  expect,
  waitForElementToBeRemoved,
  userEvent,
  findByRole,
} from "@storybook/test";
import { Meta, StoryObj } from "@storybook/react";
import { TasksProvider } from "../../hook/useTasks";

const meta = {
  component: InboxScreen,
  title: "Components/InboxScreen",

  decorators: [(story) => <TasksProvider>{story()}</TasksProvider>],
} satisfies Meta<typeof InboxScreen>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/tasks", () => {
          return HttpResponse.json(data);
        }),
      ],
    },
  },
};

export const Error: Story = {
  args: {
    error: "Something",
  },
  parameters: {
    msw: {
      handlers: [
        http.get("/tasks", async () => {
          await delay(500);
          return new HttpResponse(null, {
            status: 403,
          });
        }),
      ],
    },
  },
};

export const ArchiveTask = {
  parameters: {
    ...Default.parameters,
  },
  play: async ({ canvasElement }) => {
    // Storybook의 canvas 영역을 선택
    const canvas = within(canvasElement);

    // 로딩 상태가 없어질 때까지 기다린다.
    await waitForElementToBeRemoved(await canvas.findByTestId("loading"));

    // listitem와 일치하는 요소를 찾으면 Promise를 반환
    const getTask = (name) => canvas.findByRole("listitem", { name });

    // "2-QA dropdown" 요소를 가져온다.
    const itemToArchive = await getTask("2-QA dropdown");
    // itemToArchive 안에서 체크박스 요소를 찾는다.
    const archiveCheckbox = (await within(itemToArchive).findByRole(
      "checkbox",
    )) as HTMLInputElement;

    // 체크박스를 클릭한다.
    await userEvent.click(archiveCheckbox);

    // 체크박스가 체크되었는지 확인한다.
    await expect(archiveCheckbox.checked).toBe(true);
  },
};

export const PinTask = {
  parameters: {
    ...Default.parameters,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const getTask = (name) => canvas.findByRole("listitem", { name });
    // "4-Export logo" 요소를 가져온다.
    const itemToPin = await getTask("4-Export logo");
    // itemToPin에서 unpin 버튼을 찾는다.
    const pinButton = await findByRole(itemToPin, "button", { name: "unpin" });
    // itemToPin를 클릭한다.
    await userEvent.click(pinButton);
    // itemToPin이  "unpin"에서 "pin"으로 변경되었는지 확인한다.
    const unpinButton = within(itemToPin).getByRole("button", {
      name: "pin",
    });
    await expect(unpinButton).toBeInTheDocument();
  },
};

export const DeleteTask = {
  parameters: {
    ...Default.parameters,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const getTask = (name) => canvas.findByRole("listitem", { name });

    const itemToDelete = await getTask("5-Fix bug in input error state");
    // itemToDelete요소에서 삭제 버튼을 찾는다.
    const deleteButton = await findByRole(itemToDelete, "button", {
      name: "delete",
    });

    // 삭제 버튼을 클릭한다.
    await userEvent.click(deleteButton);
    // listitem요소의 길이가 5개로 줄어들었는지 확인한다.
    await expect(canvas.getAllByRole("listitem").length).toBe(5);
  },
};

// export const EditTask = {
//   parameters: {
//     ...Default.parameters,
//   },
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     const getTask = (id) => canvas.findByRole("listitem", { name: id });

//     const itemToEdit = await getTask("task-5");
//     const taskInput = await findByRole(itemToEdit, "textbox");
//     await userEvent.type(taskInput, " and disabled state");
//     await expect(taskInput.value).toBe(
//       "Fix bug in input error state and disabled state",
//     );
//   },
// };
