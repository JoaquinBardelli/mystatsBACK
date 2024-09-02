import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../common/Paths';
import Usuario from '@src/models/Usuario';
import UsuarioRoutes from './UsuarioRoutes';
import Partido from '@src/models/Partido';


// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();


// ** Add UserRouter ** //

const userRouter = Router();



// Delete one user


userRouter.post(
  Paths.Usuarios.Login,
  validate(['usuarios', Usuario.isLogin]),
  UsuarioRoutes.login,
);

userRouter.post(
  Paths.Usuarios.Register,
  validate(['usuarios', Usuario.isUsuario]),
  UsuarioRoutes.register,
);

userRouter.post(
  Paths.Usuarios.Logout,
);

userRouter.get(
  Paths.Usuarios.Promedio,
  UsuarioRoutes.promedio,
);

userRouter.get(
  Paths.Usuarios.TraerDatosPersonales,
  UsuarioRoutes.traerDatosPersonales,
);

userRouter.post(
  Paths.Usuarios.AgregarPartido,
  validate(['partidos', Partido.isPartido]),
  UsuarioRoutes.agregarPartido,
);


// Add UserRouter
apiRouter.use(Paths.Usuarios.Base, userRouter);


// **** Export default **** //

export default apiRouter;
