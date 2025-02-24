const express = require("express");
const path = require("path");
const cors = require("cors");
const clienteRoutes = require("./routes/clienteRoutes");
const reservaRoutes = require("./routes/reservaRoutes");
// Importar libreria para manejo de ficheros de configuración dependiendo de la variable de entorno NODE_ENV
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});
const config = require("./config/config");

const app = express();
const port = process.env.PORT || config.port;

// Configurar middleware para analizar JSON en las solicitudes
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  // Configurar CORS para admitir solicitudes desde el frontend
  const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
  };
  app.use(cors(corsOptions));
}
// Configurar rutas de la API Rest
app.use("/api/clientes", clienteRoutes);
app.use("/api/reservas", reservaRoutes);

console.log("Sirviendo ficheros de producción");
// Configurar el middleware para servir archivos estáticos desde el directorio public/dev en producción
app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar el servidor solo si no estamos en modo de prueba
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
  });
}

// Exportamos la aplicación para poder hacer pruebas
module.exports = app;