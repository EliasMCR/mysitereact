import { useState } from "react";
import "./App.css";
import {Home} from "../src/pages/Home"

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-[var(--secondary-bg-color)] min-h-screen ">
        <Home />
      </div>
    </>
  );
}

export default App;
