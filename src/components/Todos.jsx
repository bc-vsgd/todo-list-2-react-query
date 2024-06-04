// States
import { useTasksStore } from "../features/tasks/store";
// Components
import Todo from "./Todo";
import ButtonComp from "./ButtonComp";

const Todos = () => {
  const { tasks, sortTasks, TOGGLE_SORT_TASKS } = useTasksStore((store) => {
    return store;
  });

  return (
    <div className="mx-auto max-w-md border-b py-2 sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
      <div>
        {tasks.length > 0 && (
          <p className="w-24 border-b pb-1 text-lg">TASKS</p>
        )}
        {/* Sorted tasks */}
        {sortTasks && (
          <div>
            {tasks.map((task, index) => {
              if (task.isDone)
                return <Todo key={index} task={task} index={index} />;
            })}
            {tasks.map((task, index) => {
              if (!task.isDone)
                return <Todo key={index} task={task} index={index} />;
            })}
          </div>
        )}
        {/* Unsorted tasks */}
        {!sortTasks && (
          <div>
            {tasks.map((task, index) => {
              return <Todo key={index} task={task} index={index} />;
            })}
          </div>
        )}
      </div>
      {tasks.length > 0 && (
        <div className="flex justify-end">
          <ButtonComp
            compStyle="mt-2 w-24"
            onClick={() => {
              TOGGLE_SORT_TASKS();
            }}
          >
            {sortTasks ? "Unsort" : "Sort"}
          </ButtonComp>
        </div>
      )}
    </div>
  );
};

export default Todos;
