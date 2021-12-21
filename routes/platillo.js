const {Router, response} =  require('express');
const {crearPlatillo, obtenerPlatillo, obtenerPlatillosRestaurante} = require('../controllers/platillo');

const router = Router();

router.post('/new', crearPlatillo)
router.post('/', obtenerPlatillo)
router.post('/all', obtenerPlatillosRestaurante)

module.exports = router