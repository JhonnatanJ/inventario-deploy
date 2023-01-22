const url= "https://api-geomundo.herokuapp.com";

export const environment = {
  production: true,
  //CUENTA SERVICE
  urlCuenta: url + "/geolib/cuentas",
  urlRol: url + "/geolib/roles",
  //LIBRO SERVICE
  urlLibros: url + "/geolib/libros",
  urlLibrosNombre: url + "/geolib/libros/nombre",
  urlImagen: url + "/geolib/imagenes",
  //NOTAVENTA SERVICE
  urlNotaVenta: url + "/geolib/notasventas",
  //REPORTE SERVICE
  urlReserva: url + "/geolib/reservas",
  //LOGIN SERVICE
  urlToken: "/oauth/token",
  //USUARIO SERVICE
  urlAutores: "geolib/autores",
};
