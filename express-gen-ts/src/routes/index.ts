import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../common/Paths';
import Usuario from '@src/models/Usuario';
import UsuarioRoutes from './UsuarioRoutes';


// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();


// ** Add UserRouter ** //

const userRouter = Router();

// Get all users
userRouter.get(
  Paths.Usuarios.Get,
  UsuarioRoutes.getAll,
);

// Add one user
userRouter.post(
  Paths.Usuarios.Add,
  validate(['user', Usuario.isUsuario]),
  UsuarioRoutes.add,
);

// Update one user
userRouter.put(
  Paths.Usuarios.Update,
  validate(['user', Usuario.isUsuario]),
  UsuarioRoutes.update,
);

userRouter.put(
  Paths.Usuarios.AgregarDatos,
  validate(['user', Usuario.isUsuario]),
  UsuarioRoutes.agregarDatos,
);

// Delete one user
userRouter.delete(
  Paths.Usuarios.Delete,
  validate(['id', 'number', 'params']),
  UsuarioRoutes.delete,
);

userRouter.post(
  Paths.Usuarios.Login,
  UsuarioRoutes.login,
);

userRouter.post(
  Paths.Usuarios.Register,
  validate(['usuarios', Usuario.isUsuario]),
  UsuarioRoutes.register,
);

// Add UserRouter
apiRouter.use(Paths.Usuarios.Base, userRouter);


// **** Export default **** //

export default apiRouter;
