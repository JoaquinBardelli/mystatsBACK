import HttpStatusCodes from "@src/common/HttpStatusCodes";

import UsuarioService from "@src/services/UsuarioService";
import { IUsuario } from "@src/models/Usuario";
import { IReq, IRes } from "./types/express/misc";
import { IJugador } from "@src/models/Jugador";
import { IPartido } from "@src/models/Partido";
import EnvVars from "@src/common/EnvVars";
import jwt from "jsonwebtoken";

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
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: "Usuario data is missing" });
  }

  try {
    const token = await UsuarioService.register(usuario);
    return res.status(HttpStatusCodes.CREATED).json({ token });
  } catch (err) {
    console.error("Error en el registro:", err);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Error interno del servidor" });
  }
}

async function promedio(req: IReq, res: IRes) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("Token no proporcionado");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    }

    // Eliminar la palabra 'Bearer ' del token
    const token = authHeader.replace("Bearer ", "");
    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7Il9pZCI6IjY2ZDVlMDhiODQzNWExZjYzNWJjMWI1NiIsImlkIjoxLCJlbWFpbCI6IjJAZ21haWwuY29tIiwiY3JlYXRlZCI6IjIwMjQtMDktMDJUMTU6NTg6MDMuNzMxWiIsImp1Z2Fkb3IiOnsiaWQiOjEsIm5vbWJyZSI6ImFudG9uIiwiYXBlbGxpZG8iOiJqaXNvbiIsIm5hY2ltaWVudG8iOiIrMjc1NzYwLTAzLTIzVDAzOjAwOjAwLjAwMFoiLCJjbHViIjoia2FraSIsImRvcnNhbCI6MiwiYWx0dXJhIjoyMjIsInBlc28iOjIyLCJwYXJ0aWRvcyI6W3siaWQiOjEsImZlY2hhIjpudWxsLCJhZHZlcnNhcmlvIjoiIiwicHVudG9zUHJvcGlvQ2x1YiI6MCwicHVudG9zQWR2ZXJzYXJpbyI6MCwiZXN0YWRpc3RpY2FzIjp7Im1pbnV0b3NKdWdhZG9zIjowLCJzZWd1bmRvc0p1Z2Fkb3MiOjAsInB1bnRvcyI6MCwicmVib3Rlc09mZW5zaXZvcyI6MCwicmVib3Rlc0RlZmVuc2l2b3MiOjAsImFzaXN0ZW5jaWFzIjowLCJmYWx0YXNDb21ldGlkYXMiOjAsImZhbHRhc1JlY2liaWRhcyI6MCwidGFwb25lc1JlY2liaWRvcyI6MCwicGVyZGlkYXMiOjAsInJlY3VwZXJhY2lvbmVzIjowLCJ2YWxvcmFjaW9uIjowLCJ0aXJvcyI6eyJ0aXJvc0RlQ2FtcG8iOjAsInRpcm9zRGVDYW1wb0NvbnZlcnRpZG9zIjowLCJ0aXJvc0RlRG9zIjowLCJ0aXJvc0RlRG9zQ29udmVydGlkb3MiOjAsInRpcm9zRGVUcmVzIjowLCJ0aXJvc0RlVHJlc0NvbnZlcnRpZG9zIjowLCJ0aXJvc0xpYnJlcyI6MCwidGlyb3NMaWJyZXNDb252ZXJ0aWRvcyI6MCwiX2lkIjoiNjZkNWUwOGI4NDM1YTFmNjM1YmMxYjVhIn0sIl9pZCI6IjY2ZDVlMDhiODQzNWExZjYzNWJjMWI1OSJ9LCJfaWQiOiI2NmQ1ZTA4Yjg0MzVhMWY2MzViYzFiNTgifV0sIl9pZCI6IjY2ZDVlMDhiODQzNWExZjYzNWJjMWI1NyJ9LCJfX3YiOjB9LCJpYXQiOjE3MjUyOTQ0OTQsImV4cCI6MTcyNTQ2NzI5NH0.igsbeDRjJ0Oa-XAZnI3r2fnYpMHK53zIQbzg3_7XowQ";
    console.log("Token procesado:", token);
    if (!token) {
      console.log("Token no proporcionado");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    } else {
      console.log("Token proporcionado");
    }

    const decodedToken = jwt.verify(token, EnvVars.Jwt.Secret) as {
      usuario: IUsuario;
    };
    const usuario = decodedToken.usuario;

    const promedio = await UsuarioService.promedio(usuario);
    return res.status(HttpStatusCodes.OK).json({ promedio });
  } catch (err) {
    console.error("Error al agregar el partido:", err);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
}

