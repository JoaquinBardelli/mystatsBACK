import { IPartido } from './Partido';
import moment from 'moment';
// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';


// **** Types **** //

export interface IJugador {
  id: number;
  nombre: string;
  apellido: string;
  nacimiento: Date;
  club: string;
  dorsal: number;
  altura: number;
  peso: number;
  partidos: IPartido[];
}


// **** Functions **** //

/**
 * Create new User.
 */
function new_(
    nombre: string,
    apellido: string,
    nacimiento: Date,
    club: string,
    dorsal: number,
    altura: number,
    peso: number,
    partidos: IPartido[],
    id?: number, // id last cause usually set by db
): IJugador {
  return {
    id: (id ?? -1),
    nombre: (nombre ?? ''),
    apellido: (apellido ?? ''),
    nacimiento: (nacimiento ?? ''),
    club: (club ?? ''),
    dorsal: (dorsal ?? -1),
    altura: (altura ?? -1),
    peso: (peso ?? -1),
    partidos: (partidos ?? []),
  };
}

/**
 * Get user instance from object.
 */
function from(param: object): IJugador {
  if (!isJugador(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as IJugador;
  return new_(p.nombre, p.apellido, p.nacimiento, p.club, p.dorsal, p.altura, p.peso, p.partidos, p.id);
}

/**
 * See if the param meets criteria to be a user.
 */
function isJugador(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg && typeof arg.id === 'number' && 
    'apellido' in arg && typeof arg.apellido === 'string' && 
    'nombre' in arg && typeof arg.nombre === 'string' &&
    'nacimiento' in arg && moment(arg.nacimiento as string | Date).isValid() &&
    'club' in arg && typeof arg.club === 'string' &&
    'dorsal' in arg && typeof arg.dorsal === 'number' &&
    'altura' in arg && typeof arg.altura === 'number' &&
    'peso' in arg && typeof arg.peso === 'number' &&
    'estadisticas' in arg && typeof arg.estadisticas === 'object' 
  );
}


// **** Export default **** //

export default {
  new: new_,
  from,
  isJugador,
} as const;
