import Partido from "@src/models/Partido";

export default {
  Base: '/api',
  Usuarios: {
    Base: '/usuarios',
    Get: '/all',
    Add: '/add',
    AgregarDatos: '/agregarDatos',
    Update: '/update',
    Delete: '/delete/:id',
    GetFederaciones: '/federaciones/:id',
    Login: '/login',
    Register: '/register',
    Logout: '/logout',
    Promedio: '/promedio',
    AgregarPartido : '/agregarPartido',
    TraerDatosPersonales : '/traerDatos',
    PartidosPorPuntos : '/partidosPorPuntos',
    PartidosPorMinutos : '/partidosPorMinutos',
    PartidosPorAsistencias : '/partidosPorAsistencias',
    PartidosPorRebotes : '/partidosPorRebotes',
    PartidosPorValoracion : '/partidosPorValoracion',
  },
} as const;