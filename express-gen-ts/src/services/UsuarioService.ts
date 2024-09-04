import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import UsuarioRepo from '@src/repos/UsuarioRepo';
import { IUsuario } from '@src/models/Usuario';
import { IJugador } from '@src/models/Jugador';
import { IEstadisticas } from '@src/models/Estadisticas';
import { IPartido } from '@src/models/Partido';


// **** Variables **** //

export const usuario_NOT_FOUND_ERR = 'usuario not found';


// **** Functions **** //
/*function login(usuario: IUsuario): Promise<string> {
  console.log("Usuario en service " + usuario);
  return UsuarioRepo.login(usuario);
}*/
function login(usuario: IUsuario): Promise<{ token: string }> {
  console.log("Usuario en service " + usuario);
  return UsuarioRepo.login(usuario);
}

/*function register(usuario: IUsuario): Promise<string> {
  return UsuarioRepo.register(usuario);
}*/

function register(usuario: IUsuario): Promise<{ token: string }> {
  return UsuarioRepo.register(usuario);
}


function agregarPartido(email:string ,partido: IPartido): Promise<void> {
  return UsuarioRepo.agregarPartido(email, partido);
}

// **** Promedio **** //
async function promedio(usuario : IUsuario): Promise<IEstadisticas>{
  console.log("Usuario en service promedio" + usuario);
  return UsuarioRepo.getPromedioEstadisticas(usuario);
}

async function traerDatosPersonales(usuario:IUsuario): Promise<IJugador>{
  const datos = await UsuarioRepo.traerDatosPersonales(usuario);
  return datos;
}

async function partidosPorPuntos(usuario:IUsuario): Promise<IPartido[]>{
  const partidos = await UsuarioRepo.partidosPorPuntos(usuario);
  return partidos;
}

async function partidosPorMinutos(usuario:IUsuario): Promise<IPartido[]>{
  const partidos = await UsuarioRepo.partidosPorMinutos(usuario);
  return partidos;
}

async function partidosPorAsistencias(usuario:IUsuario): Promise<IPartido[]>{
  const partidos = await UsuarioRepo.partidosPorAsistencias(usuario);
  return partidos;
}

async function partidosPorRebotes(usuario:IUsuario): Promise<IPartido[]>{
  const partidos = await UsuarioRepo.partidosPorRebotes(usuario);
  return partidos;
}

async function partidosPorValoracion(usuario:IUsuario): Promise<IPartido[]>{
  const partidos = await UsuarioRepo.partidosPorValoracion(usuario);
  return partidos;
}


// **** Export default **** //

export default {
  login,
  register,
  promedio,
  agregarPartido,
  traerDatosPersonales,
  partidosPorPuntos,
  partidosPorMinutos,
  partidosPorAsistencias,
  partidosPorRebotes,
  partidosPorValoracion,
} as const;
