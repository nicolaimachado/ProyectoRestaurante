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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router";

function ListadoClientes() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getClientes() {
      let response = await fetch("http://localhost:3000/api/clientes");

      if (response.ok) {
        let data = await response.json();
        setRows(data.datos);
      }
    }

    getClientes();
  }, []); // Se ejecuta solo en el primer renderizado

  const handleDelete = async (idCliente) => {
    let response = await fetch("http://localhost:3000/api/clientes/" + idCliente, {
      method: "DELETE",
    });

    if (response.ok) {
      // Utilizando filter creo un array sin el plato borrado
      const clientesTrasBorrado = rows.filter(
        (cliente) => cliente.idCliente != idCliente
      );
      // Establece los datos de nuevo para provocar un renderizado
      setRows(clientesTrasBorrado);
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Listado de clientes
      </Typography>

      <Box sx={{ mx: 4 }}>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table aria-label="simple table">
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
              {rows.map((row) => (
                <TableRow
                  key={row.idCliente}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.idCliente}</TableCell>
                  <TableCell>{row.nombreCliente}</TableCell>
                  <TableCell>{row.apellidoCliente}</TableCell>
                  <TableCell>{row.emailCliente}</TableCell>
                  <TableCell>{row.telefonoCliente}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(row.idCliente)}
                      color="error"
                    >
                      <DeleteForeverIcon fontSize="small" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => navigate("/modificarcliente/" + row.idCliente)}
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

export default ListadoClientes;
