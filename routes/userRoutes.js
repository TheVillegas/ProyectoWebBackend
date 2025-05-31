// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { loginUser } = require("..//controllers/userController");

const userController = require('../controllers/userController');
// Ruta GET de prueba
router.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Ruta para iniciar sesión
router.post("/login", userController.loginUser);

// Ruta para registrar un nuevo usuario
router.post('/register',userController.crearUsuario);
// Ruta para obtener todos los usuarios
router.get('/usuarios', userController.obtenerUsuarios);
//Ruta par crear un evento
router.post('/crearEvento', userController.crearEvento);
//Ruta para obtener eventos
router.get('/obtenerEventos', userController.obtenerEventos);
//Ruta para eliminar un evento
router.delete('/eliminarEvento/:id', userController.eliminarEvento);
// Ruta para actualizar un evento
router.put('/actualizarEvento/:id', userController.actualizarEvento);




module.exports = router;
