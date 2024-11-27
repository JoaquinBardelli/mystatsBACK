import supertest, { Test } from "supertest";
import TestAgent from "supertest/lib/agent";
import insertUrlParams from "inserturlparams";

import app from "@src/server";
import Usuario from "@src/models/Usuario";
import { IUsuario } from "@src/models/Usuario";
import HttpStatusCodes from "@src/common/HttpStatusCodes";
import Paths from "@src/common/Paths";
import mongoose from "mongoose";

// **** Tests **** //

describe("Usuario", () => {
  let agent: TestAgent<Test>;

  beforeAll(async () => {
    agent = supertest.agent(app);
  });

  afterAll(async () => {
    // Cerrar correctamente la conexión con la base de datos
    await mongoose.connection.close();
  });

  // **** User Tests **** //

  describe(`GET: ${Paths.Base + Paths.Usuarios.Base + Paths.Usuarios.Get}`, () => {
    it("should return status 200.", async () => {
      const res = await agent.get(Paths.Base + Paths.Usuarios.Base + Paths.Usuarios.Get);
      expect(res.status).toBe(HttpStatusCodes.OK);
    }, 20000);
  });
});
