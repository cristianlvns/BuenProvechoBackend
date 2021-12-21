const {Router, response} =  require('express');
const {crearPedido, enlistarPedidos} = require('../controllers/pedido');

const router = Router();

router.post('/new', crearPedido)
router.post('/all', enlistarPedidos)

module.exports = router