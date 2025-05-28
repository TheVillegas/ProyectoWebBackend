// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { loginUser } = require("..//controllers/userController");

const userController = require('../controllers/userController');
// Ruta GET de prueba
router.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});


router.post("/login", userController.loginUser);

router.post('/register',userController.crearUsuario);
router.get('/usuarios', userController.obtenerUsuarios);



module.exports = router;
