import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Entree from "./components/Entree";
import Home from "./components/Home";
import Sortie from "./components/Sortie";

const router = createBrowserRouter([
  {
    path: "/admin/login",
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