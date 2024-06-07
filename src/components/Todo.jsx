import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
// Components
import ButtonComp from "./ButtonComp";

const Todo = ({ task, URL }) => {
  // Queries mutations
  const queryClient = useQueryClient();

  const toggleTaskMutation = useMutation({
    mutationFn: async () => {
      await axios.put(`${URL}/task/${task._id}/update`, {
        isDone: !task.isDone,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getTasks"]);
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`${URL}/task/${task._id}/delete`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getTasks"]);
    },
  });
  //

  return (
    <div className="flex justify-between gap-x-5 border-b py-1">
      <p>{task.name}</p>
      <div className="flex w-24 justify-between">
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={() => {
            toggleTaskMutation.mutate();
          }}
        />
        <ButtonComp
          compStyle=" px-1.5 h-8"
          onClick={() => {
            deleteTaskMutation.mutate();
          }}
        >
          X
        </ButtonComp>
      </div>
    </div>
  );
};

export default Todo;