async function agregarPartido(req: IReq<{ partidos: IPartido }>, res: IRes) {
  try {
    // Obtener el token del encabezado de autorización
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("Token no proporcionado");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    }

    // Eliminar la palabra 'Bearer ' del token
    const token = authHeader.replace("Bearer ", "");
    console.log("Token procesado:", token);
    if (!token) {
      console.log("Token no proporcionado");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    } else {
      console.log("Token proporcionado");
    }
    // Decodificar el token para obtener la información del usuario
    //console.log("Secret en routes agregarPartido routes" + EnvVars.Jwt.Secret);
    const decodedToken = jwt.verify(token, EnvVars.Jwt.Secret) as {
      usuario: IUsuario;
    };
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

    return res
      .status(HttpStatusCodes.OK)
      .json({ message: "Partido agregado correctamente" });
  } catch (err) {
    console.error("Error al agregar el partido:", err);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
}

async function traerDatosPersonales(req: IReq, res: IRes) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("Token no proporcionado");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    }
    const token = authHeader.replace("Bearer ", "");
    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7Il9pZCI6IjY2ZDVlMDhiODQzNWExZjYzNWJjMWI1NiIsImlkIjoxLCJlbWFpbCI6IjJAZ21haWwuY29tIiwiY3JlYXRlZCI6IjIwMjQtMDktMDJUMTU6NTg6MDMuNzMxWiIsImp1Z2Fkb3IiOnsiaWQiOjEsIm5vbWJyZSI6ImFudG9uIiwiYXBlbGxpZG8iOiJqaXNvbiIsIm5hY2ltaWVudG8iOiIrMjc1NzYwLTAzLTIzVDAzOjAwOjAwLjAwMFoiLCJjbHViIjoia2FraSIsImRvcnNhbCI6MiwiYWx0dXJhIjoyMjIsInBlc28iOjIyLCJwYXJ0aWRvcyI6W3siaWQiOjEsImZlY2hhIjpudWxsLCJhZHZlcnNhcmlvIjoiIiwicHVudG9zUHJvcGlvQ2x1YiI6MCwicHVudG9zQWR2ZXJzYXJpbyI6MCwiZXN0YWRpc3RpY2FzIjp7Im1pbnV0b3NKdWdhZG9zIjowLCJzZWd1bmRvc0p1Z2Fkb3MiOjAsInB1bnRvcyI6MCwicmVib3Rlc09mZW5zaXZvcyI6MCwicmVib3Rlc0RlZmVuc2l2b3MiOjAsImFzaXN0ZW5jaWFzIjowLCJmYWx0YXNDb21ldGlkYXMiOjAsImZhbHRhc1JlY2liaWRhcyI6MCwidGFwb25lc1JlY2liaWRvcyI6MCwicGVyZGlkYXMiOjAsInJlY3VwZXJhY2lvbmVzIjowLCJ2YWxvcmFjaW9uIjowLCJ0aXJvcyI6eyJ0aXJvc0RlQ2FtcG8iOjAsInRpcm9zRGVDYW1wb0NvbnZlcnRpZG9zIjowLCJ0aXJvc0RlRG9zIjowLCJ0aXJvc0RlRG9zQ29udmVydGlkb3MiOjAsInRpcm9zRGVUcmVzIjowLCJ0aXJvc0RlVHJlc0NvbnZlcnRpZG9zIjowLCJ0aXJvc0xpYnJlcyI6MCwidGlyb3NMaWJyZXNDb252ZXJ0aWRvcyI6MCwiX2lkIjoiNjZkNWUwOGI4NDM1YTFmNjM1YmMxYjVhIn0sIl9pZCI6IjY2ZDVlMDhiODQzNWExZjYzNWJjMWI1OSJ9LCJfaWQiOiI2NmQ1ZTA4Yjg0MzVhMWY2MzViYzFiNTgifV0sIl9pZCI6IjY2ZDVlMDhiODQzNWExZjYzNWJjMWI1NyJ9LCJfX3YiOjB9LCJpYXQiOjE3MjUyOTQ0OTQsImV4cCI6MTcyNTQ2NzI5NH0.igsbeDRjJ0Oa-XAZnI3r2fnYpMHK53zIQbzg3_7XowQ";
    console.log("Token procesado:", token);
    if (!token) {
      console.log("Token no proporcionado");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    } else {
      console.log("Token proporcionado");
    }

    const decodedToken = jwt.verify(token, EnvVars.Jwt.Secret) as {
      usuario: IUsuario;
    };
    const usuario = decodedToken.usuario;

    const datos = await UsuarioService.traerDatosPersonales(usuario);
    return res.status(HttpStatusCodes.OK).json({ datos });
  } catch (err) {
    console.error("Error al agregar el partido:", err);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
}

