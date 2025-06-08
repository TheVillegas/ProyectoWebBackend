const db = require('../config/db');

const Evento = {};

Evento.crear = (datosEvento, callback) => {
  const { nombre_evento, fecha_inicio, fecha_termino, descripcion, ubicacion, url } = datosEvento;
  
  const query = `
    INSERT INTO eventos 
    (nombre_evento, fecha_inicio, fecha_termino, descripcion, ubicacion, url)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [nombre_evento, fecha_inicio, fecha_termino, descripcion, ubicacion, url], callback);
};

Evento.obtenerTodos = (callback) => {
  db.query('SELECT * FROM eventos', callback);
};

Evento.obtenerPorId = (id, callback) => {
  db.query('SELECT * FROM eventos WHERE id = ?', [id], callback);
};

Evento.actualizar = (id, datosActualizados, callback) => {
  const { nombre_evento, fecha_inicio, fecha_termino, descripcion, ubicacion, url } = datosActualizados;
  
  const query = `
    UPDATE eventos 
    SET nombre_evento = ?, fecha_inicio = ?, fecha_termino = ?, descripcion = ?, ubicacion = ?, url = ?
    WHERE id = ?
  `;

  db.query(query, [nombre_evento, fecha_inicio, fecha_termino, descripcion, ubicacion, url, id], callback);
};

Evento.eliminar = (id, callback) => {
  db.query('DELETE FROM eventos WHERE id = ?', [id], callback);
};

module.exports = Evento;