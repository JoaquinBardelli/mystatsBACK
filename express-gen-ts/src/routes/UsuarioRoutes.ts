import HttpStatusCodes from '@src/common/HttpStatusCodes';

import UsuarioService from '@src/services/UsuarioService';
import { IUser } from '@src/models/User';
import { IReq, IRes } from './types/express/misc';
import { IJugador } from '@src/models/Jugador';


// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
    const users = await UsuarioService.getAll();
    return res.status(HttpStatusCodes.OK).json({ users });
}

/**
 * Add one user.
 */
async function add(req: IReq<{ user: IUser }>, res: IRes) {
    const { user } = req.body;
    await UsuarioService.addOne(user);
    return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 */
async function update(req: IReq<{ user: IUser }>, res: IRes) {
    const { user } = req.body;
    await UsuarioService.updateOne(user);
    return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
    const id = +req.params.id;
    await UsuarioService.delete(id);
    return res.status(HttpStatusCodes.OK).end();
}

//make this function add IJugador data to the user
async function agregarDatos(req: IReq<{ jugador: IJugador }>, res: IRes) {
    const { jugador } = req.body;
    await UsuarioService.agregarDatos(jugador);
    return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
    getAll,
    add,
    update,
    delete: delete_,
    agregarDatos,
} as const ;
