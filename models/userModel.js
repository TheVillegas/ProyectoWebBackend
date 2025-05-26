const db = require('../config/db');

const Usuario = {};

//Busca un usuario por su correo electrónico
Usuario.BuscarPorCorreo = (correo, callback) => {
  db.query('SELECT * FROM tabla_usuarios WHERE correo = ?', [correo], (err, resultados) => {
    if(err) return callback(err);
    callback(null, resultados[0]);
  });
};
Usuario.BuscarPorRut = (rut, callback) => {
  db.query('SELECT * FROM tabla_usuarios WHERE rut = ?', [rut], (err, resultados) => {
    if(err) return callback(err);
    callback(null, resultados[0]);
  });
}


Usuario.crear = (datos, callback) => {
  const {
    nombre_apellido,
    rut,
    correo,
    ubicacion,
    establecimiento,
    contraseña,
    acepta_terminos
  } = datos;

  const fecha_registro = Math.floor(Date.now() / 1000);

  const query = `
    INSERT INTO tabla_usuarios 
    (nombre_apellido, rut, correo, ubicacion, establecimiento, contraseña, acepta_terminos, fecha_registro)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    nombre_apellido,
    rut,
    correo,
    ubicacion,
    establecimiento,
    contraseña,
    acepta_terminos,
    fecha_registro
  ];

  db.query(query, values, callback);
};

Usuario.obtenerTodos = (callback) => {
  db.query('SELECT * FROM tabla_usuarios', callback);
};

module.exports = Usuario;
