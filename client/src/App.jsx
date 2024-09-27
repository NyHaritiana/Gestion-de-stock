import "./App.css";
import { createBrowserRouter, json, RouterProvider } from "react-router-dom";
import Entree from "./components/Entree";
import Home from "./components/Home";
import Sortie from "./components/Sortie";
import Login from "./components/Login";
import { useEffect } from "react";
import axios from "axios";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Entree",
    element: <Entree />,
  },
  {
    path: "/Sortie",
    element: <Sortie />,
  },
]);
function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;