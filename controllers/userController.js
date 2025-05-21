const Usuario = require('../models/userModel');

exports.crearUsuario = (req, res) => {
  Usuario.crear(req.body, (err, resultado) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensaje: 'Error al crear usuario' });
    }
    res.status(201).json({ mensaje: 'Usuario creado', id: resultado.insertId });
  });
};

exports.obtenerUsuarios = (req, res) => {
  Usuario.obtenerTodos((err, filas) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensaje: 'Error al obtener usuarios' });
    }
    res.status(200).json(filas);
  });
};
