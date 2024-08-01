import jsonfile from "jsonfile";

import { IUsuario } from "@src/models/Usuario";
import Mongoose, { Connection, Model, Schema } from "mongoose";
import { Console } from "console";
import exp from "constants";
import  { IJugador } from "@src/models/Jugador";

// **** Variables **** //
const mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
// **** Types **** //
const jugadorSchema: Schema = new Mongoose.Schema({

});
process.env.CADUCIDAD_TOKEN = '48h';
process.env.SEED_AUTENTICACION = process.env.SEED_AUTENTICACION ||  'este-es-el-seed-desarrollo';

const usuarioSchema: Schema = new Mongoose.Schema({
    id: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: Date, required: true },
    created: { type: Number, required: true },
    jugador: {  type: jugadorSchema, required: true },
});

usuarioSchema.methods.toJSON = function() {   let user = this;
    let userObject = user.toObject();
    delete userObject.password;   return userObject;
};

/*usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
})*/
module.exports = mongoose.model('Usuario', usuarioSchema);

// **** Functions **** //

/**
 * Fetch the json from the file.
 */
const db: Connection = Mongoose.createConnection(
  "mongodb://localhost:27017/mystats"
);

export const usuarioModel = db.model<IUsuario>("usuarios", usuarioSchema);

//HACER QUE HAYA UNA FUNCION QUE ABRA LA COLECCION COMIDAAS Y OTRA PERSONAS

function openDb(): Promise<any> {
  return new Promise((resolve, reject) => {
    usuarioModel
      .find({})
      .then((data: any) => {
        resolve(data);
        console.log("Funciono");})
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
  saveDb

} as const;