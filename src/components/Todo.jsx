import axios from "axios";
// Components
import ButtonComp from "./ButtonComp";

const URL = "http://localhost:3000";

const Todo = ({ task, index }) => {
  return (
    <div className="flex justify-between gap-x-5 border-b py-1">
      <p>{task.name}</p>
      <div className="flex w-24 justify-between">
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={async () => {
            const data = await axios.put(`${URL}/task/${task._id}/update`, {
              isDone: !task.isDone,
            });
          }}
        />
        <ButtonComp
          compStyle=" px-1.5 h-8"
          onClick={async () => {
            await axios.delete(`${URL}/task/${task._id}/delete`);
          }}
        >
          X
        </ButtonComp>
      </div>
    </div>
  );
};

export default Todo;
