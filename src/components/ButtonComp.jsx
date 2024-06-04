import { useThemeStore } from "../features/theme/store";

const ButtonComp = ({ compStyle, children, onClick }) => {
  const { theme } = useThemeStore((store) => {
    return store;
  });
  return (
    <button
      className={` ${
        theme === "white"
          ? "hover:bg-black hover:text-white"
          : "hover:bg-white hover:text-black"
      } h-12 truncate rounded-lg border ${compStyle}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonComp;
