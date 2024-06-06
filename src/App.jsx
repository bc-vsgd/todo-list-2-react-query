import { useEffect } from "react";
import axios from "axios";
// States
import { useTasksStore } from "./features/tasks/store";
import { useThemeStore } from "./features/theme/store";
// Components
import Header from "./components/Header";
import Todos from "./components/Todos";
import Toolbar from "./components/Toolbar";
import Footer from "./components/Footer";

import "./App.css";

const URL = "http://localhost:3000";

function App() {
  const { theme } = useThemeStore((store) => {
    return store;
  });
  const { GET_TASKS } = useTasksStore((store) => {
    return store;
  });

  //
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${URL}/tasks`);
      // console.log(data.data);
      GET_TASKS(data.data);
    };
    fetchData();
  }, []);
  //
  return (
    <div
      className={
        theme === "white"
          ? "h-screen bg-white text-black"
          : "h-screen bg-black text-white"
      }
    >
      <Header />
      <Todos />
      <Toolbar />
      <Footer />
    </div>
  );
}

export default App;
