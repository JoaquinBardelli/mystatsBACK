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
function login(usuario: IUsuario): Promise<string> {
  console.log("Usuario en service " + usuario);
  return UsuarioRepo.login(usuario);
}

function register(usuario: IUsuario): Promise<string> {
  return UsuarioRepo.register(usuario);
}

function agregarPartido(email:string ,partido: IPartido): Promise<void> {
  return UsuarioRepo.agregarPartido(email, partido);
}
/**
 * Get all usuarios.
 */
function getAll(): Promise<IUsuario[]> {
  return UsuarioRepo.getAll();
}

/**
 * Add one usuario.
 */
function addOne(usuario: IUsuario): Promise<void> {
  return UsuarioRepo.add(usuario);
}

/**
 * Update one usuario.
 */
async function updateOne(usuario: IUsuario): Promise<void> {
  const persists = await UsuarioRepo.persists(usuario.id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      usuario_NOT_FOUND_ERR,
    );
  }
  // Return usuario
  return UsuarioRepo.update(usuario);
}

/**
 * Delete a usuario by their id.
 */
async function _delete(id: number): Promise<void> {
  const persists = await UsuarioRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      usuario_NOT_FOUND_ERR,
    );
  }
  // Delete usuario
  return UsuarioRepo.delete(id);
}

/**
 * Add IJugador data to the usuario.
 */
async function agregarDatos(jugador: IJugador): Promise<void> {
  const usuario = await UsuarioRepo.getLogeado();
  if (!usuario) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      usuario_NOT_FOUND_ERR,
    );
  }
  usuario.jugador = jugador;
  return UsuarioRepo.update(usuario);
}

// **** Promedio **** //
async function promedio(usuario : IUsuario): Promise<IEstadisticas>{
  console.log("Usuario en service promedio" + usuario);
  return UsuarioRepo.getPromedioEstadisticas(usuario);
}

// **** Export default **** //

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
  agregarDatos,
  login,
  register,
  promedio,
  agregarPartido,
} as const;
