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
  let tokenReal = '';
  usuarioModel.findOne({ email: usuario.email }, (err: any, user: IUsuario) => {
    if (err) {
      return err;
    }
    if (!user) {
      return 'Usuario no encontrado';
    }
    if (!bcrypt.compareSync(usuario.password, user.password)) {
      return 'Contraseña incorrecta';
    }
    let token = jwt.sign({ 
      usuario: user,
    }, EnvVars.Jwt.Secret, {
      expiresIn: "48h"
    });
    tokenReal = token;
  });
  
  return tokenReal;
}

async function register(usuario: IUsuario): Promise<string> {
  let tokenReal = '';
  usuarioModel.findOne({ email: usuario.email }, (err: any, user: IUsuario) => {
    if (err) {
      return err;
    }
    if (user) {
      return 'Usuario ya existe';
    }
    let salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(usuario.password, salt);
    let token = jwt.sign({ 
      usuario: usuario,
    }, EnvVars.Jwt.Secret, {
      expiresIn: "48h"
    });
    tokenReal = token;
  });
  return tokenReal;
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