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
    PartidosPorPuntos : '/partidosPorPuntos/:id',
    PartidosPorMinutos : '/partidosPorMinutos/:id',
    PartidosPorAsistencias : '/partidosPorAsistencias/:id',
    PartidosPorRebotes : '/partidosPorRebotes/:id',
    PartidosPorValoracion : '/partidosPorValoracion/:id',
    TraerCantidadPartidos: '/cantidadPartidos',
    TraerFederacion: '/federacion',
    BorrarPartido: '/borrar/:id'
  },
} as const;