async function partidosPorPuntos(req: IReq, res: IRes) {
  const pagina = +req.params.id;
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("Token no proporcionado");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    }

    // Eliminar la palabra 'Bearer ' del token
    const token = authHeader.replace("Bearer ", "");
    console.log("Token procesado:", token);
    if (!token) {
      console.log("Token no proporcionado");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    } else {
      console.log("Token proporcionado");
    }
    //const token =
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjoxLCJlbWFpbCI6IjFAZ21haWwuY29tIiwiY3JlYXRlZCI6IjIwMjQtMTEtMTBUMTk6MzQ6MzMuMTcwWiIsImp1Z2Fkb3IiOnsiaWQiOjEsIm5vbWJyZSI6ImoiLCJhcGVsbGlkbyI6ImEiLCJuYWNpbWllbnRvIjoiMjAyNC0xMS0wNVQwMDowMDowMC4wMDBaIiwiY2x1YiI6IlZlbGV6IFNhcmZpZWxkIiwiZG9yc2FsIjoxLCJhbHR1cmEiOjEsInBlc28iOjEsInBhcnRpZG9zIjpbeyJpZCI6MSwiZmVjaGEiOm51bGwsImFkdmVyc2FyaW8iOiIiLCJwdW50b3NQcm9waW9DbHViIjowLCJwdW50b3NBZHZlcnNhcmlvIjowLCJlc3RhZGlzdGljYXMiOnsibWludXRvc0p1Z2Fkb3MiOjAsInNlZ3VuZG9zSnVnYWRvcyI6MCwicHVudG9zIjowLCJyZWJvdGVzT2ZlbnNpdm9zIjowLCJyZWJvdGVzRGVmZW5zaXZvcyI6MCwiYXNpc3RlbmNpYXMiOjAsImZhbHRhc0NvbWV0aWRhcyI6MCwiZmFsdGFzUmVjaWJpZGFzIjowLCJ0YXBvbmVzQ29tZXRpZG9zIjowLCJ0YXBvbmVzUmVjaWJpZG9zIjowLCJwZXJkaWRhcyI6MCwicmVjdXBlcmFjaW9uZXMiOjAsInZhbG9yYWNpb24iOjAsInRpcm9zIjp7InRpcm9zRGVDYW1wbyI6MCwidGlyb3NEZUNhbXBvQ29udmVydGlkb3MiOjAsInRpcm9zRGVEb3MiOjAsInRpcm9zRGVEb3NDb252ZXJ0aWRvcyI6MCwidGlyb3NEZVRyZXMiOjAsInRpcm9zRGVUcmVzQ29udmVydGlkb3MiOjAsInRpcm9zTGlicmVzIjowLCJ0aXJvc0xpYnJlc0NvbnZlcnRpZG9zIjowLCJfaWQiOiI2NzMxMGFjOWE2YWFlMWQyMzJlZjZkODAifSwiX2lkIjoiNjczMTBhYzlhNmFhZTFkMjMyZWY2ZDdmIn0sIl9pZCI6IjY3MzEwYWM5YTZhYWUxZDIzMmVmNmQ3ZSJ9XSwiX2lkIjoiNjczMTBhYzlhNmFhZTFkMjMyZWY2ZDdkIn0sIl9pZCI6IjY3MzEwYWM5YTZhYWUxZDIzMmVmNmQ3YyIsIl9fdiI6MH0sImlhdCI6MTczMTI2NzI3MywiZXhwIjoxNzMxNDQwMDczfQ.20F_ZCE5YU43YXepNY1bBLVjyWCuN4pcF5PhDRLg8J4";

    const decodedToken = jwt.verify(token, EnvVars.Jwt.Secret) as {
      usuario: IUsuario;
    };
    const usuario = decodedToken.usuario;
    const partidos = await UsuarioService.partidosPorPuntos(usuario, pagina);
    return res.status(HttpStatusCodes.OK).json({ partidos });
  } catch (err) {
    console.error("Error al buscar partidos por puntos:", err);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
}

