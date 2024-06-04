// States
import { useThemeStore } from "./features/theme/store";
// Components
import Header from "./components/Header";
import Todos from "./components/Todos";
import Toolbar from "./components/Toolbar";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  const { theme } = useThemeStore((store) => {
    return store;
  });
  return (
    <div
      className={
        theme === "white"
          ? "bg-white text-black h-screen"
          : "bg-black text-white h-screen"
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
