import { IUsuario } from '@src/models/Usuario';
import { getRandomInt } from '@src/util/misc';
import orm from './MockOrm';
import { usuarioModel } from './Mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import EnvVars from '@src/common/EnvVars';
import { token } from 'morgan';
import { IEstadisticas } from '@src/models/Estadisticas';
import { ITiros } from '@src/models/Tiros';
import { IPartido } from '@src/models/Partido';
import { get } from 'http';
 
 
// **** Functions **** //
async function login(usuario: IUsuario): Promise<string> {
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
  if (!bcrypt.compareSync(usuario.password, user.password)) {
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

async function register(usuario: IUsuario): Promise<string> {
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
}

async function agregarPartido(email: string, partido: IPartido): Promise<void> {
  const usuario = await usuarioModel.findOne({ email }).exec();
  if (!usuario) {
      throw new Error('Usuario no encontrado');
  }

  usuario.jugador.partidos.add(partido);
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

async function getPromedioEstadisticas(usuario: IUsuario): Promise<IEstadisticas> {
  console.log("Usuario en repo promedio" + usuario);
  console.log("Usuario en repo promedio" + usuario.email);
  const user = await usuarioModel.findOne({ email: usuario.email }).exec();
  console.log("Resultado de findone" + user);
  console.log("Resultado de findone", JSON.stringify(user, null, 2));

  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  return calcularPromedioEstadisticas(user.jugador.partidos);
}

function calcularPromedioEstadisticas(partidos:Set<IPartido>):IEstadisticas{
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
    }
  };
  
  for(const partido of partidos){
    console.log(partido.estadisticas);
    console.log(partido.estadisticas.tiros);
    estadisticasPromedio.minutosJugados += partido.estadisticas.minutosJugados;
    estadisticasPromedio.segundosJugados += partido.estadisticas.segundosJugados;
    estadisticasPromedio.puntos += partido.estadisticas.puntos;
    estadisticasPromedio.rebotesOfensivos += partido.estadisticas.rebotesOfensivos;
    estadisticasPromedio.rebotesDefensivos += partido.estadisticas.rebotesDefensivos;
    estadisticasPromedio.asistencias += partido.estadisticas.asistencias;
    estadisticasPromedio.perdidas += partido.estadisticas.perdidas;
    estadisticasPromedio.recuperaciones += partido.estadisticas.recuperaciones;
    estadisticasPromedio.faltasCometidas += partido.estadisticas.faltasCometidas;
    estadisticasPromedio.faltasRecibidas += partido.estadisticas.faltasRecibidas;
    estadisticasPromedio.taponesCometidos += partido.estadisticas.taponesCometidos;
    estadisticasPromedio.taponesRecibidos += partido.estadisticas.taponesRecibidos;
    estadisticasPromedio.valoracion += partido.estadisticas.valoracion;
    estadisticasPromedio.tiros.tirosDeCampo += partido.estadisticas.tiros.tirosDeCampo;
    estadisticasPromedio.tiros.tirosDeCampoConvertidos += partido.estadisticas.tiros.tirosDeCampoConvertidos;
    estadisticasPromedio.tiros.tirosDeDos += partido.estadisticas.tiros.tirosDeDos;
    estadisticasPromedio.tiros.tirosDeDosConvertidos += partido.estadisticas.tiros.tirosDeDosConvertidos;
    estadisticasPromedio.tiros.tirosDeTres += partido.estadisticas.tiros.tirosDeTres;
    estadisticasPromedio.tiros.tirosDeTresConvertidos += partido.estadisticas.tiros.tirosDeTresConvertidos;
    estadisticasPromedio.tiros.tirosLibres += partido.estadisticas.tiros.tirosLibres;
    estadisticasPromedio.tiros.tirosLibresConvertidos += partido.estadisticas.tiros.tirosLibresConvertidos;
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

  return estadisticasPromedio;
}

function calcularPorcentajes(tiros:ITiros){
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
async function getAll(): Promise<IUsuario[]> {
  const db = await orm.openDb();
  return db.usuarios;
}
 
/**
* Add one usuario.
*/
async function add(usuario: IUsuario): Promise<void> {
  const db = await orm.openDb();
  usuario.id = getRandomInt();
  db.usuarios.push(usuario);
  return orm.saveDb(db);
}
 
/**
* Update a usuario.
*/
async function update(usuario: IUsuario): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.usuarios.length; i++) {
    if (db.usuarios[i].id === usuario.id) {
      const dbusuario = db.usuarios[i];
      db.usuarios[i] = {
        ...dbusuario,
        email: usuario.email,
        password: usuario.password,
      };
      return orm.saveDb(db);
    }
  }
}
 
/**
* Delete one usuario.
*/
async function delete_(id: number): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.usuarios.length; i++) {
    if (db.usuarios[i].id === id) {
      db.usuarios.splice(i, 1);
      return orm.saveDb(db);
    }
  }
}

async function getLogeado(): Promise<IUsuario | null> {
    const db = await orm.openDb();
    for (const usuario of db.usuarios) {
        if (usuario.logeado) {
        return usuario;
        }
    }
    return null;
}
 
 
// **** Export default **** //
 
export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
  getLogeado,
  login,
  register,
  getPromedioEstadisticas,
  agregarPartido,
} as const