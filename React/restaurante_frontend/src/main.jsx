import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import ListadoClientes from "./components/ListadoClientes";
import ListadoReservas from "./components/ListadoReservas";
// import ModificarPlato from "./components/ModificarPlato";
// import AltaPlato from "./components/AltaPlato";
import PaginaError from "./pages/PaginaError";
import ModificarCliente from "./components/ModificarCliente";
import AltaCliente from "./components/AltaCliente";
import ModificarReserva from "./components/ModificarReserva";
import AltaReserva from "./components/AltaReserva";
import ListadoEnFecha from "./components/ListadoEnFecha";
import ListadoPorNombre from "./components/ListadoPorNombre";

let router = createBrowserRouter([
  {
    path: "/",
    element : <Home />,
    errorElement : <PaginaError />,
    children: [   // Los hijos se renderizan en el elemento <Outlet /> del padre
      {
        path: "listadoclientes",
        element: <ListadoClientes />,
      },
      {
        path: "listadoreservas",
        element: <ListadoReservas />,
      },
      {
        path: "altacliente",
        element: <AltaCliente/>,
      },
      {
        path: "modificarcliente/:idCliente",
        element: <ModificarCliente />,
      },
      {
        path: "altareserva",
        element: <AltaReserva/>,
      },
      {
        path: "modificarreserva/:idReserva",
        element: <ModificarReserva />,
      },
      {
        path: "listadoenfecha",
        element: <ListadoEnFecha />,
      },
      {
        path: "listadopornombre",
        element: <ListadoPorNombre/>,
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
