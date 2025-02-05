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

function ListadoEnFecha() {
  const [fecha, setFecha] = useState("");
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState("");

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

  return (
    <Box sx={{ width: '100%', maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Listado de Reservas por Fecha
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={2} alignItems="center" mb={4}>
          <TextField
            label="Fecha (YYYY-MM-DD)"
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

      {datos.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Descripcion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datos.map((reserva) => (
                <TableRow key={reserva.idReserva}>
                  <TableCell>{reserva.idReserva}</TableCell>
                  <TableCell>{reserva.idCliente_Cliente.nombreCliente}</TableCell>
                  <TableCell>{reserva.fechaReserva}</TableCell>
                  <TableCell>{reserva.descripcion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default ListadoEnFecha;