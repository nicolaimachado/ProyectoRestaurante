import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBCollapse,
  } from "mdb-react-ui-kit";
  import { useState } from "react";

  import logo from "../assets/images/logo.png";
  import { Link } from "react-router";
  
  /**
   * Componente de menú de navegación.
   * @component
   */
  function Menu() {
    const [openBasic, setOpenBasic] = useState(false);
  
    return (
      <MDBNavbar expand="lg" light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand href="#">
            <img src={logo} height="30" alt="" loading="lazy" />
            Restaurante Delicatesse
          </MDBNavbarBrand>
  
          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setOpenBasic(!openBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
  
          <MDBCollapse navbar open={openBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Clientes
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <Link to="/altacliente" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Alta de cliente</MDBDropdownItem>
                    </Link>
                    <Link to="/listadoclientes" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Listado de clientes</MDBDropdownItem>
                    </Link>
                    <Link to="/listadopornombre" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Listado por nombre</MDBDropdownItem>
                    </Link>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Reservas
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                  <Link to="/altareserva" style={{ color: "#4f4f4f" }}>
                    <MDBDropdownItem link>Alta de reserva</MDBDropdownItem>
                    </Link>
                    <Link to="/listadoreservas" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Listado de reservas</MDBDropdownItem>
                    </Link>
                    <Link to="/listadoenfecha" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Listado por fechas</MDBDropdownItem>
                    </Link>
                    <Link to="/graficareserva" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Grafica reserva</MDBDropdownItem>
                    </Link>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    );
  }
  
  export default Menu;
