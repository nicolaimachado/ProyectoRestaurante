import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell, CartesianGrid } from 'recharts';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import generatePDF from '../utils/generatePDF';
import { apiUrl } from '../config';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function GraficaReserva() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    async function getDatosGraficaReservas() {
      try {
        let response = await fetch(apiUrl + "/reservas/grafica", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          let data = await response.json();
          setDatos(data.datos);
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getDatosGraficaReservas();
  }, []);

  return (
    <>
      <Box id="pdf-content" align="center">
      <Typography variant="h4" align="center" sx={{ mt: 4 }}>
        Gráfica de Reservas por Día
      </Typography>
        <BarChart width={730} height={250} data={datos}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8">
            {datos.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </Box>
      <Box sx={{ mx: 4, mt: 2 }}>
        <Button variant="contained" onClick={generatePDF}>
          Imprimir listado (jsPDF + html2canvas)
        </Button>
      </Box>
    </>
  );
}

export default GraficaReserva;