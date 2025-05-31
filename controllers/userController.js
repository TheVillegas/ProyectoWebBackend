const Usuario = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'tu_clave_secreta_aqui';
const db = require("../config/db");

//Metodo para autenticar un usuario recien creado. 
exports.crearUsuario = (req, res) => {
 const {
    nombre_apellido,
    rut,
    correo,
    ubicacion,
    establecimiento,
    contraseña,
    acepta_terminos
  } = req.body;

  try {
    // Verifica si ya existe un usuario con ese correo
    Usuario.BuscarPorCorreo(correo, async (err, usuarioExistenteCorreo) => {
      if (usuarioExistenteCorreo) {
        return res.status(400).json({ mensaje: 'El correo ya está registrado' });
      }

      // Verifica si ya existe un usuario con ese RUT
      Usuario.BuscarPorRut(rut, async (err, usuarioExistenteRut) => {
        if (usuarioExistenteRut) {
          return res.status(400).json({ mensaje: 'El RUT ya está registrado' });
        }

        // Encripta la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        const datosUsuario = {
          nombre_apellido,
          rut,
          correo,
          ubicacion,
          establecimiento,
          contraseña: hashedPassword,
          acepta_terminos
        };

        Usuario.crear(datosUsuario, (err, resultado) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ mensaje: 'Error al crear usuario' });
          }

          // Genera token JWT
          const token = jwt.sign(
            { id: resultado.insertId, correo },
            SECRET_KEY,
            { expiresIn: '1h' }
          );

          res.status(201).json({
            mensaje: 'Usuario creado con éxito',
            token
          });
        });
      });
    });
  } catch (error) {
    console.error('Error general al registrar usuario:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
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
  const { correo, contrasena } = req.body;
  if (!correo || !contrasena) return res.status(400).json({ mensaje: "Datos incompletos" });

  const query = 'SELECT * FROM tabla_usuarios WHERE correo = ?';

  db.query(query, [correo], (err, results) => {
    if (err) return res.status(500).json({ mensaje: "Error en la base de datos" });
    if (results.length === 0) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    const usuario = results[0];
    const passIsValid = bcrypt.compareSync(contrasena, usuario["contraseña"]);

    if (!passIsValid) return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    // correo incorrecto
    if (usuario.correo !== correo) {
      return res.status(401).json({ mensaje: "Correo incorrecto" });
    }


    // Si la contraseña es válida, se genera un token
    const token = jwt.sign({ id: usuario.id, correo: usuario.correo }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre_apellido,
        correo: usuario.correo
      }
    });
  });
};

//Metodo para crear un evento

exports.crearEvento = (req, res) => {
  const { nombre_evento, fecha_inicio, fecha_termino,descripcion,ubicacion,url} = req.body;
  
  if (!nombre_evento || !fecha_inicio || !fecha_termino || !descripcion || !ubicacion || !url) {
    return res.status(400).json({ mensaje: "Datos incompletos" });//cambiar mensaje
  }

  const query = 'INSERT INTO eventos (nombre_evento, fecha_inicio, fecha_termino, descripcion, ubicacion, url) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(query, [nombre_evento, fecha_inicio, fecha_termino, descripcion, ubicacion, url], (err, results) => {
    if(err) {
      console.error(err);
      return res.status(500).json({ mensaje: "Error al crear el evento" });
    }
    res.status(201).json({ mensaje: "Evento creado exitosamente", eventoId: results.insertId });
  });
}

exports.obtenerEventos = (req, res) => {
  const query = 'SELECT * FROM eventos';

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensaje: "Error al obtener eventos" });
    }
    res.status(200).json(results);
  });
}

exports.eliminarEvento = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ mensaje: "ID de evento requerido" });
  }

  const query = 'DELETE FROM eventos WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensaje: "Error al eliminar el evento" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Evento no encontrado" });
    }
    res.status(200).json({ mensaje: "Evento eliminado exitosamente" });
  });
}

exports.actualizarEvento = (req, res) => {
  const { id } = req.params;
  const { nombre_evento, fecha_inicio, fecha_termino, descripcion, ubicacion, url } = req.body;

  if (!id || !nombre_evento || !fecha_inicio || !fecha_termino || !descripcion || !ubicacion || !url) {
    return res.status(400).json({ mensaje: "Datos incompletos" });
  }

  const query = 'UPDATE eventos SET nombre_evento = ?, fecha_inicio = ?, fecha_termino = ?, descripcion = ?, ubicacion = ?, url = ? WHERE id = ?';

  db.query(query, [nombre_evento, fecha_inicio, fecha_termino, descripcion, ubicacion, url, id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensaje: "Error al actualizar el evento" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Evento no encontrado" });
    }
    res.status(200).json({ mensaje: "Evento actualizado exitosamente" });
  });
}