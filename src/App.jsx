import axios from "axios";
import { useQuery } from "@tanstack/react-query";
// States
import { useTasksStore } from "./features/tasks/store";
import { useThemeStore } from "./features/theme/store";
// Components
import Header from "./components/Header";
import Todos from "./components/Todos";
import Toolbar from "./components/Toolbar";
import Footer from "./components/Footer";

import "./App.css";

// LOCAL
// const URL = "http://localhost:3000";
// REMOTE
const URL = "https://site--home--r6xgg7xm7vcz.code.run";

function App() {
  const { theme } = useThemeStore((store) => {
    return store;
  });
  const { GET_TASKS } = useTasksStore((store) => {
    return store;
  });

  // Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["getTasks"],
    queryFn: async () => {
      const { data } = await axios.get(`${URL}/tasks`);
      GET_TASKS({ tasks: data.data });
      return data;
    },
    staleTime: Infinity,
  });

  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div
      className={
        theme === "white"
          ? "h-screen bg-white text-black"
          : "h-screen bg-black text-white"
      }
    >
      <Header />
      <Todos URL={URL} />
      <Toolbar URL={URL} />
      <Footer />
    </div>
  );
}

export default App;
