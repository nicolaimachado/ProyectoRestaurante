import { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router";
import { Typography, Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, TablePagination } from '@mui/material';
import { apiUrl } from "../config";

/**
 * Componente para listar todas las reservas.
 * @component
 */
function ListadoReservas() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Obtiene todas las reservas.
     */
    async function getReservas() {
      try {
        let response = await fetch(apiUrl + "/reservas", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          let data = await response.json();
          setRows(data.datos);
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getReservas();
  }, []); // Se ejecuta solo en el primer renderizado

  /**
   * Maneja la eliminación de una reserva.
   * @param {number} idReserva - El ID de la reserva a eliminar.
   */
  const handleDelete = async (idReserva) => {
    let response = await fetch(apiUrl + "/reservas/" + idReserva, {
      method: "DELETE",
      credentials: "include",
    });

    if (response.ok) {
      // Utilizando filter creo un array sin el plato borrado
      const reservasTrasBorrado = rows.filter(
        (reserva) => reserva.idReserva != idReserva
      );
      // Establece los datos de nuevo para provocar un renderizado
      setRows(reservasTrasBorrado);
    }
  };

  /**
   * Maneja el cambio de página en la tabla.
   * @param {object} event - El evento de cambio de página.
   * @param {number} newPage - La nueva página seleccionada.
   */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /**
   * Maneja el cambio de filas por página en la tabla.
   * @param {object} event - El evento de cambio de filas por página.
   */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Listado de reservas
      </Typography>

      <Box sx={{ mx: 4 }}>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID RESERVA</TableCell>
                <TableCell>NOMBRE CLIENTE</TableCell>
                <TableCell>FECHA RESERVA</TableCell>
                <TableCell>DESCRIPCION</TableCell>
                <TableCell align="center">ELIMINAR</TableCell>
                <TableCell align="center">EDITAR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow
                  key={row.idReserva}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.idReserva}</TableCell>
                  <TableCell>{row.idCliente_Cliente.nombreCliente + " " + row.idCliente_Cliente.apellidoCliente}</TableCell>
                  <TableCell>{row.fechaReserva}</TableCell>
                  <TableCell>{row.descripcion}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(row.idReserva)}
                      color="error"
                    >
                      <DeleteForeverIcon fontSize="small" />
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => navigate("/modificarreserva/" + row.idReserva)}
                    >
                      <EditNoteIcon fontSize="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </>
  );
}

export default ListadoReservas;