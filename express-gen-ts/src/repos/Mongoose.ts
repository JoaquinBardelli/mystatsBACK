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
const tirosSchema = new Mongoose.Schema({
    tirosDeCampo: {
      type: Number,
      required: true
    },
    tirosDeCampoConvertidos: {
      type: Number,
      required: true
    },
    tirosDeDos: {
      type: Number,
      required: true
    },
    tirosDeDosConvertidos: {
      type: Number,
      required: true
    },
    tirosDeTres: {
      type: Number,
      required: true
    },
    tirosDeTresConvertidos: {
      type: Number,
      required: true
    },
    tirosLibres: {
      type: Number,
      required: true
    },
    tirosLibresConvertidos: {
      type: Number,
      required: true
    }
});

const estadisticasSchema = new Mongoose.Schema({
  minutosJugados: {
    type: Number,
    required: true
  },
  segundosJugados: {
    type: Number,
    required: true
  },
  puntos: {
    type: Number,
    required: true
  },
  rebotesOfensivos: {
    type: Number,
    required: true
  },
  rebotesDefensivos: {
    type: Number,
    required: true
  },
  asistencias: {
    type: Number,
    required: true
  },
  faltasCometidas: {
    type: Number,
    required: true
  },
  faltasRecibidas: {
    type: Number,
    required: true
  },
  taponesCometidos: {
    type: Number,
    required: true
  },
  taponesRecibidos: {
    type: Number,
    required: true
  },
  perdidas: {
    type: Number,
    required: true
  },
  recuperaciones: {
    type: Number,
    required: true
  },
  valoracion: {
    type: Number,
    required: true
  },
  tiros: {
    type: tirosSchema,  // Incluye el esquema de `tiros`
    required: false
  }
});


const partidoSchema = new Mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  adversario: {
    type: String,
    required: true
  },
  puntosPropioClub: {
    type: Number,
    required: true
  },
  puntosAdversario: {
    type: Number,
    required: true
  },
  estadisticas: {
    type: [estadisticasSchema],  // Suponiendo que "partidos" es una lista de objetos
    default: [],
    required: false
  }
});

const jugadorSchema = new Mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  nacimiento: {
    type: Date,
    required: true
  },
  club: {
    type: String,
    required: true
  },
  dorsal: {
    type: Number,
    required: true
  },
  altura: {
    type: Number,
    required: true
  },
  peso: {
    type: Number,
    required: true
  },
  partidos: {
    type: [partidoSchema],  // Suponiendo que "partidos" es una lista de objetos
    default: [],
    required: false
  }
});
process.env.CADUCIDAD_TOKEN = '48h';
process.env.SEED_AUTENTICACION = process.env.SEED_AUTENTICACION ||  'este-es-el-seed-desarrollo';

const usuarioSchema: Schema = new Mongoose.Schema({
    id: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    created: { type: Date, required: true },
    jugador: {  type: jugadorSchema, required: true },
});

usuarioSchema.methods.toJSON = function() {   let user = this;
    let userObject = user.toObject();
    delete userObject.password;   return userObject;
};

/*usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
})*/

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