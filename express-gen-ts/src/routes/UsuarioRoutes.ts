import HttpStatusCodes from '@src/common/HttpStatusCodes';

import UsuarioService from '@src/services/UsuarioService';
import { IUsuario } from '@src/models/Usuario';
import { IReq, IRes } from './types/express/misc';
import { IJugador } from '@src/models/Jugador';


// **** Functions **** //

/**
 * Get all usuarios.
 */

async function login(req: IReq<{ usuario: IUsuario }>, res: IRes) {
    const { usuario } = req.body;
    const token = await UsuarioService.login(usuario);
    return res.status(HttpStatusCodes.OK).json({ token });
}

async function register(req: IReq<{ usuario: IUsuario }>, res: IRes) {
    const { usuario } = req.body;
    const token = await UsuarioService.register(usuario);
    return res.status(HttpStatusCodes.OK).json({ token });
}

async function getAll(_: IReq, res: IRes) {
    const usuarios = await UsuarioService.getAll();
    return res.status(HttpStatusCodes.OK).json({ usuarios });
}

/**
 * Add one usuario.
 */
async function add(req: IReq<{ usuario: IUsuario }>, res: IRes) {
    const { usuario } = req.body;
    await UsuarioService.addOne(usuario);
    return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one usuario.
 */
async function update(req: IReq<{ usuario: IUsuario }>, res: IRes) {
    const { usuario } = req.body;
    await UsuarioService.updateOne(usuario);
    return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one usuario.
 */
async function delete_(req: IReq, res: IRes) {
    const id = +req.params.id;
    await UsuarioService.delete(id);
    return res.status(HttpStatusCodes.OK).end();
}

//make this function add IJugador data to the usuario
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
    login,
    register,
} as const ;