async function partidosPorMinutos(req: IReq, res: IRes) {
  const pagina = +req.params.id;
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("Token no proporcionado");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    }

    // Eliminar la palabra 'Bearer ' del token
    const token = authHeader.replace("Bearer ", "");
    console.log("Token procesado:", token);
    if (!token) {
      console.log("Token no proporcionado");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    } else {
      console.log("Token proporcionado");
    }
    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjoxLCJlbWFpbCI6InNlYmFwQGdtYWlsLmNvbSIsImNyZWF0ZWQiOiIyMDI0LTA5LTA0VDE3OjI0OjE0LjE5OVoiLCJqdWdhZG9yIjp7ImlkIjoxLCJub21icmUiOiJzZWJhIiwiYXBlbGxpZG8iOiJwb3NhZG8iLCJuYWNpbWllbnRvIjoiMjAyNC0wOS0wMlQwMDowMDowMC4wMDBaIiwiY2x1YiI6ImZlcnJvIiwiZG9yc2FsIjoxMiwiYWx0dXJhIjoxODAsInBlc28iOjgwLCJwYXJ0aWRvcyI6W3siaWQiOjEsImZlY2hhIjpudWxsLCJhZHZlcnNhcmlvIjoiIiwicHVudG9zUHJvcGlvQ2x1YiI6MCwicHVudG9zQWR2ZXJzYXJpbyI6MCwiZXN0YWRpc3RpY2FzIjp7Im1pbnV0b3NKdWdhZG9zIjowLCJzZWd1bmRvc0p1Z2Fkb3MiOjAsInB1bnRvcyI6MCwicmVib3Rlc09mZW5zaXZvcyI6MCwicmVib3Rlc0RlZmVuc2l2b3MiOjAsImFzaXN0ZW5jaWFzIjowLCJmYWx0YXNDb21ldGlkYXMiOjAsImZhbHRhc1JlY2liaWRhcyI6MCwidGFwb25lc0NvbWV0aWRvcyI6MCwidGFwb25lc1JlY2liaWRvcyI6MCwicGVyZGlkYXMiOjAsInJlY3VwZXJhY2lvbmVzIjowLCJ2YWxvcmFjaW9uIjowLCJ0aXJvcyI6eyJ0aXJvc0RlQ2FtcG8iOjAsInRpcm9zRGVDYW1wb0NvbnZlcnRpZG9zIjowLCJ0aXJvc0RlRG9zIjowLCJ0aXJvc0RlRG9zQ29udmVydGlkb3MiOjAsInRpcm9zRGVUcmVzIjowLCJ0aXJvc0RlVHJlc0NvbnZlcnRpZG9zIjowLCJ0aXJvc0xpYnJlcyI6MCwidGlyb3NMaWJyZXNDb252ZXJ0aWRvcyI6MCwiX2lkIjoiNjZkODk3YmVjNmNhMzBmNDBhMGI2ZDA2In0sIl9pZCI6IjY2ZDg5N2JlYzZjYTMwZjQwYTBiNmQwNSJ9LCJfaWQiOiI2NmQ4OTdiZWM2Y2EzMGY0MGEwYjZkMDQifV0sIl9pZCI6IjY2ZDg5N2JlYzZjYTMwZjQwYTBiNmQwMyJ9LCJfaWQiOiI2NmQ4OTdiZWM2Y2EzMGY0MGEwYjZkMDIiLCJfX3YiOjB9LCJpYXQiOjE3MjU0NzA2NTQsImV4cCI6MTcyNTY0MzQ1NH0.mB3VU4Yf0Ly6yP9xsiB23Z1mLwblYG2Z4QYBGGVOAZE";

    const decodedToken = jwt.verify(token, EnvVars.Jwt.Secret) as {
      usuario: IUsuario;
    };
    const usuario = decodedToken.usuario;
    const partidos = await UsuarioService.partidosPorMinutos(usuario, pagina);
    return res.status(HttpStatusCodes.OK).json({ partidos });
  } catch (err) {
    console.error("Error al buscar partidos por minutos:", err);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
}

