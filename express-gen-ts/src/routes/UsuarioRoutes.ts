import HttpStatusCodes from "@src/common/HttpStatusCodes";

import UsuarioService from "@src/services/UsuarioService";
import { IUsuario } from "@src/models/Usuario";
import { IReq, IRes } from "./types/express/misc";
import { IJugador } from "@src/models/Jugador";
import { IPartido } from "@src/models/Partido";
import EnvVars from "@src/common/EnvVars";
import jwt from "jsonwebtoken";
import e from "cors";

// **** Functions **** //

/**
 * Get all usuarios.
 */
async function get(req: IReq, res: IRes) {
  try {
    const usuarios = await UsuarioService.get();
    return res.status(HttpStatusCodes.OK).json({ usuarios });
  } catch (err) {
    console.error("Error al obtener los usuarios:", err);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
}

async function login(req: IReq<{ usuarios: IUsuario }>, res: IRes) {
  console.log("LOGEANDO USUARIO");
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
  if(usuario.email === "admin"){
    usuario.admin = true;
  }else{
    console.log("No es admin");
  }
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
  console.log("PROMEDIO");
  console.log(req.body);
  console.log(req.headers);
  console.log(req.params);
  console.log(req.query);
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.log("Token no proporcionado");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    }

    // Eliminar la palabra 'Bearer ' del token
    const token = authHeader.replace("Bearer ", "").trim();
    console.log("Token procesado:", token);

    if (!token) {
      console.log("Token no proporcionado tras limpiar");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    }

    // Decodificar el token
    const decodedToken = jwt.verify(token, EnvVars.Jwt.Secret) as {
      email: string;
    };

    if (!decodedToken || !decodedToken.email) {
      console.error("Token inválido o falta el email");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token inválido o falta el email" });
    }

    console.log("Token decodificado:", decodedToken);
    const email = decodedToken.email;
    const promedio = await UsuarioService.promedio(email);
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
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.log("Token no proporcionado");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    }

    // Eliminar la palabra 'Bearer ' del token
    const token = authHeader.replace("Bearer ", "").trim();
    console.log("Token procesado:", token);

    if (!token) {
      console.log("Token no proporcionado tras limpiar");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    }

    // Decodificar el token
    const decodedToken = jwt.verify(token, EnvVars.Jwt.Secret) as {
      email: string;
    };

    if (!decodedToken || !decodedToken.email) {
      console.error("Token inválido o falta el email");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token inválido o falta el email" });
    }

    console.log("Token decodificado:", decodedToken);
    const email = decodedToken.email;
    //console.log("email en routes agregarPartido routes" + email);

    // Obtener el partido de la solicitud
    //const  partido  = req.body as { partido: IPartido };
    const partido = req.body.partidos as IPartido;
    console.log("Partido req" + req.body);
    console.log("Partido en routes agregarPartido routes" + partido);
    // Llamar al servicio para agregar el partido al email
    console.log("PARTIDO" + req.body);
    await UsuarioService.agregarPartido(email, req.body.partidos);

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

    // Eliminar la palabra 'Bearer ' del token
    const token = authHeader.replace("Bearer ", "").trim();
    console.log("Token procesado:", token);

    if (!token) {
      console.log("Token no proporcionado tras limpiar");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    }

    // Decodificar el token
    const decodedToken = jwt.verify(token, EnvVars.Jwt.Secret) as {
      email: string;
    };

    if (!decodedToken || !decodedToken.email) {
      console.error("Token inválido o falta el email");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token inválido o falta el email" });
    }

    console.log("Token decodificado:", decodedToken);
    const email = decodedToken.email;

    const datos = await UsuarioService.traerDatosPersonales(email);
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
    const token = authHeader.replace("Bearer ", "").trim();
    console.log("Token procesado:", token);

    if (!token) {
      console.log("Token no proporcionado tras limpiar");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    }

    // Decodificar el token
    const decodedToken = jwt.verify(token, EnvVars.Jwt.Secret) as {
      email: string;
    };

    if (!decodedToken || !decodedToken.email) {
      console.error("Token inválido o falta el email");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token inválido o falta el email" });
    }

    console.log("Token decodificado:", decodedToken);
    const email = decodedToken.email;
    const partidos = await UsuarioService.partidosPorPuntos(email, pagina);
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
    const token = authHeader.replace("Bearer ", "").trim();
    console.log("Token procesado:", token);

    if (!token) {
      console.log("Token no proporcionado tras limpiar");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    }

    // Decodificar el token
    const decodedToken = jwt.verify(token, EnvVars.Jwt.Secret) as {
      email: string;
    };

    if (!decodedToken || !decodedToken.email) {
      console.error("Token inválido o falta el email");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token inválido o falta el email" });
    }

    console.log("Token decodificado:", decodedToken);
    const email = decodedToken.email;
    const partidos = await UsuarioService.partidosPorMinutos(email, pagina);
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
    const token = authHeader.replace("Bearer ", "").trim();
    console.log("Token procesado:", token);

    if (!token) {
      console.log("Token no proporcionado tras limpiar");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    }

    // Decodificar el token
    const decodedToken = jwt.verify(token, EnvVars.Jwt.Secret) as {
      email: string;
    };

    if (!decodedToken || !decodedToken.email) {
      console.error("Token inválido o falta el email");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token inválido o falta el email" });
    }

    console.log("Token decodificado:", decodedToken);
    const email = decodedToken.email;
    const partidos = await UsuarioService.partidosPorAsistencias(email, pagina);
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
    const token = authHeader.replace("Bearer ", "").trim();
    console.log("Token procesado:", token);

    if (!token) {
      console.log("Token no proporcionado tras limpiar");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    }

    // Decodificar el token
    const decodedToken = jwt.verify(token, EnvVars.Jwt.Secret) as {
      email: string;
    };

    if (!decodedToken || !decodedToken.email) {
      console.error("Token inválido o falta el email");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token inválido o falta el email" });
    }

    console.log("Token decodificado:", decodedToken);
    const email = decodedToken.email;
    const partidos = await UsuarioService.partidosPorRebotes(email, pagina);
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
  console.log("Pagina:", pagina);
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.log("Token no proporcionado");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    }

    // Eliminar la palabra 'Bearer ' del token
    const token = authHeader.replace("Bearer ", "").trim();
    console.log("Token procesado:", token);

    if (!token) {
      console.log("Token no proporcionado tras limpiar");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    }

    // Decodificar el token
    const decodedToken = jwt.verify(token, EnvVars.Jwt.Secret) as {
      email: string;
    };

    if (!decodedToken || !decodedToken.email) {
      console.error("Token inválido o falta el email");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token inválido o falta el email" });
    }

    console.log("Token decodificado:", decodedToken);
    const email = decodedToken.email;
    const partidos = await UsuarioService.partidosPorValoracion(email, pagina);
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
    const token = authHeader.replace("Bearer ", "").trim();
    console.log("Token procesado:", token);

    if (!token) {
      console.log("Token no proporcionado tras limpiar");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    }

    // Decodificar el token
    const decodedToken = jwt.verify(token, EnvVars.Jwt.Secret) as {
      email: string;
    };

    if (!decodedToken || !decodedToken.email) {
      console.error("Token inválido o falta el email");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token inválido o falta el email" });
    }

    console.log("Token decodificado:", decodedToken);
    const email = decodedToken.email;
    const partidos = await UsuarioService.traerCantidadPartidos(email);
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
    const token = authHeader.replace("Bearer ", "").trim();
    console.log("Token procesado:", token);

    if (!token) {
      console.log("Token no proporcionado tras limpiar");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    }

    // Decodificar el token
    const decodedToken = jwt.verify(token, EnvVars.Jwt.Secret) as {
      email: string;
    };

    if (!decodedToken || !decodedToken.email) {
      console.error("Token inválido o falta el email");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token inválido o falta el email" });
    }

    console.log("Token decodificado:", decodedToken);
    const email = decodedToken.email;
    const federacion = await UsuarioService.traerFederacion(email);
    return res.status(HttpStatusCodes.OK).json({ federacion });
  } catch (err) {
    console.error("Error al buscar federacion:", err);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
}

