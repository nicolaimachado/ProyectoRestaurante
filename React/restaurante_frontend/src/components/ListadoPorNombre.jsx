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
import { apiUrl } from "../config";
function ListadoPorNombre() {
  const [nombre, setNombre] = useState("");
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.get(`${apiUrl}/clientes/listadopornombre/${nombre}`);
      setDatos(response.data.datos);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("No se encontraron clientes con ese nombre");
        setDatos([]);
      } else {
        setError("Error al obtener los clientes");
        console.error("Error fetching clientes:", err);
      }
    }
  };

  const handleDelete = async (idCliente) => {
    let response = await fetch(apiUrl + "clientes/" + idCliente, {
      method: "DELETE",
    });

    if (response.ok) {
      // Utilizando filter creo un array sin el plato borrado
      const clientesTrasBorrado = datos.filter(
        (cliente) => cliente.idCliente != idCliente
      );
      // Establece los datos de nuevo para provocar un renderizado
      setDatos(clientesTrasBorrado);
    }
  };

  return (
    <Box>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Listado de clientes por nombre
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" alignItems="center" align="center" justifyContent="center" spacing={2} mt={2}>
          <TextField
            label="Nombre del cliente"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
                <TableCell align="right">ID CLIENTE</TableCell>
                <TableCell>NOMBRE</TableCell>
                <TableCell>APELLIDO</TableCell>
                <TableCell>EMAIL</TableCell>
                <TableCell>TELEFONO</TableCell>
                <TableCell align="center">ELIMINAR</TableCell>
                <TableCell align="center">EDITAR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datos.map((cliente) => (
                <TableRow key={cliente.idCliente}>
                  <TableCell align="right">{cliente.idCliente}</TableCell>
                  <TableCell>{cliente.nombreCliente}</TableCell>
                  <TableCell>{cliente.apellidoCliente}</TableCell>
                  <TableCell>{cliente.emailCliente}</TableCell>
                  <TableCell>{cliente.telefonoCliente}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(cliente.idCliente)}
                      color="error"
                    >
                      <DeleteForeverIcon fontSize="small" />
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => navigate("/modificarcliente/" + cliente.idCliente)}
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

export default ListadoPorNombre;