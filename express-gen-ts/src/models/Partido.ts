import moment from 'moment';
import { IEstadisticas } from './Estadisticas';

// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';


// **** Types **** //

export interface IPartido {
  adversario: string;
  fecha: Date;
  puntosPropioClub: number;
  puntosAdversario: number;
  estadisticas: IEstadisticas;
  id: number;
}


// **** Functions **** //

/**
 * Create new User.
 */
function new_(
    adversario: string,
    fecha: Date,
    puntosPropioClub: number,
    puntosAdversario: number,
    estadisticas: IEstadisticas,
    id?: number, // id last cause usually set by db
): IPartido {
  return {
    id: (id ?? -1),
    adversario: (adversario ?? ''),
    fecha: (fecha ?? ''),
    puntosPropioClub: (puntosPropioClub ?? -1),
    puntosAdversario: (puntosAdversario ?? -1),
    estadisticas: (estadisticas ?? {minutosJugados: 0, segundosJugados: 0, puntos: 0, rebotes: 0, asistencias: 0, faltas: 0, tapones: 0, perdidas: 0, recuperaciones: 0, valoracion: 0}),
};
}

/**
 * Get user instance from object.
 */
function from(param: object): IPartido {
  if (!isPartido(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as IPartido;
  return new_(p.adversario, p.fecha, p.puntosPropioClub, p.puntosAdversario, p.estadisticas, p.id);
}

/**
 * See if the param meets criteria to be a user.
 */
function isPartido(arg: any): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg && typeof arg.id === 'number' && 
    'adversario' in arg && typeof arg.adversario === 'string' &&
    'fecha' in arg && moment(arg.fecha).isValid() &&
    'puntosPropioClub' in arg && typeof arg.puntosPropioClub === 'number' &&
    'puntosAdversario' in arg && typeof arg.puntosAdversario === 'number' &&
    'estadisticas' in arg && typeof arg.estadisticas === 'object' &&
    'minutosJugados' in arg.estadisticas && typeof arg.estadisticas.minutosJugados === 'number' &&
    'segundosJugados' in arg.estadisticas && typeof arg.estadisticas.segundosJugados === 'number' &&
    'puntos' in arg.estadisticas && typeof arg.estadisticas.puntos === 'number' &&
    'rebotesOfensivos' in arg.estadisticas && typeof arg.estadisticas.rebotesOfensivos === 'number' &&
    'rebotesDefensivos' in arg.estadisticas && typeof arg.estadisticas.rebotesDefensivos === 'number' &&
    'asistencias' in arg.estadisticas && typeof arg.estadisticas.asistencias === 'number' &&
    'faltasCometidas' in arg.estadisticas && typeof arg.estadisticas.faltasCometidas === 'number' &&
    'faltasRecibidas' in arg.estadisticas && typeof arg.estadisticas.faltasRecibidas === 'number' &&
    'taponesRecibidos' in arg.estadisticas && typeof arg.estadisticas.taponesRecibidos === 'number' &&
    'taponesRealizados' in arg.estadisticas && typeof arg.estadisticas.taponesRealizados === 'number' &&
    'perdidas' in arg.estadisticas && typeof arg.estadisticas.perdidas === 'number' &&
    'recuperaciones' in arg.estadisticas && typeof arg.estadisticas.recuperaciones === 'number' &&
    'valoracion' in arg.estadisticas && typeof arg.estadisticas.valoracion === 'number' &&
    'tiros' in arg.estadisticas && typeof arg.estadisticas.tiros === 'object' &&
    'tirosDeCampo' in arg.estadisticas.tiros && typeof arg.estadisticas.tiros.tirosDeCampo === 'number' &&
    'tirosDeCampoConvertidos' in arg.estadisticas.tiros && typeof arg.estadisticas.tiros.tirosDeCampoConvertidos === 'number' &&
    'tirosDeDos' in arg.estadisticas.tiros && typeof arg.estadisticas.tiros.tirosDeDos === 'number' &&
    'tirosDeDosConvertidos' in arg.estadisticas.tiros && typeof arg.estadisticas.tiros.tirosDeDosConvertidos === 'number' &&
    'tirosDeTres' in arg.estadisticas.tiros && typeof arg.estadisticas.tiros.tirosDeTres === 'number' &&
    'tirosDeTresConvertidos' in arg.estadisticas.tiros && typeof arg.estadisticas.tiros.tirosDeTresConvertidos === 'number' &&
    'tirosLibres' in arg.estadisticas.tiros && typeof arg.estadisticas.tiros.tirosLibres === 'number' &&
    'tirosLibresConvertidos' in arg.estadisticas.tiros && typeof arg.estadisticas.tiros.tirosLibresConvertidos === 'number'
  );
}



// **** Export default **** //

export default {
  new: new_,
  from,
  isPartido,
} as const;
