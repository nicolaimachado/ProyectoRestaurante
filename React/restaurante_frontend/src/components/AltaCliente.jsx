import { Typography, TextField, Stack, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { useNavigate } from "react-router";

function AltaCliente() {
  const [datos, setDatos] = useState({
    nombreCliente: "",
    apellidoCliente: "",
    emailCliente: "",
    telefonoCliente: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // No hacemos submit
    e.preventDefault();

    // Enviamos los datos mediante fetch
    try{
        const response = await fetch("http://localhost:3000/api/clientes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
          });

        if (response.ok) {
            const respuesta = await response.json();
            alert(respuesta.mensaje);
            if(respuesta.ok){
                navigate("/"); // Volver a la página principal
            }  
        } 
    } catch (error) {
        console.error("Error:", error);
        alert("Error:", error);
    }
  };

  const handleChange = (e) => { 
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Alta de cliente
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit}
            sx={{ mx: 2 }}
          >
            <TextField
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              name="nombre"
              value={datos.nombreCliente}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Apellido"
              variant="outlined"
              name="apellido"
              value={datos.apellidoCliente}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              name="email"
              value={datos.emailCliente}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Telefono"
              variant="outlined"
              name="telefono"
              value={datos.telefonoCliente}
              onChange={handleChange}
            />
            <Button variant="contained" type="submit">
              Aceptar
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default AltaCliente;
