import { useEffect } from "react";
import "./App.css";
import Header from "./components/layout/Header";
import ThemeBar from "./components/layout/themes/ThemeBar";
import Skills from "./components/layout/Skills";

function App() {
  useEffect(() => {
    if (localStorage.getItem("theme"))
      document.documentElement.setAttribute(
        "data-theme",
        localStorage.getItem("theme")
      );
  }, []);
  return (
    <div className="App min-h-[100vh] bg-primary font-Rubik duration-500">
      <ThemeBar />
      <Header />
      <Skills />
    </div>
  );
}

export default App;
