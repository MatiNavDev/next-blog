import { useState } from "react";
import DarkTheme from "./Darktheme";

function loadDarkMode() {
  if (typeof localStorage === "undefined") return false;
  const value = localStorage.getItem("darkMode");
  return value === null ? false : JSON.parse(value);
}

const ThemeSwitch = () => {
  const [darkMode, setDarkMode] = useState(loadDarkMode);

  const handleClick = () => {
    setDarkMode((prevValue) => {
      localStorage.setItem("darkMode", JSON.stringify(!darkMode));
      return !prevValue;
    });
  };

  const text = darkMode ? "Dark Mode" : "Light Mode";
  console.log("ThemeSwitch " + darkMode);
  return (
    <>
      <button onClick={handleClick} suppressHydrationWarning>
        {text}
      </button>
      <style jsx>{`
        button {
          background: none;
          border: none;
          cursor: pointer;
          color: inherit;
        }
      `}</style>
      {darkMode && <DarkTheme />}
    </>
  );
};

export default ThemeSwitch;
