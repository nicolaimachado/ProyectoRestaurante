import { useEffect, useState } from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import generatePDF from "../utils/generatePDF";

import { apiUrl } from "../config";
function GraficaReserva() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    async function getDatosGraficaReserva() {
      let response = await fetch(apiUrl + "/reservas/grafica", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        let data = await response.json();
        let datosGrafica = data.datos.map((fila) => ({
          fecha: fila.fechaReserva,
          reservas: parseFloat(fila.reservas),
        }));
        setDatos(datosGrafica);
      }
    }

    getDatosGraficaReserva();
  }, []);

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 4 }}>
        Gráfica de Reservas por Día
      </Typography>
      <Box id="chart">
        <BarChart width={730} height={250} data={datos}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="reservas" fill="#8884d8" />
        </BarChart>
      </Box>
      <Box sx={{ mx: 4, mt: 2 }}>
        <Button variant="contained" onClick={() => generatePDF("chart")}>
          Imprimir gráfica (jsPDF + html2canvas)
        </Button>
      </Box>
    </>
  );
}

export default GraficaReserva;