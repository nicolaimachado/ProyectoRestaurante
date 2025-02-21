const request = require("supertest");
const app = require("../index"); // Asegúrate de que apunta a tu archivo principal de Express
const sequelize = require("../config/sequelize");
const { initModels } = require("../models/init-models");
const { reserva } = initModels(sequelize);

describe("API REST de Reservas", () => {
  let reservaCreada;

  beforeAll(async () => {
    const nuevaReserva = {
      idCliente: 2,
      descripcion: "Reserva de prueba 2",
      fechaReserva: "2025-02-21",
    };

    const response = await request(app)
      .post("/api/reservas")
      .send(nuevaReserva);

    reservaCreada = response.body.datos;
  });

  test("Crear una nueva reserva (POST /api/reservas)", async () => {
    const nuevaReserva = {
      idCliente: 2,
      descripcion: "Reserva de prueba 2",
      fechaReserva: "2025-02-21",
    };

    const response = await request(app)
      .post("/api/reservas")
      .send(nuevaReserva);

    expect(response.status).toBe(201);
    expect(response.body.ok).toBe(true);
    expect(response.body.datos).toHaveProperty("idReserva");
    expect(response.body.datos.descripcion).toBe(nuevaReserva.descripcion);
  });

  test("Obtener todas las reservas (GET /api/reservas)", async () => {
    const response = await request(app).get("/api/reservas");

    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.datos.length).toBeGreaterThan(0);
  });

  test("Obtener una reserva por ID (GET /api/reservas/:idReserva)", async () => {
    const response = await request(app).get(`/api/reservas/${reservaCreada.idReserva}`);

    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.datos.idReserva).toBe(reservaCreada.idReserva);
  });

  test("Actualizar una reserva (PUT /api/reservas/:idReserva)", async () => {
    const datosActualizados = {
      idReserva: reservaCreada.idReserva,
      idCliente: reservaCreada.idCliente,
      descripcion: "Reserva actualizada",
      fechaReserva: reservaCreada.fechaReserva,
    };

    const response = await request(app)
      .put(`/api/reservas/${reservaCreada.idReserva}`)
      .send(datosActualizados);

    expect(response.status).toBe(204);
  });

  test("Eliminar una reserva (DELETE /api/reservas/:idReserva)", async () => {
    const response = await request(app).delete(`/api/reservas/${reservaCreada.idReserva}`);

    expect(response.status).toBe(204);
  });

  test("Obtener reservas por fecha (GET /api/reservas/listadoenfecha/:fechareserva)", async () => {
    const response = await request(app).get(`/api/reservas/listadoenfecha/${reservaCreada.fechaReserva}`);

    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.datos.length).toBeGreaterThan(0);
  });
});