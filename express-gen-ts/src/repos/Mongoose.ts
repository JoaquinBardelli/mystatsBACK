import jsonfile from "jsonfile";

import { IUsuario } from "@src/models/Usuario";
import Mongoose, { Connection, Model, Schema } from "mongoose";
import { Console } from "console";
import exp from "constants";
import { IJugador } from "@src/models/Jugador";
import { IFederacion } from "@src/models/Federacion";

// **** Variables **** //
const mongoose = require("mongoose");
//var uniqueValidator = require('mongoose-unique-validator');
// **** Types **** //
const tirosSchema = new Mongoose.Schema({
  tirosDeCampo: {
    type: Number,
    required: false,
  },
  tirosDeCampoConvertidos: {
    type: Number,
    required: false,
  },
  tirosDeDos: {
    type: Number,
    required: false,
  },
  tirosDeDosConvertidos: {
    type: Number,
    required: false,
  },
  tirosDeTres: {
    type: Number,
    required: false,
  },
  tirosDeTresConvertidos: {
    type: Number,
    required: false,
  },
  tirosLibres: {
    type: Number,
    required: false,
  },
  tirosLibresConvertidos: {
    type: Number,
    required: false,
  },
});

const estadisticasSchema = new Mongoose.Schema({
  minutosJugados: {
    type: Number,
    required: false,
  },
  segundosJugados: {
    type: Number,
    required: false,
  },
  puntos: {
    type: Number,
    required: false,
  },
  rebotesOfensivos: {
    type: Number,
    required: false,
  },
  rebotesDefensivos: {
    type: Number,
    required: false,
  },
  asistencias: {
    type: Number,
    required: false,
  },
  faltasCometidas: {
    type: Number,
    required: false,
  },
  faltasRecibidas: {
    type: Number,
    required: false,
  },
  taponesCometidos: {
    type: Number,
    required: false,
  },
  taponesRecibidos: {
    type: Number,
    required: false,
  },
  perdidas: {
    type: Number,
    required: false,
  },
  recuperaciones: {
    type: Number,
    required: false,
  },
  valoracion: {
    type: Number,
    required: false,
  },
  tiros: {
    type: tirosSchema, // Incluye el esquema de `tiros`
    required: false,
  },
});

const partidoSchema = new Mongoose.Schema({
  id: {
    type: Number,
    required: false,
  },
  fecha: {
    type: Date,
    required: false,
  },
  adversario: {
    type: String,
    required: false,
  },
  puntosPropioClub: {
    type: Number,
    required: false,
  },
  puntosAdversario: {
    type: Number,
    required: false,
  },
  estadisticas: {
    type: estadisticasSchema, // Suponiendo que "partidos" es una lista de objetos
    required: false,
  },
});

const jugadorSchema = new Mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  nacimiento: {
    type: Date,
    required: true,
  },
  club: {
    type: String,
    required: true,
  },
  dorsal: {
    type: Number,
    required: true,
  },
  altura: {
    type: Number,
    required: true,
  },
  peso: {
    type: Number,
    required: true,
  },
  partidos: {
    type: [partidoSchema], // Suponiendo que "partidos" es una lista de objetos
    default: [],
    required: false,
  },
});
process.env.CADUCIDAD_TOKEN = "48h";
process.env.SEED_AUTENTICACION =
  process.env.SEED_AUTENTICACION || "este-es-el-seed-desarrollo";

const usuarioSchema: Schema = new Mongoose.Schema({
  id: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  created: { type: Date, required: true },
  jugador: { type: jugadorSchema, required: true },
});

usuarioSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

const federacionSchema: Schema = new Mongoose.Schema({
  id: { type: Number, required: true },
  nombre: { type: String, required: true },
  clubes: { type: [String], required: true },
});
/*usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
})*/

// **** Functions **** //

/**
 * Fetch the json from the file.
 */
const db: Connection = Mongoose.createConnection(
   "mongodb://172.31.178.104:27017/mystats"
);

export const usuarioModel = db.model<IUsuario>("usuarios", usuarioSchema);
export const federacionModel = db.model<IFederacion>(
  "federaciones",
  federacionSchema
);

//HACER QUE HAYA UNA FUNCION QUE ABRA LA COLECCION COMIDAAS Y OTRA PERSONAS

function openDb(): Promise<any> {
  return new Promise((resolve, reject) => {
    usuarioModel
      .find({})
      .then((data: any) => {
        resolve(data);
        console.log("Funciono");
      })
      .catch((error: Error) => {
        console.error("Error al obtener personas:", error);
        reject(error);
      });
  });
}

function saveDb(db: IUsuario[]): Promise<void> {
  return new Promise((resolve, reject) => {
    usuarioModel
      .deleteMany({})
      .then()
      .catch((err: any) => {
        console.error("Error al eliminar documentos de la colección:", err);
        reject(err);
      });
    usuarioModel
      .insertMany(db)
      .then(() => {
        resolve();
      })
      .catch((err: any) => {
        console.error(err);
        reject(err);
      });
  });
}

export default {
  openDb,
  saveDb,
} as const;
