import { IUsuario } from "@src/models/Usuario";
import { getRandomInt } from "@src/util/misc";
import orm from "./MockOrm";
import { federacionModel, usuarioModel } from "./Mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import EnvVars from "@src/common/EnvVars";
import { token } from "morgan";
import { IEstadisticas } from "@src/models/Estadisticas";
import { ITiros } from "@src/models/Tiros";
import { IPartido } from "@src/models/Partido";
import { get } from "http";
import { IJugador } from "@src/models/Jugador";
import { IFederacion } from "@src/models/Federacion";

// **** Functions **** //
/*async function login(usuario: IUsuario): Promise<string> {
  //traer los datos de mongo del usuario con ese email  
  const usuarios = await usuarioModel.findOne({ email: usuario.email }).exec();
  console.log("Datos traidos de mongo" + usuarios);
  //console.log(usuarios.get); 
  console.log("Usuario en repo" + usuario);
  const user = await usuarioModel.findOne({ email: usuario.email }).exec();
  console.log("Resultado de findone" + user);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  /*if (usuario.password !== user.password) {
    throw new Error('Contraseña incorrecta');
  } else {
    console.log("Contraseña correcta");
    console.log("Usuario logeado: " + user);
    // Aquí puedes continuar con el proceso de login, como generar un token JWT.
    return "Login exitoso";
  }*/
/*if (!bcrypt.compareSync(usuario.password, user.password)) {
  throw new Error('Contraseña incorrecta');
}else{
  console.log("Contraseña correcta");
  console.log("Usuario logeado: " + user);
}
const token = jwt.sign({ 
  usuario: user,
}, EnvVars.Jwt.Secret, {
  expiresIn: "48h"
});
return token;
}*/

async function login(usuario: IUsuario): Promise<{ token: string }> {
  const user = await usuarioModel.findOne({ email: usuario.email }).exec();

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  if (!bcrypt.compareSync(usuario.password, user.password)) {
    throw new Error("Contraseña incorrecta");
  }

  const token = jwt.sign({ usuario: user }, EnvVars.Jwt.Secret, {
    expiresIn: "48h",
  });

  console.log("Usuario logeado: " + usuario.email + " con token: " + token);

  return { token };
}

/*async function register(usuario: IUsuario): Promise<string> {
  console.log("Usuario en repo" + usuario);
  const existingUser = "";
  console.log(await usuarioModel.findOne({ email: usuario.email }).exec());
  if (existingUser) {
    throw new Error('Usuario ya existe');
  }
  const salt = bcrypt.genSaltSync(10);
  usuario.password = bcrypt.hashSync(usuario.password, salt);
  const newUser = new usuarioModel(usuario);
  await newUser.save();
  const token = jwt.sign({ 
    usuario: newUser,
  }, EnvVars.Jwt.Secret, {
    expiresIn: "48h"
  });
  return token;
}*/

/*async function register(usuario: IUsuario): Promise<string> {
  console.log("Usuario en repo", usuario);

  // Busca si el usuario ya existe en la base de datos
  const existingUser = await usuarioModel.findOne({ email: usuario.email }).exec();
  console.log("Lo que encuentra en findOne "+ existingUser);

  if (existingUser) {
    throw new Error('Usuario ya existe');
  }

  // Hashea la contraseña
  const salt = bcrypt.genSaltSync(10);
  usuario.password = bcrypt.hashSync(usuario.password, salt);

  // Crea una nueva instancia del modelo y guarda en la base de datos
  const newUser = new usuarioModel(usuario);
  await newUser.save()
  .then(() => console.log('Usuario guardado correctamente'))
  .catch(err => console.error('Error al guardar el usuario:', err));

  // Genera un token JWT
  const token = jwt.sign({ 
    usuario: newUser,
  }, EnvVars.Jwt.Secret, {
    expiresIn: "48h"
  });

  return token;
}*/

async function register(usuario: IUsuario): Promise<{ token: string }> {
  const existingUser = await usuarioModel
    .findOne({ email: usuario.email })
    .exec();

  if (existingUser) {
    throw new Error("Usuario ya existe");
  }

  const salt = bcrypt.genSaltSync(10);
  usuario.password = bcrypt.hashSync(usuario.password, salt);

  const newUser = new usuarioModel(usuario);
  await newUser.save();

  const token = jwt.sign({ usuario: newUser }, EnvVars.Jwt.Secret, {
    expiresIn: "48h",
  });

  // Devolver el token al frontend
  console.log("USUARIO REGISTRADO: " + usuario.email);
  return { token };
}

