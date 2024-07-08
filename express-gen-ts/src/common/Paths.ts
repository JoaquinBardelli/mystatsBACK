/**
 * Express router paths go here.
 */


export default {
  Base: '/api',
  Usuarios: {
    Base: '/usuarios',
    Get: '/all',
    Add: '/add',
    AgregarDatos: '/agregarDatos',
    Update: '/update',
    Delete: '/delete/:id',
  },
} as const;