async function partidosPorAsistencias(req: IReq, res: IRes) {
  const pagina = +req.params.id;
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("Token no proporcionado");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    }

    // Eliminar la palabra 'Bearer ' del token
    const token = authHeader.replace("Bearer ", "");
    console.log("Token procesado:", token);
    if (!token) {
      console.log("Token no proporcionado");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    } else {
      console.log("Token proporcionado");
    }
    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjoxLCJlbWFpbCI6InNlYmFwQGdtYWlsLmNvbSIsImNyZWF0ZWQiOiIyMDI0LTA5LTA0VDE3OjI0OjE0LjE5OVoiLCJqdWdhZG9yIjp7ImlkIjoxLCJub21icmUiOiJzZWJhIiwiYXBlbGxpZG8iOiJwb3NhZG8iLCJuYWNpbWllbnRvIjoiMjAyNC0wOS0wMlQwMDowMDowMC4wMDBaIiwiY2x1YiI6ImZlcnJvIiwiZG9yc2FsIjoxMiwiYWx0dXJhIjoxODAsInBlc28iOjgwLCJwYXJ0aWRvcyI6W3siaWQiOjEsImZlY2hhIjpudWxsLCJhZHZlcnNhcmlvIjoiIiwicHVudG9zUHJvcGlvQ2x1YiI6MCwicHVudG9zQWR2ZXJzYXJpbyI6MCwiZXN0YWRpc3RpY2FzIjp7Im1pbnV0b3NKdWdhZG9zIjowLCJzZWd1bmRvc0p1Z2Fkb3MiOjAsInB1bnRvcyI6MCwicmVib3Rlc09mZW5zaXZvcyI6MCwicmVib3Rlc0RlZmVuc2l2b3MiOjAsImFzaXN0ZW5jaWFzIjowLCJmYWx0YXNDb21ldGlkYXMiOjAsImZhbHRhc1JlY2liaWRhcyI6MCwidGFwb25lc0NvbWV0aWRvcyI6MCwidGFwb25lc1JlY2liaWRvcyI6MCwicGVyZGlkYXMiOjAsInJlY3VwZXJhY2lvbmVzIjowLCJ2YWxvcmFjaW9uIjowLCJ0aXJvcyI6eyJ0aXJvc0RlQ2FtcG8iOjAsInRpcm9zRGVDYW1wb0NvbnZlcnRpZG9zIjowLCJ0aXJvc0RlRG9zIjowLCJ0aXJvc0RlRG9zQ29udmVydGlkb3MiOjAsInRpcm9zRGVUcmVzIjowLCJ0aXJvc0RlVHJlc0NvbnZlcnRpZG9zIjowLCJ0aXJvc0xpYnJlcyI6MCwidGlyb3NMaWJyZXNDb252ZXJ0aWRvcyI6MCwiX2lkIjoiNjZkODk3YmVjNmNhMzBmNDBhMGI2ZDA2In0sIl9pZCI6IjY2ZDg5N2JlYzZjYTMwZjQwYTBiNmQwNSJ9LCJfaWQiOiI2NmQ4OTdiZWM2Y2EzMGY0MGEwYjZkMDQifV0sIl9pZCI6IjY2ZDg5N2JlYzZjYTMwZjQwYTBiNmQwMyJ9LCJfaWQiOiI2NmQ4OTdiZWM2Y2EzMGY0MGEwYjZkMDIiLCJfX3YiOjB9LCJpYXQiOjE3MjU0NzA2NTQsImV4cCI6MTcyNTY0MzQ1NH0.mB3VU4Yf0Ly6yP9xsiB23Z1mLwblYG2Z4QYBGGVOAZE";

    const decodedToken = jwt.verify(token, EnvVars.Jwt.Secret) as {
      usuario: IUsuario;
    };
    const usuario = decodedToken.usuario;
    const partidos = await UsuarioService.partidosPorAsistencias(usuario, pagina);
    return res.status(HttpStatusCodes.OK).json({ partidos });
  } catch (err) {
    console.error("Error al buscar partidos por asistencias:", err);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
}

async function partidosPorRebotes(req: IReq, res: IRes) {
  const pagina = +req.params.id;
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("Token no proporcionado");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    }

    // Eliminar la palabra 'Bearer ' del token
    const token = authHeader.replace("Bearer ", "");
    console.log("Token procesado:", token);
    if (!token) {
      console.log("Token no proporcionado");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    } else {
      console.log("Token proporcionado");
    }
    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjoxLCJlbWFpbCI6InNlYmFwQGdtYWlsLmNvbSIsImNyZWF0ZWQiOiIyMDI0LTA5LTA0VDE3OjI0OjE0LjE5OVoiLCJqdWdhZG9yIjp7ImlkIjoxLCJub21icmUiOiJzZWJhIiwiYXBlbGxpZG8iOiJwb3NhZG8iLCJuYWNpbWllbnRvIjoiMjAyNC0wOS0wMlQwMDowMDowMC4wMDBaIiwiY2x1YiI6ImZlcnJvIiwiZG9yc2FsIjoxMiwiYWx0dXJhIjoxODAsInBlc28iOjgwLCJwYXJ0aWRvcyI6W3siaWQiOjEsImZlY2hhIjpudWxsLCJhZHZlcnNhcmlvIjoiIiwicHVudG9zUHJvcGlvQ2x1YiI6MCwicHVudG9zQWR2ZXJzYXJpbyI6MCwiZXN0YWRpc3RpY2FzIjp7Im1pbnV0b3NKdWdhZG9zIjowLCJzZWd1bmRvc0p1Z2Fkb3MiOjAsInB1bnRvcyI6MCwicmVib3Rlc09mZW5zaXZvcyI6MCwicmVib3Rlc0RlZmVuc2l2b3MiOjAsImFzaXN0ZW5jaWFzIjowLCJmYWx0YXNDb21ldGlkYXMiOjAsImZhbHRhc1JlY2liaWRhcyI6MCwidGFwb25lc0NvbWV0aWRvcyI6MCwidGFwb25lc1JlY2liaWRvcyI6MCwicGVyZGlkYXMiOjAsInJlY3VwZXJhY2lvbmVzIjowLCJ2YWxvcmFjaW9uIjowLCJ0aXJvcyI6eyJ0aXJvc0RlQ2FtcG8iOjAsInRpcm9zRGVDYW1wb0NvbnZlcnRpZG9zIjowLCJ0aXJvc0RlRG9zIjowLCJ0aXJvc0RlRG9zQ29udmVydGlkb3MiOjAsInRpcm9zRGVUcmVzIjowLCJ0aXJvc0RlVHJlc0NvbnZlcnRpZG9zIjowLCJ0aXJvc0xpYnJlcyI6MCwidGlyb3NMaWJyZXNDb252ZXJ0aWRvcyI6MCwiX2lkIjoiNjZkODk3YmVjNmNhMzBmNDBhMGI2ZDA2In0sIl9pZCI6IjY2ZDg5N2JlYzZjYTMwZjQwYTBiNmQwNSJ9LCJfaWQiOiI2NmQ4OTdiZWM2Y2EzMGY0MGEwYjZkMDQifV0sIl9pZCI6IjY2ZDg5N2JlYzZjYTMwZjQwYTBiNmQwMyJ9LCJfaWQiOiI2NmQ4OTdiZWM2Y2EzMGY0MGEwYjZkMDIiLCJfX3YiOjB9LCJpYXQiOjE3MjU0NzA2NTQsImV4cCI6MTcyNTY0MzQ1NH0.mB3VU4Yf0Ly6yP9xsiB23Z1mLwblYG2Z4QYBGGVOAZE";

    const decodedToken = jwt.verify(token, EnvVars.Jwt.Secret) as {
      usuario: IUsuario;
    };
    const usuario = decodedToken.usuario;
    const partidos = await UsuarioService.partidosPorRebotes(usuario, pagina);
    return res.status(HttpStatusCodes.OK).json({ partidos });
  } catch (err) {
    console.error("Error al buscar partidos por rebotes:", err);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
}