async function agregarPartido(email: string, partido: IPartido): Promise<void> {
  const usuario = await usuarioModel.findOne({ email }).exec();
  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }
  console.log("Partido en repo agregarPartido" + partido);
  /*const partidosArray = Array.from(usuario.jugador.partidos);
  partidosArray.push(partido);
  usuario.jugador.partidos = new Set(partidosArray);*/
  usuario.jugador.partidos.push(partido);
  console.log("despues de agregar" + usuario.jugador.partidos);
  await usuario.save();
}
/*

async function agregarPartido(req: Request, res: Response) {
  // Extraer el token del header de autorización
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    // Verificar y decodificar el token JWT
    const decoded = jwt.verify(token, EnvVars.Jwt.Secret) as { usuario: any };

    // Extraer el ID del usuario desde el token decodificado
    const userId = decoded.usuario._id;

    // Buscar al usuario en la base de datos
    const user = await usuarioModel.findById(userId).exec();

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Agregar el partido al usuario
    const partido: IPartido = req.body;
    user.jugador.partidos.add(partido);

    // Guardar los cambios en la base de datos
    await user.save();

    res.status(200).json({ message: 'Partido agregado correctamente' });
  } catch (err) {
    console.error('Error al agregar el partido:', err);
    res.status(500).json({ message: 'Error al agregar el partido' });
  }
}

};
 */

async function getPromedioEstadisticas(
  usuario: IUsuario
): Promise<IEstadisticas> {
  console.log("Usuario en repo promedio" + usuario);
  console.log("Usuario en repo promedio" + usuario.email);
  const user = await usuarioModel.findOne({ email: usuario.email }).exec();
  console.log("Resultado de findone" + user);
  console.log("Resultado de findone", JSON.stringify(user, null, 2));

  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  return calcularPromedioEstadisticas(user.jugador.partidos);
}

