// States
import { useTasksStore } from "../features/tasks/store";
// Components
import ButtonComp from "./ButtonComp";

const Todo = ({ task, index }) => {
  const REMOVE_TASK = useTasksStore((store) => {
    return store.REMOVE_TASK;
  });
  const TOGGLE_TASK = useTasksStore((store) => {
    return store.TOGGLE_TASK;
  });
  return (
    <div className="flex justify-between gap-x-5 border-b py-1">
      <p>{task.name}</p>
      <div className="flex w-24 justify-between">
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={() => {
            TOGGLE_TASK({ index });
          }}
        />
        <ButtonComp
          compStyle=" px-1.5 h-8"
          onClick={() => {
            REMOVE_TASK({ task, index });
          }}
        >
          X
        </ButtonComp>
      </div>
    </div>
  );
};

export default Todo;
