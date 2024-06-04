// States
import { useTasksStore } from "../features/tasks/store";
import { useThemeStore } from "../features/theme/store";
// Components
import ButtonComp from "./ButtonComp";

const Header = () => {
  const { tasks, numberOfDoneTasks, numberOfUndoneTasks } = useTasksStore(
    (store) => {
      return store;
    },
  );
  const { CHANGE_THEME } = useThemeStore((store) => {
    return store;
  });
  return (
    <header className="border-b py-3">
      <div className="mx-auto flex max-w-md justify-between sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
        <div>
          <h1 className="pb-1 text-lg sm:text-xl">TO DO LIST</h1>
          <div className="flex gap-x-5">
            <p>Number of tasks: {tasks.length}</p>
            <p>Done: {numberOfDoneTasks}</p>
            <p>Undone: {numberOfUndoneTasks}</p>
          </div>
        </div>
        <ButtonComp
          compStyle="px-2"
          onClick={() => {
            CHANGE_THEME();
          }}
        >
          Change theme
        </ButtonComp>
      </div>
    </header>
  );
};

export default Header;
