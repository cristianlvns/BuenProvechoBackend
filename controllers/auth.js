const {response} = require('express');
const {validationResult} = require('express-validator');
const Usuario = require('../models/usuario');
const bycrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {
    const {email, password} = req.body;
    try {
        //Buscar en la BD si el correo existe
        const existeEmail = await Usuario.findOne({email: email});
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya está registrado',
            });
        }
        //Crear una instancia del modelo
        const usuario = new Usuario(req.body);

        //Generamos un salt
        const salt = bycrypt.genSaltSync();
        //Encriptar
        usuario.password = bycrypt.hashSync(password, salt);

        //Guardamos en la base de datos
        await usuario.save();

        //Generar token
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor',
        });
    }
}

const login = async (req, res = response) => {
    const {email, password} = req.body;
    try {
        //Validar email
        const usuario = await Usuario.findOne({email});
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }
        //Validar password
        const validarPassword = bycrypt.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }
        //Generamos JWT
        const token = await generarJWT(usuario.id);
        res.json({
            ok: true,
            usuario,
            token
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en el servidor: ' + error
        });
    }
}

const renovarToken = async (req, res = response) => {
    const uid = req.uid;
    const token = await generarJWT(uid);
    const usuario = await Usuario.findById(uid);
    res.json({
        ok: true,
        usuario,
        token
    });
}

module.exports = {
    crearUsuario,
    login,
    renovarToken
}