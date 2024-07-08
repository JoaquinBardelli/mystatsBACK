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
    tirosDeCampo: number,
    tirosDeCampoConvertidos: number,
    tirosDeDos: number,
    tirosDeDosConvertidos: number,
    tirosDeTres: number,
    tirosDeTresConvertidos: number,
    tirosLibres: number,
    tirosLibresConvertidos: number,
): ITiros {
  return {
    tirosDeCampo: (tirosDeCampo ?? -1),
    tirosDeCampoConvertidos: (tirosDeCampoConvertidos ?? -1),
    tirosDeDos: (tirosDeDos ?? -1),
    tirosDeDosConvertidos: (tirosDeDosConvertidos ?? -1),
    tirosDeTres: (tirosDeTres ?? -1),
    tirosDeTresConvertidos: (tirosDeTresConvertidos ?? -1),
    tirosLibres: (tirosLibres ?? -1),
    tirosLibresConvertidos: (tirosLibresConvertidos ?? -1),
  };
};


/**
 * Get user instance from object.
 */
function from(param: object): ITiros {
  if (!isTiro(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as ITiros;
  return new_(p.tirosDeCampo, p.tirosDeCampoConvertidos, p.tirosDeDos, p.tirosDeDosConvertidos, p.tirosDeTres, p.tirosDeTresConvertidos, p.tirosLibres, p.tirosLibresConvertidos);
}

/**
 * See if the param meets criteria to be a user.
 */
function isTiro(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'tirosDeCampo' in arg && typeof arg.tirosDeCampo === 'number' &&
    'tirosDeCampoConvertidos' in arg && typeof arg.tirosDeCampoConvertidos === 'number' &&
    'tirosDeDos' in arg && typeof arg.tirosDeDos === 'number' &&
    'tirosDeDosConvertidos' in arg && typeof arg.tirosDeDosConvertidos === 'number' &&
    'tirosDeTres' in arg && typeof arg.tirosDeTres === 'number' &&
    'tirosDeTresConvertidos' in arg && typeof arg.tirosDeTresConvertidos === 'number' &&
    'tirosLibres' in arg && typeof arg.tirosLibres === 'number' &&
    'tirosLibresConvertidos' in arg && typeof arg.tirosLibresConvertidos === 'number'
  );
}


// **** Export default **** //

export default {
  new: new_,
  from,
  isTiro,
} as const;
