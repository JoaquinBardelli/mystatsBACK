import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import UsuarioRepo from '@src/repos/UsuarioRepo';
import { IUsuario } from '@src/models/Usuario';
import { IJugador } from '@src/models/Jugador';
import { IEstadisticas } from '@src/models/Estadisticas';
import { IPartido } from '@src/models/Partido';
import { IFederacion } from '@src/models/Federacion';
import e from 'express';


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
async function promedio(email : string): Promise<IEstadisticas>{
  console.log("Usuario en service promedio" + email);
  return UsuarioRepo.getPromedioEstadisticas(email);
}

async function traerDatosPersonales(email : string): Promise<IJugador>{
  const datos = await UsuarioRepo.traerDatosPersonales(email);
  return datos;
}

async function partidosPorPuntos(email : string, pagina:number): Promise<IPartido[]>{
  const partidos = await UsuarioRepo.partidosPorPuntos(email, pagina);
  return partidos;
}

async function partidosPorMinutos(email : string, pagina:number): Promise<IPartido[]>{
  const partidos = await UsuarioRepo.partidosPorMinutos(email, pagina);
  return partidos;
}

async function partidosPorAsistencias(email : string, pagina:number): Promise<IPartido[]>{
  const partidos = await UsuarioRepo.partidosPorAsistencias(email, pagina);
  return partidos;
}

async function partidosPorRebotes(email : string, pagina:number): Promise<IPartido[]>{
  const partidos = await UsuarioRepo.partidosPorRebotes(email, pagina);
  return partidos;
}

async function partidosPorValoracion(email : string, pagina:number): Promise<IPartido[]>{
  const partidos = await UsuarioRepo.partidosPorValoracion(email, pagina);
  return partidos;
}

async function getFederaciones(id:number): Promise<string[]> {
  return UsuarioRepo.getFederaciones(id);
}

async function traerCantidadPartidos(email:string): Promise<number>{
  return UsuarioRepo.traerCantidadPartidos(email);
}

async function traerFederacion(email : string): Promise<IFederacion>{
  return UsuarioRepo.traerFederacion(email);
}

async function get(): Promise<IUsuario[]> {
  return UsuarioRepo.Get();
}
// **** Export default **** //

export default {
  get,
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
  getFederaciones,
  traerCantidadPartidos,
  traerFederacion
} as const;