async function partidosPorValoracion(req: IReq, res: IRes) {
  const pagina = +req.params.id;
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("Token no proporcionado");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    }

    // Eliminar la palabra 'Bearer ' del token
    const token = authHeader.replace("Bearer ", "");
    console.log("Token procesado:", token);
    if (!token) {
      console.log("Token no proporcionado");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    } else {
      console.log("Token proporcionado");
    }
    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjoxLCJlbWFpbCI6InNlYmFwQGdtYWlsLmNvbSIsImNyZWF0ZWQiOiIyMDI0LTA5LTA0VDE3OjI0OjE0LjE5OVoiLCJqdWdhZG9yIjp7ImlkIjoxLCJub21icmUiOiJzZWJhIiwiYXBlbGxpZG8iOiJwb3NhZG8iLCJuYWNpbWllbnRvIjoiMjAyNC0wOS0wMlQwMDowMDowMC4wMDBaIiwiY2x1YiI6ImZlcnJvIiwiZG9yc2FsIjoxMiwiYWx0dXJhIjoxODAsInBlc28iOjgwLCJwYXJ0aWRvcyI6W3siaWQiOjEsImZlY2hhIjpudWxsLCJhZHZlcnNhcmlvIjoiIiwicHVudG9zUHJvcGlvQ2x1YiI6MCwicHVudG9zQWR2ZXJzYXJpbyI6MCwiZXN0YWRpc3RpY2FzIjp7Im1pbnV0b3NKdWdhZG9zIjowLCJzZWd1bmRvc0p1Z2Fkb3MiOjAsInB1bnRvcyI6MCwicmVib3Rlc09mZW5zaXZvcyI6MCwicmVib3Rlc0RlZmVuc2l2b3MiOjAsImFzaXN0ZW5jaWFzIjowLCJmYWx0YXNDb21ldGlkYXMiOjAsImZhbHRhc1JlY2liaWRhcyI6MCwidGFwb25lc0NvbWV0aWRvcyI6MCwidGFwb25lc1JlY2liaWRvcyI6MCwicGVyZGlkYXMiOjAsInJlY3VwZXJhY2lvbmVzIjowLCJ2YWxvcmFjaW9uIjowLCJ0aXJvcyI6eyJ0aXJvc0RlQ2FtcG8iOjAsInRpcm9zRGVDYW1wb0NvbnZlcnRpZG9zIjowLCJ0aXJvc0RlRG9zIjowLCJ0aXJvc0RlRG9zQ29udmVydGlkb3MiOjAsInRpcm9zRGVUcmVzIjowLCJ0aXJvc0RlVHJlc0NvbnZlcnRpZG9zIjowLCJ0aXJvc0xpYnJlcyI6MCwidGlyb3NMaWJyZXNDb252ZXJ0aWRvcyI6MCwiX2lkIjoiNjZkODk3YmVjNmNhMzBmNDBhMGI2ZDA2In0sIl9pZCI6IjY2ZDg5N2JlYzZjYTMwZjQwYTBiNmQwNSJ9LCJfaWQiOiI2NmQ4OTdiZWM2Y2EzMGY0MGEwYjZkMDQifV0sIl9pZCI6IjY2ZDg5N2JlYzZjYTMwZjQwYTBiNmQwMyJ9LCJfaWQiOiI2NmQ4OTdiZWM2Y2EzMGY0MGEwYjZkMDIiLCJfX3YiOjB9LCJpYXQiOjE3MjU0NzA2NTQsImV4cCI6MTcyNTY0MzQ1NH0.mB3VU4Yf0Ly6yP9xsiB23Z1mLwblYG2Z4QYBGGVOAZE";

    const decodedToken = jwt.verify(token, EnvVars.Jwt.Secret) as {
      usuario: IUsuario;
    };
    const usuario = decodedToken.usuario;
    const partidos = await UsuarioService.partidosPorValoracion(usuario, pagina);
    return res.status(HttpStatusCodes.OK).json({ partidos });
  } catch (err) {
    console.error("Error al buscar partidos por valoracion:", err);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
}