async function borrarPartido(
  req: IReq<{ id: number; email: string }>,
  res: IRes
) {
  console.log(req.params);
  console.log(req.body);
  const id = req.body.id;
  const mailABorrar = req.body.email;

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
    const token = authHeader.replace("Bearer ", "").trim();
    console.log("Token procesado:", token);

    if (!token) {
      console.log("Token no proporcionado tras limpiar");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token no proporcionado" });
    }

    // Decodificar el token
    const decodedToken = jwt.verify(token, EnvVars.Jwt.Secret) as {
      email: string;
    };

    if (!decodedToken || !decodedToken.email) {
      console.error("Token inválido o falta el email");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Token inválido o falta el email" });
    }

    console.log("Token decodificado:", decodedToken);
    console.log("Email a borrar: " + mailABorrar);
    const email = decodedToken.email;
    /*if (email === "admin@gmail.com") {
      await UsuarioService.borrarPartido(mailABorrar, id);
      return res
        .status(HttpStatusCodes.OK)
        .json({ message: "Partido borrado correctamente" });
    }else{
      console.log("No tienes permisos para borrar partidos");
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "No tienes permisos para borrar partidos" });
    }*/
    await UsuarioService.borrarPartido(mailABorrar, id, email);
  } catch (err) {
    console.error("Error al buscar federacion:", err);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
}
// **** Export default **** //

export default {
  get,
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
  borrarPartido,
} as const;
