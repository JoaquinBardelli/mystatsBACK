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

// **** Tests **** //

describe("Usuario", () => {
  let agent: TestAgent<Test>;

  beforeAll((done) => {
    agent = supertest.agent(app);
    
    
    done();
  });
  // **** User Tests **** //

  describe(`GET: ${
    Paths.Base + Paths.Usuarios.Base + Paths.Usuarios.Get
  }`, () => {
    const api = (cb: TApiCb) =>
      agent
        .get( Paths.Base + Paths.Usuarios.Base + Paths.Usuarios.Get)
        .end(apiCb(cb));

    it("should return status 200.", (done) => {
      api((res) => {
        expect(res.status).toBe(HttpStatusCodes.OK);
        done();
      });
    }, 20000);
  });
});
