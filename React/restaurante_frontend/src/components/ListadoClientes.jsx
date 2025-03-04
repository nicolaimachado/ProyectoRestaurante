import { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router";
import { Typography, Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, TablePagination } from '@mui/material';
import { apiUrl } from "../config";
import generatePDF from "../utils/generatePDF";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// Estilos del PDF
const styles = StyleSheet.create({
  page: { padding: 20 },
  title: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: 10,
  },
  tableRow: { flexDirection: "row" },
  tableColHeader: {
    width: "15%",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#ddd",
    padding: 5,
    fontWeight: "bold",
  },
  tableCol: { 
    width: "15%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    padding: 5,
    wordWrap: 'break-word',
  },
  tableColEmail: {
    width: "40%",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 5,
    wordWrap: 'break-word',
  },
  tableColEmailHeader: {
    width: "40%",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#ddd",
    padding: 5,
    fontWeight: "bold",
  },
  tableColId: {
    width: "8%",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 5,
    wordWrap: 'break-word',
  },
  tableColIdHeader: {
    width: "8%",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#ddd",
    padding: 5,
    fontWeight: "bold",
  },
  tableColHeaderTel: {
    width: "22%",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#ddd",
    padding: 5,
    fontWeight: "bold",
  },
  tableColTel: { 
    width: "22%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    padding: 5,
    wordWrap: 'break-word',
  },
});

// Componente del documento PDF
const ListadoClientesPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Listado de clientes</Text>
      <View style={styles.table}>
        {/* Encabezado */}
        <View style={styles.tableRow}>
          <Text style={styles.tableColIdHeader}>ID CLIENTE</Text>
          <Text style={styles.tableColHeader}>NOMBRE</Text>
          <Text style={styles.tableColHeader}>APELLIDO</Text>
          <Text style={styles.tableColEmailHeader}>EMAIL</Text>
          <Text style={styles.tableColHeaderTel}>TELEFONO</Text>
        </View>
        {/* Filas de datos */}
        {data.map((row) => (
          <View style={styles.tableRow} key={row.idCliente}>
            <Text style={styles.tableColId}>{row.idCliente}</Text>
            <Text style={styles.tableCol}>{row.nombreCliente}</Text>
            <Text style={styles.tableCol}>{row.apellidoCliente}</Text>
            <Text style={styles.tableColEmail}>{row.emailCliente}</Text>
            <Text style={styles.tableColTel}>{row.telefonoCliente}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

function ListadoClientes() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Obtiene todos los clientes.
     */
    async function getClientes() {
      let response = await fetch(apiUrl + "/clientes");

      if (response.ok) {
        let data = await response.json();
        setRows(data.datos);
      }
    }

    getClientes();
  }, []); // Se ejecuta solo en el primer renderizado

  /**
   * Maneja la eliminación de un cliente.
   * @param {number} idCliente - El ID del cliente a eliminar.
   */
  const handleDelete = async (idCliente) => {
    let response = await fetch(apiUrl + "/clientes/" + idCliente, {
      method: "DELETE",
    });

    if (response.ok) {
      // Utilizando filter creo un array sin el cliente borrado
      const clientesTrasBorrado = rows.filter(
        (cliente) => cliente.idCliente != idCliente
      );
      // Establece los datos de nuevo para provocar un renderizado
      setRows(clientesTrasBorrado);
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
    <Box  id="pdf-content" align="center">
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
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow
                  key={row.idCliente}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.idCliente}</TableCell>
                  <TableCell>{row.nombreCliente}</TableCell>
                  <TableCell>{row.apellidoCliente}</TableCell>
                  <TableCell>{row.emailCliente}</TableCell>
                  <TableCell>{row.telefonoCliente}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(row.idCliente)}
                      color="error"
                    >
                      <DeleteForeverIcon fontSize="small" />
                    </Button>
                  </TableCell>
                  <TableCell align="center">
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
      
      </Box>
      <Box sx={{ mx: 4, mt: 2 }}>
        <Button variant="contained" onClick={() => window.print()}>
          Imprimir listado (navegador)
        </Button>
      </Box>
      <Box sx={{ mx: 4, mt: 2 }}>
        <Button variant="contained" onClick={generatePDF}>
          Imprimir listado (jsPDF + html2canvas)
        </Button>
      </Box>
      <Box sx={{ mx: 4, mt: 2 }}>
        <Button variant="contained">
          <PDFDownloadLink
            document={<ListadoClientesPDF data={rows} />}
            fileName="clientes.pdf"
          >
            {({ loading }) =>
              loading ? "Generando PDF..." : "Imprimir listado (react-pdf)"
            }
          </PDFDownloadLink>
        </Button>
      </Box>
    </>
  );
}

export default ListadoClientes;