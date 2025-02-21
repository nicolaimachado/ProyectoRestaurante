// Importar librería express --> web server
const express = require("express");
// Importar librería path, para manejar rutas de ficheros en el servidor
const path = require("path");
// Importar libreria CORS
const cors = require("cors");
// Importar gestores de rutas
const clienteRoutes = require("./routes/clienteRoutes");
const reservaRoutes = require("./routes/reservaRoutes");
const config = require("./config/config"); // Import the config file

const app = express();
const port = process.env.PORT || config.port; // Use the port from config

// Configurar middleware para analizar JSON en las solicitudes
app.use(express.json());
// Configurar CORS para admitir cualquier origen
app.use(cors());

// Configurar rutas de la API Rest
app.use("/api/clientes", clienteRoutes);
app.use("/api/reservas", reservaRoutes);

// // Configurar el middleware para servir archivos estáticos desde el directorio 'public\old_js_vainilla'
// app.use(express.static(path.join(__dirname, "public","old_js_vainilla")));

// Ruta para manejar las solicitudes al archivo index.html
// app.get('/', (req, res) => {
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "old_js_vainilla","index.html"));
// });

// Iniciar el servidor
// Iniciar el servidor solo si no estamos en modo de prueba
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
  });
}
// Exportamos la aplicación para poder hacer pruebas
module.exports = app;