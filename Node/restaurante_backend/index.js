const express = require("express");
const path = require("path");
const cors = require("cors");
const clienteRoutes = require("./routes/clienteRoutes");
const reservaRoutes = require("./routes/reservaRoutes");
const config = require("./config/config");

const app = express();
const port = process.env.PORT || config.port;

// Configurar middleware para analizar JSON en las solicitudes
app.use(express.json());

// Configurar CORS para admitir solicitudes desde el frontend
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

// Configurar rutas de la API Rest
app.use("/api/clientes", clienteRoutes);
app.use("/api/reservas", reservaRoutes);

// Iniciar el servidor solo si no estamos en modo de prueba
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
  });
}

// Exportamos la aplicación para poder hacer pruebas
module.exports = app;