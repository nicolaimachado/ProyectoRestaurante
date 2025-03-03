import { Outlet } from "react-router";
import Menu from "../components/Menu";  

/**
 * Componente principal de la aplicación que incluye el menú y el contenido de las rutas.
 * @component
 */
function Home(){
    return (
        <>
            <Menu/>
            <Outlet />
        </>
    );
}
export default Home;