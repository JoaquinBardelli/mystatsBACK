export default {
  Base: '/api',
  Usuarios: {
    Base: '/usuarios',
    Get: '/all',
    Add: '/add',
    AgregarDatos: '/agregarDatos',
    Update: '/update',
    Delete: '/delete/:id',
    Login: '/login',
    Register: '/register',
    Logout: '/logout',
    Promedio: '/promedio',
    AgregarPartido : '/agregarPartido',
  },
} as const;