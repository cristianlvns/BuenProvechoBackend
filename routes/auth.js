/*
Path: api/login
*/
const {Router, response} =  require('express');
const {crearUsuario, login, renovarToken} = require('../controllers/auth');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//End point para crear un usuario
router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    validarCampos
], crearUsuario)

//End point login
router.post('/', [
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
], login)

router.get('/renew', validarJWT, renovarToken);

module.exports = router