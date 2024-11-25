import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import UsuarioRepo from '@src/repos/UsuarioRepo';
import { IUsuario } from '@src/models/Usuario';
import { IJugador } from '@src/models/Jugador';
import { IEstadisticas } from '@src/models/Estadisticas';
import { IPartido } from '@src/models/Partido';
import { IFederacion } from '@src/models/Federacion';


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

async function partidosPorPuntos(usuario:IUsuario, pagina:number): Promise<IPartido[]>{
  const partidos = await UsuarioRepo.partidosPorPuntos(usuario, pagina);
  return partidos;
}

async function partidosPorMinutos(usuario:IUsuario, pagina:number): Promise<IPartido[]>{
  const partidos = await UsuarioRepo.partidosPorMinutos(usuario, pagina);
  return partidos;
}

async function partidosPorAsistencias(usuario:IUsuario, pagina:number): Promise<IPartido[]>{
  const partidos = await UsuarioRepo.partidosPorAsistencias(usuario, pagina);
  return partidos;
}

async function partidosPorRebotes(usuario:IUsuario, pagina:number): Promise<IPartido[]>{
  const partidos = await UsuarioRepo.partidosPorRebotes(usuario, pagina);
  return partidos;
}

async function partidosPorValoracion(usuario:IUsuario, pagina:number): Promise<IPartido[]>{
  const partidos = await UsuarioRepo.partidosPorValoracion(usuario, pagina);
  return partidos;
}

async function getFederaciones(id:number): Promise<string[]> {
  return UsuarioRepo.getFederaciones(id);
}

async function traerCantidadPartidos(usuario:IUsuario): Promise<number>{
  return UsuarioRepo.traerCantidadPartidos(usuario);
}

async function traerFederacion(usuario:IUsuario): Promise<IFederacion>{
  return UsuarioRepo.traerFederacion(usuario);
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
