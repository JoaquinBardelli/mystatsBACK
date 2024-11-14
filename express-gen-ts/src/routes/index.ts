import { Router } from "express";
import jetValidator from "jet-validator";

import Paths from "../common/Paths";
import Usuario from "@src/models/Usuario";
import UsuarioRoutes from "./UsuarioRoutes";
import Partido from "@src/models/Partido";
import Federacion from "@src/models/Federacion";

// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();

// ** Add UserRouter ** //

const userRouter = Router();

userRouter.post(
  Paths.Usuarios.Login,
  validate(["usuarios", Usuario.isLogin]),
  UsuarioRoutes.login
);

userRouter.post(
  Paths.Usuarios.Register,
  validate(["usuarios", Usuario.isUsuario]),
  UsuarioRoutes.register
);

userRouter.get(Paths.Usuarios.GetFederaciones, UsuarioRoutes.getFederaciones);

userRouter.post(Paths.Usuarios.Logout);

userRouter.get(Paths.Usuarios.Promedio, UsuarioRoutes.promedio);

userRouter.get(
  Paths.Usuarios.TraerDatosPersonales,
  UsuarioRoutes.traerDatosPersonales
);

userRouter.get(
  Paths.Usuarios.PartidosPorPuntos,
  UsuarioRoutes.partidosPorPuntos
);

userRouter.get(
  Paths.Usuarios.PartidosPorMinutos,
  UsuarioRoutes.partidosPorMinutos
);

userRouter.get(
  Paths.Usuarios.PartidosPorAsistencias,
  UsuarioRoutes.partidosPorAsistencias
);

userRouter.get(
  Paths.Usuarios.PartidosPorRebotes,
  UsuarioRoutes.partidosPorRebotes
);

userRouter.get(
  Paths.Usuarios.PartidosPorValoracion,
  UsuarioRoutes.partidosPorValoracion
);

userRouter.get(
  Paths.Usuarios.TraerCantidadPartidos,
  UsuarioRoutes.traerCantidadPartidos
);

userRouter.post(
  Paths.Usuarios.AgregarPartido,
  validate(["partidos", Partido.isPartido]),
  UsuarioRoutes.agregarPartido
);

userRouter.get(
  Paths.Usuarios.TraerFederacion,
  UsuarioRoutes.traerFederacion
);

// Add UserRouter
apiRouter.use(Paths.Usuarios.Base, userRouter);

// **** Export default **** //

export default apiRouter;