function calcularPromedioEstadisticas(partidos: IPartido[]): IEstadisticas {
  let contador = 0;
  const estadisticasPromedio = {
    minutosJugados: 0,
    segundosJugados: 0,
    puntos: 0,
    rebotesOfensivos: 0,
    rebotesDefensivos: 0,
    asistencias: 0,
    perdidas: 0,
    recuperaciones: 0,
    faltasCometidas: 0,
    faltasRecibidas: 0,
    taponesCometidos: 0,
    taponesRecibidos: 0,
    valoracion: 0,
    tiros: {
      tirosDeCampo: 0,
      tirosDeCampoConvertidos: 0,
      tirosDeDos: 0,
      tirosDeDosConvertidos: 0,
      tirosDeTres: 0,
      tirosDeTresConvertidos: 0,
      tirosLibres: 0,
      tirosLibresConvertidos: 0,
    },
  };

  for (const partido of partidos) {
    console.log(partido.estadisticas.taponesCometidos);
    estadisticasPromedio.minutosJugados += partido.estadisticas.minutosJugados;
    estadisticasPromedio.segundosJugados +=
      partido.estadisticas.segundosJugados;
    estadisticasPromedio.puntos += partido.estadisticas.puntos;
    estadisticasPromedio.rebotesOfensivos +=
      partido.estadisticas.rebotesOfensivos;
    estadisticasPromedio.rebotesDefensivos +=
      partido.estadisticas.rebotesDefensivos;
    estadisticasPromedio.asistencias += partido.estadisticas.asistencias;
    estadisticasPromedio.perdidas += partido.estadisticas.perdidas;
    estadisticasPromedio.recuperaciones += partido.estadisticas.recuperaciones;
    estadisticasPromedio.faltasCometidas +=
      partido.estadisticas.faltasCometidas;
    estadisticasPromedio.faltasRecibidas +=
      partido.estadisticas.faltasRecibidas;
    estadisticasPromedio.taponesCometidos +=
      partido.estadisticas.taponesCometidos;
    estadisticasPromedio.taponesRecibidos +=
      partido.estadisticas.taponesRecibidos;
    estadisticasPromedio.valoracion += partido.estadisticas.valoracion;
    estadisticasPromedio.tiros.tirosDeCampo +=
      partido.estadisticas.tiros.tirosDeCampo;
    estadisticasPromedio.tiros.tirosDeCampoConvertidos +=
      partido.estadisticas.tiros.tirosDeCampoConvertidos;
    estadisticasPromedio.tiros.tirosDeDos +=
      partido.estadisticas.tiros.tirosDeDos;
    estadisticasPromedio.tiros.tirosDeDosConvertidos +=
      partido.estadisticas.tiros.tirosDeDosConvertidos;
    estadisticasPromedio.tiros.tirosDeTres +=
      partido.estadisticas.tiros.tirosDeTres;
    estadisticasPromedio.tiros.tirosDeTresConvertidos +=
      partido.estadisticas.tiros.tirosDeTresConvertidos;
    estadisticasPromedio.tiros.tirosLibres +=
      partido.estadisticas.tiros.tirosLibres;
    estadisticasPromedio.tiros.tirosLibresConvertidos +=
      partido.estadisticas.tiros.tirosLibresConvertidos;
    contador++;
  }
  estadisticasPromedio.minutosJugados /= contador;
  estadisticasPromedio.segundosJugados /= contador;
  estadisticasPromedio.puntos /= contador;
  estadisticasPromedio.rebotesOfensivos /= contador;
  estadisticasPromedio.rebotesDefensivos /= contador;
  estadisticasPromedio.asistencias /= contador;
  estadisticasPromedio.perdidas /= contador;
  estadisticasPromedio.recuperaciones /= contador;
  estadisticasPromedio.faltasCometidas /= contador;
  estadisticasPromedio.faltasRecibidas /= contador;
  estadisticasPromedio.taponesCometidos /= contador;
  estadisticasPromedio.taponesRecibidos /= contador;
  estadisticasPromedio.valoracion /= contador;
  estadisticasPromedio.tiros.tirosDeCampo /= contador;
  estadisticasPromedio.tiros.tirosDeCampoConvertidos /= contador;
  estadisticasPromedio.tiros.tirosDeDos /= contador;
  estadisticasPromedio.tiros.tirosDeDosConvertidos /= contador;
  estadisticasPromedio.tiros.tirosDeTres /= contador;
  estadisticasPromedio.tiros.tirosDeTresConvertidos /= contador;
  estadisticasPromedio.tiros.tirosLibres /= contador;
  estadisticasPromedio.tiros.tirosLibresConvertidos /= contador;

  console.log("Estadisticas promedio" + estadisticasPromedio.taponesCometidos);
  return estadisticasPromedio;
}

function calcularPorcentajes(tiros: ITiros) {
  const porcentajes = {
    porcCampo: 0,
    porcDos: 0,
    porcTres: 0,
    porcLibres: 0,
  };
  porcentajes.porcCampo = tiros.tirosDeCampoConvertidos / tiros.tirosDeCampo;
  porcentajes.porcDos = tiros.tirosDeDosConvertidos / tiros.tirosDeDos;
  porcentajes.porcTres = tiros.tirosDeTresConvertidos / tiros.tirosDeTres;
  porcentajes.porcLibres = tiros.tirosLibresConvertidos / tiros.tirosLibres;
  return porcentajes;
}

/**
 * Get one usuario.
 */
async function getOne(email: string): Promise<IUsuario | null> {
  const db = await orm.openDb();
  for (const usuario of db.usuarios) {
    if (usuario.email === email) {
      return usuario;
    }
  }
  return null;
}

/**
 * See if a usuario with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  const db = await orm.openDb();
  for (const usuario of db.usuarios) {
    if (usuario.id === id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all usuarios.
 */

async function traerDatosPersonales(usuario: IUsuario): Promise<IJugador> {
  const user = await usuarioModel.findOne({ email: usuario.email }).exec();
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  const jugador = user.jugador;
  return jugador;
}

