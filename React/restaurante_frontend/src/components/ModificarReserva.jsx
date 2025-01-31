import { Typography, TextField, Stack, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

function ModificarReserva() {
  const params = useParams();
  const [datos, setDatos] = useState({
    idReserva: params.idReserva,
    idCliente: "",
    fechaReserva: "",
    descripcion: "",
  });
  // const [validacion, setValidacion] = useState({
  //   idCliente: false, // true si hay error
  //   fechaReserva: false,
  //   descripcion: false,
  // });

  const navigate = useNavigate();

  useEffect(() => {
    async function getReservaById() {
      let response = await fetch(
        "http://localhost:3000/api/reservas/" + datos.idReserva
      );
      if (response.ok) {
        let data = await response.json();
        setDatos(data.datos);
      } else if (response.status === 404) {
        let data = await response.json();
        alert(data.mensaje);
        navigate("/"); // Volver a la página principal por ruta erronea
      }
    }

    getReservaById();
  }, []); // Se ejecuta solo en el primer renderizado

  const handleSubmit = async (e) => {
    // No hacemos submit
    e.preventDefault();
    console.log("Vamos a validar");
    if (validarDatos()){
    // Enviamos los datos mediante fetch
        try {
              
          const response = await fetch(
            "http://localhost:3000/api/reservas/" + datos.idReserva,
            {
              method: "PUT", // "PATCH"
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(datos), // JSON.stringify({blocked: true})
            }
          );

          if (response.ok) {
            // 204 No content
            alert("Actualización correcta");
            navigate(-1); // Volver a la ruta anterior
          } else { // 404 Not Found plato no modificado o no encontrado
            const data = await response.json();
            alert(data.mensaje);
          }
        } catch (error) {
          console.error("Error:", error);
          alert("Error:", error);
        }
    }
};
    

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  function validarDatos() {
    // En principio, damos por bueno el formulario
    let validado = true;
    // // Estado de la validación auxiliar
    // let validacionAux = {
    //   nombre: false,
    //   descripcion: false,
    //   precio: false,
    // };

    // if (datos.nombre.length < 3) {
    //   // Error en el nombre
    //   validacionAux.nombre = true;
    //   // Formulario invalido
    //   validado = false;
    // }

    // if (datos.descripcion.length < 10) {
    //   validacionAux.descripcion = true;
    //   validado = false;
    // }

    // let expPrecio = /^\d{1,2}(\.\d{1,2})?$/;
    // if (expPrecio.test(datos.precio)) {
    //   // Los datos al menos tienen el formato correcto
    //   if (parseFloat(datos.precio) < 0.5 || parseFloat(datos.precio) > 50) {
    //     validacionAux.precio = true;
    //     validado = false;
    //   }
    // } else {
    //   validacionAux.precio = true;
    //   validado = false;
    // }

    // // Actualizo el estado de la validacion de los Textfields
    // setValidacion(validacionAux);
    // console.log("Formulario valido:", validado);
    return validado;
  }

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Modificar reserva
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
              label="ID Cliente"
              variant="outlined"
              name="idCliente"
              value={datos.idCliente}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Fecha"
              variant="outlined"
              name="fechaReserva"
              value={datos.fechaReserva}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Descripcion"
              variant="outlined"
              name="descripcion"
              value={datos.descripcion}
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

export default ModificarReserva;
