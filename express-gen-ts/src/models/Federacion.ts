import moment from 'moment';

// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';


// **** Types **** //

export interface IFederacion {
    id: number;
    nombre: string;
    clubes: string[];
}


// **** Functions **** //

/**
 * Create new User.
 */
function new_(
    nombre?: string,
    clubes?: string[],
    id?: number, // id last cause usually set by db
    ): IFederacion {
    return {
        id: (id ?? -1),
        nombre: (nombre ?? ''),
        clubes: (clubes ?? []),
    };
}

/**
 * Get user instance from object.
 */
function from(param: object): IFederacion {
    if (!isFederacion(param)) {
        throw new Error(INVALID_CONSTRUCTOR_PARAM);
    }
    const p = param as IFederacion;
    return new_(p.nombre, p.clubes, p.id);
}

/**
 * See if the param meets criteria to be a user.
 */
function isFederacion(arg: unknown): boolean {
    console.log(arg );
    return (
        !!arg &&
        typeof arg === 'object' &&
        'id' in arg && typeof (arg as any).id === 'number' &&
        'nombre' in arg && typeof (arg as any).nombre === 'string' &&
        'clubes' in arg && Array.isArray((arg as any).clubes)
    );
}



// **** Export default **** //

export default {
  new: new_,
  from,
  isFederacion,
} as const;
