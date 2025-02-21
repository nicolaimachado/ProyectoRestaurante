import { Typography, TextField, Stack, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from "../config";

function AltaCliente() {
  const [datos, setDatos] = useState({
    nombreCliente: "",
    apellidoCliente: "",
    emailCliente: "",
    telefonoCliente: "",
  });

  const [validacion, setValidacion] = useState({
    nombreCliente: false, // true si hay error
    apellidoCliente: false,
    emailCliente: false,
    telefonoCliente: false,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // No hacemos submit
    e.preventDefault();

    // Enviamos los datos mediante fetch
    if (validarDatos()){
      try{
        const response = await fetch(apiUrl + "/clientes", {
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
    }
  };

  function validarDatos() {
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    // En principio, damos por bueno el formulario
    let validado = true;
    // // Estado de la validación auxiliar
    let validacionAux = {
        nombreCliente: false, // true si hay error
        apellidoCliente: false,
        emailCliente: false,
        telefonoCliente: false,
    };

    if (datos.nombreCliente == null || datos.nombreCliente.length < 3 || datos.nombreCliente.length>100 || datos.nombreCliente == ""){
      validacionAux.nombreCliente = true;
      validado = false;
    }

    if (datos.apellidoCliente == null || datos.apellidoCliente.length < 3 || datos.apellidoCliente.length>100 || datos.apellidoCliente == ""){
      validacionAux.apellidoCliente = true;
      validado = false;
    }

    if (datos.emailCliente == null || datos.emailCliente.length < 3 || datos.emailCliente.length>100 || datos.emailCliente == "" || regex.test(datos.emailCliente)==false){
      validacionAux.emailCliente = true;
      validado = false;
    }

    if (datos.telefonoCliente == null || datos.telefonoCliente.length != 9 || datos.telefonoCliente == ""){
      validacionAux.telefonoCliente = true;
      validado = false;
    }
    // Actualizo el estado de la validacion de los Textfields
    setValidacion(validacionAux);
    console.log("Formulario valido:", validado);
    return validado;
  }

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
              name="nombreCliente"
              value={datos.nombreCliente}
              onChange={handleChange}
              error={validacion.nombreCliente}
              helperText={
                validacion.nombreCliente && "Debes introducir un nombre (Entre 3 y 100 caracteres)"
              }
            />
            <TextField
              id="outlined-basic"
              label="Apellido"
              variant="outlined"
              name="apellidoCliente"
              value={datos.apellidoCliente}
              onChange={handleChange}
              error={validacion.apellidoCliente}
              helperText={
                validacion.apellidoCliente && "Debes introducir un apellido (Entre 3 y 100 caracteres)"
              }
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              name="emailCliente"
              value={datos.emailCliente}
              onChange={handleChange}
              error={validacion.emailCliente}
              helperText={
                validacion.emailCliente && "Debes introducir un correo valido"
              }
            />
            <TextField
              id="outlined-basic"
              label="Telefono"
              variant="outlined"
              name="telefonoCliente"
              value={datos.telefonoCliente}
              onChange={handleChange}
              error={validacion.telefonoCliente}
              helperText={
                validacion.telefonoCliente && "Debes introducir un numero de telefono"
              }
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