async function partidosPorPuntos(usuario: IUsuario): Promise<IPartido[]> {
  // Buscar el usuario en la base de datos
  const user = await usuarioModel.findOne({ email: usuario.email }).exec();
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  // Obtener los partidos del jugador
  const partidos = user.jugador.partidos;

  // Ordenar los partidos desde el que tuvo más puntos al que tuvo menos
  //const partidosOrdenados = partidos.sort((a: IPartido, b: IPartido) => b.estadisticas.puntos - a.estadisticas.puntos);
  if (
    !user ||
    !user.jugador ||
    !user.jugador.partidos ||
    user.jugador.partidos.length === 0
  ) {
    return [];
  }

  // Ordenar los partidos de mayor a menor según los puntos
  const partidosOrdenados = [...user.jugador.partidos].sort(
    (a, b) => b.estadisticas.puntos - a.estadisticas.puntos
  );
  console.log("Partidos ordenados por puntos: ", partidosOrdenados);

  return partidosOrdenados;
}

async function partidosPorMinutos(usuario: IUsuario): Promise<IPartido[]> {
  // Buscar el usuario en la base de datos
  const user = await usuarioModel.findOne({ email: usuario.email }).exec();
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const partidos = user.jugador.partidos;

  const partidosOrdenados = user.jugador.partidos.sort((a, b) => {
    const tiempoA =
      a.estadisticas.minutosJugados * 60 + a.estadisticas.segundosJugados;
    const tiempoB =
      b.estadisticas.minutosJugados * 60 + b.estadisticas.segundosJugados;

    // Ordenar de mayor a menor
    return tiempoB - tiempoA;
  });
  return partidosOrdenados;
}

async function partidosPorAsistencias(usuario: IUsuario): Promise<IPartido[]> {
  // Buscar el usuario en la base de datos
  const user = await usuarioModel.findOne({ email: usuario.email }).exec();
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const partidos = user.jugador.partidos;

  const partidosOrdenados = partidos
    .filter((partido) => partido.estadisticas.asistencias >= 0) // Aseguramos que las asistencias sean válidas
    .sort((a, b) => b.estadisticas.asistencias - a.estadisticas.asistencias);

  return partidosOrdenados;
}

async function partidosPorRebotes(usuario: IUsuario): Promise<IPartido[]> {
  // Buscar el usuario en la base de datos
  const user = await usuarioModel.findOne({ email: usuario.email }).exec();
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const partidos = user.jugador.partidos;

  // Ordenar los partidos de mayor a menor según la sumatoria de rebotes (ofensivos + defensivos)
  const partidosOrdenados = partidos
    .filter(
      (partido) =>
        partido.estadisticas.rebotesOfensivos >= 0 &&
        partido.estadisticas.rebotesDefensivos >= 0
    ) // Aseguramos que los rebotes sean válidos
    .sort((a, b) => {
      const rebotesA =
        a.estadisticas.rebotesOfensivos + a.estadisticas.rebotesDefensivos;
      const rebotesB =
        b.estadisticas.rebotesOfensivos + b.estadisticas.rebotesDefensivos;

      // Ordenar de mayor a menor
      return rebotesB - rebotesA;
    });

  return partidosOrdenados;
}

async function partidosPorValoracion(usuario: IUsuario): Promise<IPartido[]> {
  // Buscar el usuario en la base de datos
  const user = await usuarioModel.findOne({ email: usuario.email }).exec();
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const partidos = user.jugador.partidos;

  // Ordenar los partidos de mayor a menor según la valoración
  const partidosOrdenados = partidos
    .filter((partido) => partido.estadisticas.valoracion !== undefined) // Aseguramos que exista una valoración
    .sort((a, b) => {
      // Ordenar de mayor a menor
      return b.estadisticas.valoracion - a.estadisticas.valoracion;
    });

  return partidosOrdenados;
}

async function getFederaciones(id: number): Promise<string[]> {
  const federaciones = await federacionModel.find().exec();
  if (!federaciones) {
    throw new Error("Federaciones no encontradas");
  }
  console.log("CLUBES" + federaciones[id]);
  const federacion = federaciones[id] as IFederacion;
  return federacion.clubes;
}

// **** Export default **** //

export default {
  getOne,
  persists,
  login,
  register,
  getPromedioEstadisticas,
  agregarPartido,
  traerDatosPersonales,
  partidosPorPuntos,
  partidosPorMinutos,
  partidosPorAsistencias,
  partidosPorRebotes,
  partidosPorValoracion,
  getFederaciones,
} as const;
