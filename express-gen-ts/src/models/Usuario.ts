import moment from 'moment';
import { IJugador } from './Jugador';

// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';


// **** Types **** //

export interface IUsuario {
  id: number;
  email: string;
  password: string;
  created: Date;
  logeado?: boolean;
  jugador: IJugador;
}


// **** Functions **** //

/**
 * Create new User.
 */
function new_(
  email?: string,
  password?: string,
  created?: Date,
  logeado?: boolean,
  jugador?: IJugador,
  id?: number, // id last cause usually set by db
): IUsuario {
  return {
    id: (id ?? -1),
    email: (email ?? ''),
    password: (password ?? ''),
    created: (created ? new Date(created) : new Date()),
    logeado: (logeado ?? false),
    jugador: (jugador ?? {id: -1, nombre: '', apellido: '', nacimiento: new Date(), club: '', dorsal: -1, altura: -1, peso: -1, partidos: new Set()}),
  };
}

/**
 * Get user instance from object.
 */
function from(param: object): IUsuario {
  if (!isUsuario(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as IUsuario;
  return new_(p.email, p.password, p.created,p.logeado, p.jugador, p.id);
}

/**
 * See if the param meets criteria to be a user.
 */
function isUsuario(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg && typeof arg.id === 'number' && 
    'email' in arg && typeof arg.email === 'string' && 
    'password' in arg && typeof arg.password === 'string' &&
    'created' in arg && moment(arg.created as string | Date).isValid() &&
    'logeado' in arg && typeof arg.logeado === 'boolean' &&
    'jugador' in arg && typeof arg.jugador === 'object'
  );
}


// **** Export default **** //

export default {
  new: new_,
  from,
  isUsuario,
} as const;
