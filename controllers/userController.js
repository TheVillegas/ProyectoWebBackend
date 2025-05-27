const Usuario = require('../models/userModel');


const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../config/db");
const SECRET_KEY = "supersecret";



//Crea usuario
exports.crearUsuario = (req, res) => {
  Usuario.crear(req.body, (err, resultado) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensaje: 'Error al crear usuario' });
    }
    res.status(201).json({ mensaje: 'Usuario creado', id: resultado.insertId });
  });
};

//Obtiene lista De los Usuarios
exports.obtenerUsuarios = (req, res) => {
  Usuario.obtenerTodos((err, filas) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensaje: 'Error al obtener usuarios' });
    }
    res.status(200).json(filas);
  });
};


//Confirmar inicio de Sesión
exports.loginUser = (req, res) => {

  const { correo , contrasena } = req.body;
  if (!correo || !contrasena) return res.status(400).json({mensaje: "Datos incompletos"});

  const query = 'SELECT * FROM tabla_usuarios WHERE correo = ?';

  db.query(query,[correo],(err,results) => {
    if (err) return res.status(500).json({ mensaje: "Error en la base de datos"});
    if (results.length === 0) return res.status(404).json({ mensaje: "Usuario no encontrado"});

    const usuario = results[0];
    const passIsValid = bcrypt.compareSync(contrasena,usuario["contraseña"]);

    if (!passIsValid) return res.status(401).json({ mensaje: "Contraseña incorrecta"});

    const token = jwt.sign({ id: usuario.id, correo: usuario.correo }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  });
};