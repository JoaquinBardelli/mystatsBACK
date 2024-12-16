import Mongoose, { Connection, Model, Schema } from "mongoose";
import { IUsuario } from "@src/models/Usuario";
import { IFederacion } from "@src/models/Federacion";

// **** Variables de Entorno **** //
process.env.CADUCIDAD_TOKEN = "48h";
process.env.SEED_AUTENTICACION =
  process.env.SEED_AUTENTICACION || "este-es-el-seed-desarrollo";

// **** Configuración de MongoDB **** //

const mongoUri = "mongodb://172.31.178.104:27017/mystats";
const connectionOptions = {
  serverSelectionTimeoutMS: 5000, // Timeout explícito para evitar bloqueos
};

const db: Connection = Mongoose.createConnection(mongoUri, connectionOptions);

db.on("connected", () => console.log("✅ Conexión a MongoDB exitosa"));
db.on("error", (err) => {
  console.error("❌ Error al conectar a MongoDB:", err.message);
  process.exit(1); // Termina el proceso con error
});

// **** Schemas **** //

const tirosSchema = new Mongoose.Schema({
  tirosDeCampo: { type: Number, required: false },
  tirosDeCampoConvertidos: { type: Number, required: false },
  tirosDeDos: { type: Number, required: false },
  tirosDeDosConvertidos: { type: Number, required: false },
  tirosDeTres: { type: Number, required: false },
  tirosDeTresConvertidos: { type: Number, required: false },
  tirosLibres: { type: Number, required: false },
  tirosLibresConvertidos: { type: Number, required: false },
});

const estadisticasSchema = new Mongoose.Schema({
  minutosJugados: { type: Number, required: false },
  segundosJugados: { type: Number, required: false },
  puntos: { type: Number, required: false },
  rebotesOfensivos: { type: Number, required: false },
  rebotesDefensivos: { type: Number, required: false },
  asistencias: { type: Number, required: false },
  faltasCometidas: { type: Number, required: false },
  faltasRecibidas: { type: Number, required: false },
  taponesCometidos: { type: Number, required: false },
  taponesRecibidos: { type: Number, required: false },
  perdidas: { type: Number, required: false },
  recuperaciones: { type: Number, required: false },
  valoracion: { type: Number, required: false },
  tiros: { type: tirosSchema, required: false },
});

const partidoSchema = new Mongoose.Schema({
  id: { type: Number, required: false },
  fecha: { type: Date, required: false },
  adversario: { type: String, required: false },
  puntosPropioClub: { type: Number, required: false },
  puntosAdversario: { type: Number, required: false },
  estadisticas: { type: estadisticasSchema, required: false },
});

const jugadorSchema = new Mongoose.Schema({
  id: { type: Number, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  nacimiento: { type: Date, required: true },
  club: { type: String, required: true },
  dorsal: { type: Number, required: true },
  altura: { type: Number, required: true },
  peso: { type: Number, required: true },
  partidos: { type: [partidoSchema], default: [], required: false },
});

const usuarioSchema: Schema = new Mongoose.Schema({
  id: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  created: { type: Date, required: true },
  jugador: { type: jugadorSchema, required: true },
});

usuarioSchema.methods.toJSON = function () {
  let user = this.toObject();
  delete user.password;
  return user;
};

const federacionSchema: Schema = new Mongoose.Schema({
  id: { type: Number, required: true },
  nombre: { type: String, required: true },
  clubes: { type: [String], required: true },
});

// **** Models **** //

export const usuarioModel = db.model<IUsuario>("usuarios", usuarioSchema);
export const federacionModel = db.model<IFederacion>(
  "federaciones",
  federacionSchema
);

// **** Funciones **** //

/**
 * Abre la colección de usuarios.
 */
function openUsuarios(): Promise<any> {
  return usuarioModel.find({});
}

/**
 * Guarda datos en la colección de usuarios.
 */
function saveUsuarios(data: IUsuario[]): Promise<void> {
  return usuarioModel
    .deleteMany({})
    .then(() => usuarioModel.insertMany(data))
    .then(() => console.log("✅ Usuarios guardados correctamente."))
    .catch((err) => {
      console.error("❌ Error al guardar usuarios:", err.message);
      throw err;
    });
}

/**
 * Abre la colección de comidas.
 */
function openComidas(): Promise<any> {
  const comidaModel = db.model("comidas", new Mongoose.Schema({}));
  return comidaModel.find({});
}

/**
 * Abre la colección de personas.
 */
function openPersonas(): Promise<any> {
  const personaModel = db.model("personas", new Mongoose.Schema({}));
  return personaModel.find({});
}

// **** Exportación **** //

export default {
  openUsuarios,
  saveUsuarios,
  openComidas,
  openPersonas,
} as const;
