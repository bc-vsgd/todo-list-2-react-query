import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

const URL = "http://localhost:3000";

const myStore = (set) => {
  return {
    tasks: [],
    numberOfDoneTasks: 0,
    numberOfUndoneTasks: 0,
    sortTasks: null,
    GET_TASKS: ({ tasks, sortTasks }) => {
      return set((state) => {
        // console.log(tasks);
        // console.log(sortTasks);
        state.tasks = tasks;
        state.sortTasks = sortTasks;
        let done = 0;
        let undone = 0;
        for (let i = 0; i < tasks.length; i++) {
          if (tasks[i].isDone) {
            done++;
          } else undone++;
        }
        state.numberOfDoneTasks = done;
        state.numberOfUndoneTasks = undone;
      });
    },
    TOGGLE_SORT_TASKS: () => {
      return set((state) => {
        state.sortTasks = !state.sortTasks;
        // console.log("TOGGLE_TASKS: sortTasks: ", state.sortTasks);
      });
    },
  };
};

export const useTasksStore = create(devtools(immer(myStore)));
