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
/*async function register(req: IReq<{ usuarios: IUsuario }>, res: IRes) {
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
}*/
/*
async function register(req: IReq<{ usuario: IUsuario }>, res: IRes) {
    console.log(req.body);
    const { usuario } = req.body; // Usar 'usuario' en singular
    console.log("Usuario en routes: ", usuario);

    if (!usuario) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: "Datos del usuario están ausentes" });
    }

    try {
        const token = await UsuarioService.register(usuario);
        return res.status(HttpStatusCodes.CREATED).json({ token }); // Retornar 201 Created
    } catch (err) {
        console.error('Error en el registro:', err); // Registrar el error en el servidor
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Error interno del servidor" });
    }
}*/
async function register(req: IReq<{ usuarios: IUsuario }>, res: IRes) {
    console.log(req.body);
    const { usuarios: usuario } = req.body; // Asegúrate de que el campo sea 'usuarios'
    console.log("Usuario en routes: ", usuario);

    if (!usuario) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: "Usuario data is missing" });
    }

    try {
        const token = await UsuarioService.register(usuario);
        return res.status(HttpStatusCodes.CREATED).json({ token });
    } catch (err) {
        console.error('Error en el registro:', err);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Error interno del servidor" });
    }
}



async function promedio(req: IReq<{ usuarios: IUsuario }>, res: IRes) {
    const { usuarios : usuario  } = req.body;
    console.log(req.body);
    console.log("Usuario en routes promedio" + usuario);
    const promedio = await UsuarioService.promedio(usuario);
    return res.status(HttpStatusCodes.OK).json({ promedio });
}

async function agregarPartido(req: IReq<{ partidos: IPartido }>, res: IRes) {
    console.log("PRIMERO" + req.body.partidos.estadisticas.rebotesDefensivos);
    try {
        // Obtener el token del encabezado de autorización
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7Il9pZCI6IjY2Y2NhNzA4MmVhZTg2MWE1MzFmYzA3OSIsImlkIjoxLCJlbWFpbCI6Impvc2V3QGdtYWlsLmNvbSIsImNyZWF0ZWQiOiIyMDI0LTA4LTI2VDE2OjAyOjE1LjkyNVoiLCJqdWdhZG9yIjp7ImlkIjoxLCJub21icmUiOiJqb3NlIiwiYXBlbGxpZG8iOiJnYXJ0ZSIsIm5hY2ltaWVudG8iOiIyMDI0LTA4LTE2VDAwOjAwOjAwLjAwMFoiLCJjbHViIjoieXV5YSIsImRvcnNhbCI6MTExMTEsImFsdHVyYSI6MTIzLCJwZXNvIjoxMjMsInBhcnRpZG9zIjpbeyJpZCI6MSwiZmVjaGEiOm51bGwsImFkdmVyc2FyaW8iOiIiLCJwdW50b3NQcm9waW9DbHViIjowLCJwdW50b3NBZHZlcnNhcmlvIjowLCJlc3RhZGlzdGljYXMiOnsibWludXRvc0p1Z2Fkb3MiOjAsInNlZ3VuZG9zSnVnYWRvcyI6MCwicHVudG9zIjowLCJyZWJvdGVzT2ZlbnNpdm9zIjowLCJyZWJvdGVzRGVmZW5zaXZvcyI6MCwiYXNpc3RlbmNpYXMiOjAsImZhbHRhc0NvbWV0aWRhcyI6MCwiZmFsdGFzUmVjaWJpZGFzIjowLCJ0YXBvbmVzUmVjaWJpZG9zIjowLCJwZXJkaWRhcyI6MCwicmVjdXBlcmFjaW9uZXMiOjAsInZhbG9yYWNpb24iOjAsInRpcm9zIjp7InRpcm9zRGVDYW1wbyI6MCwidGlyb3NEZUNhbXBvQ29udmVydGlkb3MiOjAsInRpcm9zRGVEb3MiOjAsInRpcm9zRGVEb3NDb252ZXJ0aWRvcyI6MCwidGlyb3NEZVRyZXMiOjAsInRpcm9zRGVUcmVzQ29udmVydGlkb3MiOjAsInRpcm9zTGlicmVzIjowLCJ0aXJvc0xpYnJlc0NvbnZlcnRpZG9zIjowLCJfaWQiOiI2NmNjYTcwODJlYWU4NjFhNTMxZmMwN2QifSwiX2lkIjoiNjZjY2E3MDgyZWFlODYxYTUzMWZjMDdjIn0sIl9pZCI6IjY2Y2NhNzA4MmVhZTg2MWE1MzFmYzA3YiJ9XSwiX2lkIjoiNjZjY2E3MDgyZWFlODYxYTUzMWZjMDdhIn0sIl9fdiI6MH0sImlhdCI6MTcyNDY5NDMwMSwiZXhwIjoxNzI0ODY3MTAxfQ.slmYvLVzc_TJQSWY7U3RkyVaZahNiPTQhrP223XrCPE"/*req.headers.authorization?.split(' ')[1]*/;
        if (!token) {
            console.log("Token no proporcionado");
            return res.status(HttpStatusCodes.UNAUTHORIZED).json({ error: 'Token no proporcionado' });
        }else{
            console.log("Token proporcionado");
        }
        // Decodificar el token para obtener la información del usuario
        //console.log("Secret en routes agregarPartido routes" + EnvVars.Jwt.Secret);
        const decodedToken = jwt.verify(token, EnvVars.Jwt.Secret) as { usuario: IUsuario };
        //console.log("Decoded Token en routes agregarPartido routes" + decodedToken);
        const usuario = decodedToken.usuario;
        //console.log("Usuario en routes agregarPartido routes" + usuario);

        // Obtener el partido de la solicitud
        //const  partido  = req.body as { partido: IPartido };
        const partido = req.body.partidos as IPartido;
        console.log("Partido req" + req.body);
        console.log("Partido en routes agregarPartido routes" + partido);
        // Llamar al servicio para agregar el partido al usuario
        console.log("PARTIDO" + req.body);
        await UsuarioService.agregarPartido(usuario.email, req.body.partidos);

        return res.status(HttpStatusCodes.OK).json({ message: 'Partido agregado correctamente' });
    } catch (err) {
        console.error('Error al agregar el partido:', err);
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
