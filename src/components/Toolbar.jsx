import { useRef } from "react";
// States
import { useTasksStore } from "../features/tasks/store";
// Components
import ButtonComp from "./ButtonComp";

const Toolbar = () => {
  const taskInput = useRef();

  const { ADD_TASK, RESET, lastState, UNDO_LAST_EVENT } = useTasksStore(
    (store) => {
      return store;
    },
  );
  const handleSubmitForm = (event) => {
    event.preventDefault();
    const task = taskInput.current.value;
    if (task) {
      ADD_TASK({ name: task, isDone: false, date: new Date() });
      taskInput.current.value = "";
    }
  };

  return (
    <div className="mx-auto flex max-w-md justify-between gap-x-2 py-2 sm:max-w-xl sm:gap-x-5 md:max-w-2xl lg:max-w-4xl">
      <form onSubmit={handleSubmitForm}>
        <div className="flex gap-x-2 pb-2 sm:gap-x-3 md:gap-x-5">
          <input
            type="text"
            ref={taskInput}
            placeholder="New task"
            className="h-12 w-48 rounded-md border px-1.5 text-black"
          />
          <ButtonComp compStyle=" px-1.5 sm:w-24">Register</ButtonComp>
          {lastState && (
            <ButtonComp
              compStyle="w-24 px-1.5 sm:w-36"
              onClick={UNDO_LAST_EVENT}
            >
              Undo last event
            </ButtonComp>
          )}
        </div>
      </form>
      <div>
        <ButtonComp compStyle=" px-1.5 sm:w-24" onClick={RESET}>
          Reset
        </ButtonComp>
      </div>
    </div>
  );
};

export default Toolbar;
