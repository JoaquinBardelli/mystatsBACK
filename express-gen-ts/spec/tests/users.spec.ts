import supertest, { Test } from "supertest";
import TestAgent from "supertest/lib/agent";
import insertUrlParams from "inserturlparams";

import app from "@src/server";
import Usuario from "@src/models/Usuario";
import { IUsuario } from "@src/models/Usuario";
import HttpStatusCodes from "@src/common/HttpStatusCodes";
import Paths from "@src/common/Paths";
import apiCb from "spec/support/apiCb";
import { TApiCb } from "spec/types/misc";
import mongoose from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';

// **** Tests **** //

describe("Usuario", () => {
  let agent: TestAgent<Test>;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    // Inicia el servidor de MongoDB en memoria para las pruebas
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    // Conéctate a la base de datos en memoria
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

    agent = supertest.agent(app);
  });

  afterAll(async () => {
    // Cierra la conexión con la base de datos y detiene el servidor en memoria
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  // **** User Tests **** //

  describe(`GET: ${Paths.Base + Paths.Usuarios.Base + Paths.Usuarios.Get}`, () => {
    const api = (cb: TApiCb) =>
      agent
        .get(Paths.Base + Paths.Usuarios.Base + Paths.Usuarios.Get)
        .end(apiCb(cb));

    it("should return status 200.", (done) => {
      api((res) => {
        expect(res.status).toBe(HttpStatusCodes.OK);
        done();
      });
    }, 20000);
  });
});
