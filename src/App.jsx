import "./App.css";
import { RouterProvider } from "react-router-dom";
import route from "./routes/index.jsx"

function App() {
  return (
    <>
      <RouterProvider router={route}/>
    </>
  );
}

export default App;
