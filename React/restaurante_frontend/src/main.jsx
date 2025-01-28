import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import ListadoPlatos from "./components/ListadoPlatos";
import ListadoPedidos from "./components/ListadoPedidos";
import ModificarPlato from "./components/ModificarPlato";
import AltaPlato from "./components/AltaPlato";
import PaginaError from "./pages/PaginaError";

let router = createBrowserRouter([
  {
    path: "/",
    element : <Home />,
    errorElement : <PaginaError />,
    children: [   // Los hijos se renderizan en el elemento <Outlet /> del padre
      {
        path: "listadoplatos",
        element: <ListadoPlatos />,
      },
      {
        path: "listadopedidos",
        element: <ListadoPedidos />,
      },
      {
        path: "altaplato",
        element: <AltaPlato />,
      },
      {
        path: "modificarplato/:idplato",
        element: <ModificarPlato />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
