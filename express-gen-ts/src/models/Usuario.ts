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
    'id' in arg && typeof (arg as any).id === 'number' &&
    'email' in arg && typeof (arg as any).email === 'string' &&
    'password' in arg && typeof (arg as any).password === 'string' &&
    'created' in arg && (
      (arg as any).created instanceof Date || 
      (typeof (arg as any).created === 'string' && moment((arg as any).created, moment.ISO_8601, true).isValid())
    ) &&
    'jugador' in arg && typeof (arg as any).jugador === 'object'
  );
}

function isLogin(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'email' in arg && typeof (arg as any).email === 'string' &&
    'password' in arg && typeof (arg as any).password === 'string'
  );
}
/*function isUsuario(arg: unknown): boolean {
  console.log('Argumento recibido:', arg);
  if (!arg || typeof arg !== 'object') return false;
  
  const valid = 
    'id' in arg && typeof (arg as any).id === 'number' &&
    'email' in arg && typeof (arg as any).email === 'string' &&
    'password' in arg && typeof (arg as any).password === 'string' &&
    'created' in arg && (
      (arg as any).created instanceof Date || 
      (typeof (arg as any).created === 'string' && moment((arg as any).created, 'M/D/YYYY, h:mm:ss A', true).isValid())
    ) &&
    'jugador' in arg && typeof (arg as any).jugador === 'object';

  console.log('Validación:', valid);
  return valid;
}*/
/*function isUsuario(arg: unknown): boolean {
  console.log('Argumento recibido:', arg);

  if (!arg || typeof arg !== 'object') {
    console.log('Falla: No es un objeto válido');
    return false;
  }

  const validId = 'id' in arg && typeof (arg as any).id === 'number';
  console.log('Validación de ID:', validId);

  const validEmail = 'email' in arg && typeof (arg as any).email === 'string';
  console.log('Validación de Email:', validEmail);

  const validPassword = 'password' in arg && typeof (arg as any).password === 'string';
  console.log('Validación de Password:', validPassword);

  const validCreated = 'created' in arg && (
    (arg as any).created instanceof Date || 
    (typeof (arg as any).created === 'string' && moment((arg as any).created, 'YYYY-MM-DDTHH:mm:ssZ', true).isValid())
  );
  console.log('Validación de Created:', validCreated);

  const validJugador = 'jugador' in arg && typeof (arg as any).jugador === 'object';
  console.log('Validación de Jugador:', validJugador);

  const valid = validId && validEmail && validPassword && validCreated && validJugador;
  console.log('Resultado final de Validación:', valid);

  return valid;
}*/


// **** Export default **** //

export default {
  new: new_,
  from,
  isUsuario,
  isLogin,
} as const;
