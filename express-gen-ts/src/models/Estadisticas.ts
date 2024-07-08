import moment from 'moment';
import { ITiros } from './Tiros';

// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' +
  'with the appropriate user keys.';


// **** Types **** //

export interface IEstadisticas {
  minutosJugados: number,
  segundosJugados: number,
  puntos: number,
  rebotesOfensivos: number,
  rebotesDefensivos: number,
  asistencias: number,
  faltasCometidas: number,
  faltasRecibidas: number,
  taponesCometidos: number,
  taponesRecibidos: number,
  perdidas: number,
  recuperaciones: number,
  valoracion: number,
  tiros: ITiros,
}


// **** Functions **** //

/**
 * Create new User.
 */
function new_(
  minutosJugados: number,
  segundosJugados: number,
  puntos: number,
  rebotesOfensivos: number,
  rebotesDefensivos: number,
  asistencias: number,
  faltasCometidas: number,
  faltasRecibidas: number,
  taponesCometidos: number,
  taponesRecibidos: number,
  perdidas: number,
  recuperaciones: number,
  valoracion: number,
  tiros: ITiros,
): IEstadisticas {
  return {
    minutosJugados: (minutosJugados ?? -1),
    segundosJugados: (segundosJugados ?? -1),
    puntos: (puntos ?? -1),
    rebotesOfensivos: (rebotesOfensivos ?? -1),
    rebotesDefensivos: (rebotesDefensivos ?? -1),
    asistencias: (asistencias ?? -1),
    faltasCometidas: (faltasCometidas ?? -1),
    faltasRecibidas: (faltasRecibidas ?? -1),
    taponesCometidos: (taponesCometidos ?? -1),
    taponesRecibidos: (taponesRecibidos ?? -1),
    perdidas: (perdidas ?? -1),
    recuperaciones: (recuperaciones ?? -1),
    valoracion: (valoracion ?? -1),
    tiros: (tiros ?? { tirosDeCampo: 0, tirosDeCampoConvertidos: 0, tirosDeDos: 0, tirosDeDosConvertidos: 0, tirosDeTres: 0, tirosDeTresConvertidos: 0, tirosLibres: 0, tirosLibresConvertidos: 0 }),
  };
}

/**
 * Get user instance from object.
 */
function from(param: object): IEstadisticas {
  if (!isJugador(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as IEstadisticas;
  return new_(p.minutosJugados, p.segundosJugados, p.puntos, p.rebotesOfensivos, p.rebotesDefensivos, p.asistencias, p.faltasCometidas, p.faltasRecibidas, p.taponesCometidos, p.taponesRecibidos, p.perdidas, p.recuperaciones, p.valoracion, p.tiros);
}

/**
 * See if the param meets criteria to be a user.
 */
function isJugador(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'minutosJugados' in arg && typeof arg.minutosJugados === 'number' &&
    'segundosJugados' in arg && typeof arg.segundosJugados === 'number' &&
    'puntos' in arg && typeof arg.puntos === 'number' &&
    'rebotesOfensivos' in arg && typeof arg.rebotesOfensivos === 'number' &&
    'rebotesDefensivos' in arg && typeof arg.rebotesDefensivos === 'number' &&
    'asistencias' in arg && typeof arg.asistencias === 'number' &&
    'faltasCometidas' in arg && typeof arg.faltasCometidas === 'number' &&
    'faltasRecibidas' in arg && typeof arg.faltasRecibidas === 'number' &&
    'taponesCometidos' in arg && typeof arg.taponesCometidos === 'number' &&
    'taponesRecibidos' in arg && typeof arg.taponesRecibidos === 'number' &&
    'perdidas' in arg && typeof arg.perdidas === 'number' &&
    'recuperaciones' in arg && typeof arg.recuperaciones === 'number' &&
    'valoracion' in arg && typeof arg.valoracion === 'number' &&
    'tiros' in arg && typeof arg.tiros === 'object' 
  );
}


// **** Export default **** //

export default {
  new: new_,
  from,
  isJugador,
} as const;
