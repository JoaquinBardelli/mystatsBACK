import { IUsuario } from '@src/models/Usuario';
import { getRandomInt } from '@src/util/misc';
import orm from './MockOrm';
import { usuarioModel } from './Mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import EnvVars from '@src/common/EnvVars';
import { token } from 'morgan';
 
 
// **** Functions **** //
async function login(usuario: IUsuario): Promise<string> {
  //traer los datos de mongo del usuario con ese email  
  const usuarios = await usuarioModel.findOne({ email: usuario.email }).exec();
  console.log("Datos traidos de mongo" + usuarios);
  //console.log(usuarios.get); 
  console.log("Usuario en repo" + usuario);
  const user = await usuarioModel.findOne({ email: usuario.email }).exec();
  console.log("Resultado de findone" + user);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  /*if (usuario.password !== user.password) {
    throw new Error('Contraseña incorrecta');
  } else {
    console.log("Contraseña correcta");
    console.log("Usuario logeado: " + user);
    // Aquí puedes continuar con el proceso de login, como generar un token JWT.
    return "Login exitoso";
  }*/
  if (!bcrypt.compareSync(usuario.password, user.password)) {
    throw new Error('Contraseña incorrecta');
  }else{
    console.log("Contraseña correcta");
    console.log("Usuario logeado: " + user);
  }
  const token = jwt.sign({ 
    usuario: user,
  }, EnvVars.Jwt.Secret, {
    expiresIn: "48h"
  });
  return token;
}


/*async function register(usuario: IUsuario): Promise<string> {
  console.log("Usuario en repo" + usuario);
  const existingUser = "";
  console.log(await usuarioModel.findOne({ email: usuario.email }).exec());
  if (existingUser) {
    throw new Error('Usuario ya existe');
  }
  const salt = bcrypt.genSaltSync(10);
  usuario.password = bcrypt.hashSync(usuario.password, salt);
  const newUser = new usuarioModel(usuario);
  await newUser.save();
  const token = jwt.sign({ 
    usuario: newUser,
  }, EnvVars.Jwt.Secret, {
    expiresIn: "48h"
  });
  return token;
}*/

async function register(usuario: IUsuario): Promise<string> {
  console.log("Usuario en repo", usuario);

  // Busca si el usuario ya existe en la base de datos
  const existingUser = await usuarioModel.findOne({ email: usuario.email }).exec();
  console.log("Lo que encuentra en findOne "+ existingUser);

  if (existingUser) {
    throw new Error('Usuario ya existe');
  }

  // Hashea la contraseña
  const salt = bcrypt.genSaltSync(10);
  usuario.password = bcrypt.hashSync(usuario.password, salt);

  // Crea una nueva instancia del modelo y guarda en la base de datos
  const newUser = new usuarioModel(usuario);
  await newUser.save()
  .then(() => console.log('Usuario guardado correctamente'))
  .catch(err => console.error('Error al guardar el usuario:', err));

  // Genera un token JWT
  const token = jwt.sign({ 
    usuario: newUser,
  }, EnvVars.Jwt.Secret, {
    expiresIn: "48h"
  });

  return token;
}


/**
* Get one usuario.
*/
async function getOne(email: string): Promise<IUsuario | null> {
  const db = await orm.openDb();
  for (const usuario of db.usuarios) {
    if (usuario.email === email) {
      return usuario;
    }
  }
  return null;
}
 
/**
* See if a usuario with the given id exists.
*/
async function persists(id: number): Promise<boolean> {
  const db = await orm.openDb();
  for (const usuario of db.usuarios) {
    if (usuario.id === id) {
      return true;
    }
  }
  return false;
}
 
/**
* Get all usuarios.
*/
async function getAll(): Promise<IUsuario[]> {
  const db = await orm.openDb();
  return db.usuarios;
}
 
/**
* Add one usuario.
*/
async function add(usuario: IUsuario): Promise<void> {
  const db = await orm.openDb();
  usuario.id = getRandomInt();
  db.usuarios.push(usuario);
  return orm.saveDb(db);
}
 
/**
* Update a usuario.
*/
async function update(usuario: IUsuario): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.usuarios.length; i++) {
    if (db.usuarios[i].id === usuario.id) {
      const dbusuario = db.usuarios[i];
      db.usuarios[i] = {
        ...dbusuario,
        email: usuario.email,
        password: usuario.password,
      };
      return orm.saveDb(db);
    }
  }
}
 
/**
* Delete one usuario.
*/
async function delete_(id: number): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.usuarios.length; i++) {
    if (db.usuarios[i].id === id) {
      db.usuarios.splice(i, 1);
      return orm.saveDb(db);
    }
  }
}

async function getLogeado(): Promise<IUsuario | null> {
    const db = await orm.openDb();
    for (const usuario of db.usuarios) {
        if (usuario.logeado) {
        return usuario;
        }
    }
    return null;
}
 
 
// **** Export default **** //
 
export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
  getLogeado,
  login,
  register,
} as const