async function getFederaciones(req: IReq, res: IRes) {
  const id = +req.params.id;
  console.log(id);
  try {
    const federaciones = await UsuarioService.getFederaciones(id);
    return res.status(HttpStatusCodes.OK).json({ federaciones });
  } catch (err) {
    console.error("Error al buscar federaciones:", err);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
}

async function traerCantidadPartidos(req: IReq, res: IRes) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("Token no proporcionado");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    }

    // Eliminar la palabra 'Bearer ' del token
    const token = authHeader.replace("Bearer ", "");
    console.log("Token procesado:", token);
    if (!token) {
      console.log("Token no proporcionado");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    } else {
      console.log("Token proporcionado");
    }
    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjoxLCJlbWFpbCI6IjJAZ21haWwuY29tIiwiY3JlYXRlZCI6IjIwMjQtMTEtMTFUMTY6MjQ6NDEuNDQ5WiIsImp1Z2Fkb3IiOnsiaWQiOjEsIm5vbWJyZSI6IjEiLCJhcGVsbGlkbyI6IjEiLCJuYWNpbWllbnRvIjoiMjAyNC0xMS0wOFQwMDowMDowMC4wMDBaIiwiY2x1YiI6IkVsIFRhbGFyIiwiZG9yc2FsIjoxLCJhbHR1cmEiOjEsInBlc28iOjEsInBhcnRpZG9zIjpbeyJpZCI6MSwiZmVjaGEiOm51bGwsImFkdmVyc2FyaW8iOiIiLCJwdW50b3NQcm9waW9DbHViIjowLCJwdW50b3NBZHZlcnNhcmlvIjowLCJlc3RhZGlzdGljYXMiOnsibWludXRvc0p1Z2Fkb3MiOjAsInNlZ3VuZG9zSnVnYWRvcyI6MCwicHVudG9zIjowLCJyZWJvdGVzT2ZlbnNpdm9zIjowLCJyZWJvdGVzRGVmZW5zaXZvcyI6MCwiYXNpc3RlbmNpYXMiOjAsImZhbHRhc0NvbWV0aWRhcyI6MCwiZmFsdGFzUmVjaWJpZGFzIjowLCJ0YXBvbmVzQ29tZXRpZG9zIjowLCJ0YXBvbmVzUmVjaWJpZG9zIjowLCJwZXJkaWRhcyI6MCwicmVjdXBlcmFjaW9uZXMiOjAsInZhbG9yYWNpb24iOjAsInRpcm9zIjp7InRpcm9zRGVDYW1wbyI6MCwidGlyb3NEZUNhbXBvQ29udmVydGlkb3MiOjAsInRpcm9zRGVEb3MiOjAsInRpcm9zRGVEb3NDb252ZXJ0aWRvcyI6MCwidGlyb3NEZVRyZXMiOjAsInRpcm9zRGVUcmVzQ29udmVydGlkb3MiOjAsInRpcm9zTGlicmVzIjowLCJ0aXJvc0xpYnJlc0NvbnZlcnRpZG9zIjowLCJfaWQiOiI2NzMyMmZjOTI2MDExZTQxOThmODc5YTcifSwiX2lkIjoiNjczMjJmYzkyNjAxMWU0MTk4Zjg3OWE2In0sIl9pZCI6IjY3MzIyZmM5MjYwMTFlNDE5OGY4NzlhNSJ9XSwiX2lkIjoiNjczMjJmYzkyNjAxMWU0MTk4Zjg3OWE0In0sIl9pZCI6IjY3MzIyZmM5MjYwMTFlNDE5OGY4NzlhMyIsIl9fdiI6MH0sImlhdCI6MTczMTM0MjI4MSwiZXhwIjoxNzMxNTE1MDgxfQ.PZuqHgZnkynhOmOH2RFMWPhF31HjrslSeaMg_zhmg4c";

    const decodedToken = jwt.verify(token, EnvVars.Jwt.Secret) as {
      usuario: IUsuario;
    };
    const usuario = decodedToken.usuario;
    const partidos = await UsuarioService.traerCantidadPartidos(usuario);
    return res.status(HttpStatusCodes.OK).json({ partidos });
  } catch (err) {
    console.error("Error al buscar partidos por valoracion:", err);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
}

