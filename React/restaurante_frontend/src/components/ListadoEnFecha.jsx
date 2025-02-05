import { Typography, TextField, Stack, Button } from "@mui/material";
// import Grid from "@mui/material/Grid2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router";

function ListadoEnFecha() {
  const [fecha, setFecha] = useState("");
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.get(`http://localhost:3000/api/reservas/listadoenfecha/${fecha}`);
      setDatos(response.data.datos);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("No se encontraron reservas para la fecha especificada");
        setDatos([]);
      } else {
        setError("Error al obtener las reservas");
        console.error("Error fetching reservas:", err);
      }
    }
  };

  const handleDelete = async (idReserva) => {
    let response = await fetch("http://localhost:3000/api/reservas/" + idReserva, {
      method: "DELETE",
    });

    if (response.ok) {
      // Utilizando filter creo un array sin el plato borrado
      const reservasTrasBorrado = datos.filter(
        (reserva) => reserva.idReserva != idReserva
      );
      // Establece los datos de nuevo para provocar un renderizado
      setDatos(reservasTrasBorrado);
    }
  };

  return (
    <Box>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Listado de reservas por fecha
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" alignItems="center" align="center" justifyContent="center" spacing={2} mt={2}>
          <TextField
            label="Fecha"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />
          <Button type="submit" variant="contained">Buscar</Button>
        </Stack>
      </form>

      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}
    <Box sx={{ mx: 4 }}>
      {datos.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table  aria-label="simple table">
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
              {datos.map((reserva) => (
                <TableRow key={reserva.idReserva}>
                  <TableCell align="right">{reserva.idReserva}</TableCell>
                  <TableCell>{reserva.idCliente_Cliente.nombreCliente + " " + reserva.idCliente_Cliente.apellidoCliente}</TableCell>
                  <TableCell>{reserva.fechaReserva}</TableCell>
                  <TableCell>{reserva.descripcion}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(reserva.idReserva)}
                      color="error"
                    >
                      <DeleteForeverIcon fontSize="small" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => navigate("/modificarreserva/" + reserva.idReserva)}
                    >
                      <EditNoteIcon fontSize="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      </Box>
    </Box>
  );
}

export default ListadoEnFecha;