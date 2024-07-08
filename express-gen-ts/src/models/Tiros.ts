import moment from 'moment';


// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';


// **** Types **** //

export interface ITiros {
    tirosDeCampo: number;
    tirosDeCampoConvertidos: number;
    tirosDeDos: number;
    tirosDeDosConvertidos: number;
    tirosDeTres: number;
    tirosDeTresConvertidos: number;
    tirosLibres: number;
    tirosLibresConvertidos: number;
    
}


// **** Functions **** //

/**
 * Create new User.
 */
function new_(
    minutosJugados: number,
    segundosJugados: number,
    puntos: number,
    rebotes: number,
    asistencias: number,
    faltas: number,
    tapones: number,
    perdidas: number,
    recuperaciones: number,
    valoracion: number,
    id?: number, // id last cause usually set by db
): IEstadisticas {
  return {
    id: (id ?? -1),
    nombre: (nombre ?? ''),
    apellido: (apellido ?? ''),
    nacimiento: (nacimiento ?? ''),
    club: (club ?? ''),
    dorsal: (dorsal ?? -1),
    altura: (altura ?? -1),
    peso: (peso ?? -1),
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
  return new_(p.nombre, p.apellido, p.nacimiento, p.club, p.dorsal, p.altura, p.peso, p.id);
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
    'created' in arg && moment(arg.created as string | Date).isValid() &&
    'club' in arg && typeof arg.club === 'string' &&
    'dorsal' in arg && typeof arg.dorsal === 'number' &&
    'altura' in arg && typeof arg.altura === 'number' &&
    'peso' in arg && typeof arg.peso === 'number'
  );
}


// **** Export default **** //

export default {
  new: new_,
  from,
  isJugador,
} as const;