async function traerFederacion(req: IReq, res: IRes) {
  const id = +req.params.id;
  console.log(id);
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("Token no proporcionado");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    }

    // Eliminar la palabra 'Bearer ' del token
    const token = authHeader.replace("Bearer ", "");
    console.log("Token procesado:", token);
    if (!token) {
      console.log("Token no proporcionado");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    } else {
      console.log("Token proporcionado");
    }
    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjoxLCJlbWFpbCI6IjJAZ21haWwuY29tIiwiY3JlYXRlZCI6IjIwMjQtMTEtMTFUMTY6MjQ6NDEuNDQ5WiIsImp1Z2Fkb3IiOnsiaWQiOjEsIm5vbWJyZSI6IjEiLCJhcGVsbGlkbyI6IjEiLCJuYWNpbWllbnRvIjoiMjAyNC0xMS0wOFQwMDowMDowMC4wMDBaIiwiY2x1YiI6IkVsIFRhbGFyIiwiZG9yc2FsIjoxLCJhbHR1cmEiOjEsInBlc28iOjEsInBhcnRpZG9zIjpbeyJpZCI6MSwiZmVjaGEiOm51bGwsImFkdmVyc2FyaW8iOiIiLCJwdW50b3NQcm9waW9DbHViIjowLCJwdW50b3NBZHZlcnNhcmlvIjowLCJlc3RhZGlzdGljYXMiOnsibWludXRvc0p1Z2Fkb3MiOjAsInNlZ3VuZG9zSnVnYWRvcyI6MCwicHVudG9zIjowLCJyZWJvdGVzT2ZlbnNpdm9zIjowLCJyZWJvdGVzRGVmZW5zaXZvcyI6MCwiYXNpc3RlbmNpYXMiOjAsImZhbHRhc0NvbWV0aWRhcyI6MCwiZmFsdGFzUmVjaWJpZGFzIjowLCJ0YXBvbmVzQ29tZXRpZG9zIjowLCJ0YXBvbmVzUmVjaWJpZG9zIjowLCJwZXJkaWRhcyI6MCwicmVjdXBlcmFjaW9uZXMiOjAsInZhbG9yYWNpb24iOjAsInRpcm9zIjp7InRpcm9zRGVDYW1wbyI6MCwidGlyb3NEZUNhbXBvQ29udmVydGlkb3MiOjAsInRpcm9zRGVEb3MiOjAsInRpcm9zRGVEb3NDb252ZXJ0aWRvcyI6MCwidGlyb3NEZVRyZXMiOjAsInRpcm9zRGVUcmVzQ29udmVydGlkb3MiOjAsInRpcm9zTGlicmVzIjowLCJ0aXJvc0xpYnJlc0NvbnZlcnRpZG9zIjowLCJfaWQiOiI2NzMyMmZjOTI2MDExZTQxOThmODc5YTcifSwiX2lkIjoiNjczMjJmYzkyNjAxMWU0MTk4Zjg3OWE2In0sIl9pZCI6IjY3MzIyZmM5MjYwMTFlNDE5OGY4NzlhNSJ9XSwiX2lkIjoiNjczMjJmYzkyNjAxMWU0MTk4Zjg3OWE0In0sIl9pZCI6IjY3MzIyZmM5MjYwMTFlNDE5OGY4NzlhMyIsIl9fdiI6MH0sImlhdCI6MTczMTM0MjI4MSwiZXhwIjoxNzMxNTE1MDgxfQ.PZuqHgZnkynhOmOH2RFMWPhF31HjrslSeaMg_zhmg4c";

    const decodedToken = jwt.verify(token, EnvVars.Jwt.Secret) as {
      usuario: IUsuario;
    };
    const usuario = decodedToken.usuario;
    const federacion = await UsuarioService.traerFederacion(usuario);
    return res.status(HttpStatusCodes.OK).json({ federacion });
  } catch (err) {
    console.error("Error al buscar federacion:", err);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
}
// **** Export default **** //

export default {
  promedio,
  login,
  register,
  agregarPartido,
  traerDatosPersonales,
  partidosPorPuntos,
  partidosPorMinutos,
  partidosPorAsistencias,
  partidosPorRebotes,
  partidosPorValoracion,
  getFederaciones,
  traerCantidadPartidos,
  traerFederacion,
} as const;
