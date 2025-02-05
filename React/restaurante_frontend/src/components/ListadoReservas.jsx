import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from "@mui/material/Button";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router";

function ListadoReservas() {
  const [rows, setRows] = useState([]);
const navigate = useNavigate();

  useEffect(() => {
    async function getReservas() {
      let response = await fetch("http://localhost:3000/api/reservas");

      if (response.ok) {
        let data = await response.json();
        setRows(data.datos);
      }
    }

    getReservas();
  }, []); // Se ejecuta solo en el primer renderizado

  const handleDelete = async (idReserva) => {
    let response = await fetch("http://localhost:3000/api/reservas/" + idReserva, {
      method: "DELETE",
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
                <TableCell>CLIENTE</TableCell>
                <TableCell>FECHA</TableCell>
                <TableCell>DESCRIPCION</TableCell>
                <TableCell>ELIMINAR</TableCell>
                <TableCell>EDITAR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.idReserva}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.idReserva}</TableCell>
                  <TableCell>{row.idCliente_Cliente.nombreCliente + " " + row.idCliente_Cliente.apellidoCliente}</TableCell>
                  <TableCell>{row.fechaReserva}</TableCell>
                  <TableCell>{row.descripcion}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(row.idReserva)}
                      color="error"
                    >
                      <DeleteForeverIcon fontSize="small" />
                    </Button>
                  </TableCell>
                  <TableCell>
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
        </TableContainer>
      </Box>
    </>
  );
}

export default ListadoReservas;
