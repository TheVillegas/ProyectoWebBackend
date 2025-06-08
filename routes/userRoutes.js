// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');
const eventController = require('../controllers/eventController');


// Rutas Publicas Inicio de Sesión y Registro
router.post("/login", userController.loginUser);
router.post('/register',userController.crearUsuario);

//Rutas protegidas relacionada a Administración de Eventos y Usuarios

router.get('/usuarios', verifyToken,  userController.obtenerUsuarios);
router.post('/crearEvento', verifyToken,eventController.crearEvento);

router.get('/obtenerEventos', verifyToken, eventController.obtenerEventos);

router.delete('/eliminarEvento/:id', verifyToken, eventController.eliminarEvento);

router.put('/actualizarEvento/:id', verifyToken, eventController.actualizarEvento);


module.exports = router;
