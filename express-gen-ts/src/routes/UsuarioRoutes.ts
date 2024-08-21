import HttpStatusCodes from '@src/common/HttpStatusCodes';

import UsuarioService from '@src/services/UsuarioService';
import { IUsuario } from '@src/models/Usuario';
import { IReq, IRes } from './types/express/misc';
import { IJugador } from '@src/models/Jugador';
import { IPartido } from '@src/models/Partido';
import EnvVars from '@src/common/EnvVars';
import jwt from 'jsonwebtoken';


// **** Functions **** //

/**
 * Get all usuarios.
 */

async function login(req: IReq<{ usuarios: IUsuario }>, res: IRes) {
    const { usuarios: usuario } = req.body;
    console.log("Usuario en routes " + usuario);
    const token = await UsuarioService.login(usuario);
    return res.status(HttpStatusCodes.OK).json({ token });
}

/*async function register(req: IReq<{ usuario: IUsuario }>, res: IRes) {
    console.log(req.body);
    const { usuario } = req.body;
    console.log(usuario);
    const token = await UsuarioService.register(usuario);
    return res.status(HttpStatusCodes.OK).json({ token });
}*/
async function register(req: IReq<{ usuarios: IUsuario }>, res: IRes) {
    console.log(req.body);
    const { usuarios: usuario } = req.body; // Access the 'usuarios' key correctly
    console.log("Usuario en routes: "+ usuario);

    if (!usuario) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: "Usuario data is missing" });
    }

    try {
        const token = await UsuarioService.register(usuario);
        return res.status(HttpStatusCodes.OK).json({ token });
    } catch (err) {
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
}

async function promedio(req: IReq<{ usuarios: IUsuario }>, res: IRes) {
    const { usuarios : usuario  } = req.body;
    console.log(req.body);
    console.log("Usuario en routes promedio" + usuario);
    const promedio = await UsuarioService.promedio(usuario);
    return res.status(HttpStatusCodes.OK).json({ promedio });
}

async function agregarPartido(req: IReq<{ partido: IPartido }>, res: IRes) {
    try {
        // Obtener el token del encabezado de autorización
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(HttpStatusCodes.UNAUTHORIZED).json({ error: 'Token no proporcionado' });
        }

        // Decodificar el token para obtener la información del usuario
        const decodedToken = jwt.verify(token, EnvVars.Jwt.Secret) as { usuario: IUsuario };
        const usuario = decodedToken.usuario;

        // Obtener el partido de la solicitud
        const { partido } = req.body;

        // Llamar al servicio para agregar el partido al usuario
        await UsuarioService.agregarPartido(usuario.email, partido);

        return res.status(HttpStatusCodes.OK).json({ message: 'Partido agregado correctamente' });
    } catch (err) {
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
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
    promedio,
    add,
    update,
    delete: delete_,
    agregarDatos,
    login,
    register,
    agregarPartido,
} as const ;
