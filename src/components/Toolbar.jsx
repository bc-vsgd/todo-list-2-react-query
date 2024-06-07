import { useRef } from "react";
import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
// Components
import ButtonComp from "./ButtonComp";

const Toolbar = ({ URL }) => {
  const taskInput = useRef();

  // Queries mutations
  const queryClient = useQueryClient();

  const addTaskMutation = useMutation({
    mutationFn: async (task) => {
      await axios.post(`${URL}/task/create`, { name: task });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getTasks"]);
    },
  });

  const resetMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`${URL}/tasks/delete`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getTasks"]);
    },
  });
  //

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const task = taskInput.current.value;
    if (task) {
      addTaskMutation.mutate(task);
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
        </div>
      </form>
      <div>
        <ButtonComp
          compStyle=" px-1.5 sm:w-24"
          onClick={() => {
            resetMutation.mutate();
          }}
        >
          Reset
        </ButtonComp>
      </div>
    </div>
  );
};

export default Toolbar;
