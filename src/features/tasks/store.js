import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

const myStore = (set) => {
  return {
    tasks: [],
    numberOfDoneTasks: 0,
    numberOfUndoneTasks: 0,
    sortTasks: null,
    lastState: null,
    ADD_TASK: (payload) => {
      return set((state) => {
        const newTasks = [...state.tasks, payload];
        state.tasks = newTasks;
        state.numberOfUndoneTasks++;
        state.lastState = true;
        // console.log("tasks: ", state.tasks);
        // console.log("done: ", state.numberOfDoneTasks);
        // console.log("undone: ", state.numberOfUndoneTasks);
      });
    },
    RESET: () => {
      return set((state) => {
        state.tasks = [];
        state.numberOfDoneTasks = 0;
        state.numberOfUndoneTasks = 0;
        // console.log("tasks: ", state.tasks);
        // console.log("done: ", state.numberOfDoneTasks);
        // console.log("undone: ", state.numberOfUndoneTasks);
      });
    },
    REMOVE_TASK: (payload) => {
      const { task, index } = payload;
      return set((state) => {
        const newTasks = [...state.tasks];
        newTasks.splice(index, 1);
        state.tasks = newTasks;
        if (task.isDone) {
          state.numberOfDoneTasks--;
        } else state.numberOfUndoneTasks--;
        // console.log("tasks: ", state.tasks);
        // console.log("done: ", state.numberOfDoneTasks);
        // console.log("undone: ", state.numberOfUndoneTasks);
      });
    },
    TOGGLE_TASK: (payload) => {
      const { index } = payload;
      return set((state) => {
        const foundTask = state.tasks[index];

        if (foundTask.isDone) {
          state.numberOfDoneTasks--;
          state.numberOfUndoneTasks++;
        } else {
          state.numberOfDoneTasks++;
          state.numberOfUndoneTasks--;
        }
        foundTask.isDone = !foundTask.isDone;

        // console.log("tasks: ", state.tasks);
        // console.log("done: ", state.numberOfDoneTasks);
        // console.log("undone: ", state.numberOfUndoneTasks);
      });
    },
    TOGGLE_SORT_TASKS: () => {
      return set((state) => {
        state.sortTasks = !state.sortTasks;
      });
    },
    UNDO_LAST_EVENT: () => {
      return set((state) => {
        const newTasks = [...state.tasks];
        if (newTasks[newTasks.length - 1].isDone) {
          state.numberOfDoneTasks--;
        } else state.numberOfUndoneTasks--;
        state.tasks = newTasks.slice(0, -1);
        state.lastState = false;
        // console.log("tasks: ", state.tasks);
      });
    },
  };
};

export const useTasksStore = create(devtools(immer(myStore)));
