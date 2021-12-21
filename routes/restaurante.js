const {Router, response} =  require('express');
const {crearRestaurante, obtenerRestaurante, enlistarRestaurantes} = require('../controllers/restaurante');

const router = Router();

router.post('/new', crearRestaurante)
router.post('/all', enlistarRestaurantes)
router.post('/', obtenerRestaurante)

module.exports = router