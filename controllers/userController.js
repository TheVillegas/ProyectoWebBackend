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

exports.loginUser = (req, res) => {
  const { correo,contraseña } = req.body;
  if (!correo || !contraseña) {
    return res.status(400).json({ mensaje: 'Correo y contraseña son requeridos' });
  }

  Usuario.buscarPorCredenciales(correo, (err, usuario) => {
    if(err){
      console.error(err);
      return res.status(500).json({ mensaje: 'Error en el Servidor' });
    }
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    try{
      const contraseñaValida =bcrypt.compareSync(contraseña, usuario.contraseña);
      if(!contraseñaValida) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
      }
      // Genera token JWT
      const token = jwt.sign(
        { id: usuario.id, correo: usuario.correo },
        SECRET_KEY,
        { expiresIn: '1h' }
      );
      res.status(200).json({
        mensaje: 'Inicio de sesión exitoso',
        token,
        usuario: {
          id: usuario.id,
          nombre_apellido: usuario.nombre_apellido,
          correo: usuario.correo
        }
      });
    }catch (error) {
      console.error('Error al comparar contraseñas:', error);
      return res.status(500).json({ mensaje: 'Error del servidor' });
    }

  });
}
