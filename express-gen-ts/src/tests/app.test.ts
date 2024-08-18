import request from 'supertest';
import { app } from '../server'; // Asegúrate de que esto coincide con tu exportación
import { Server } from 'http';
import mongoose from 'mongoose';

let server: Server;

beforeAll(async () => {
  server = app.listen();
});

afterAll(async () => {
  await mongoose.disconnect(); // Desconecta de la base de datos
  server.close(); // Cierra el servidor
});

describe('GET /api/usuarios/all', () => {
  it('should return 200 OK', async () => {
    // Usa supertest para hacer una solicitud al servidor
    const res = await request(server).get('/api/usuarios/all'); // Usa el servidor en lugar de app
    expect(res.status).toBe(200);
  });
});
