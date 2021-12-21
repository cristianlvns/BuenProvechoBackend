const {response} = require('express');
const {validationResult} = require('express-validator');
const Platillo = require('../models/platillo');

const crearPlatillo = async (req, res = response) => {
    const {nombre, descripcion, restauranteid, precio, imagen} = req.body;
    try {
        //Crear una instancia del modelo
        const platillo = new Platillo(req.body);

        //Guardamos en la base de datos
        await platillo.save();

        res.json({
            platillo,
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

const obtenerPlatillo = async (req, res = response) => {
    const {id} = req.body;
    try {
        const platillo = await Platillo.findOne({_id: id});
        if (!platillo) {
            return res.status(404).json({
                ok: false,
                msg: 'Platillo no encontrado'
            });
        }
        const {_id, nombre, descripcion, restauranteid, precio, imagen} = platillo;
        res.json({
            _id: _id,
            nombre: nombre,
            descripcion: descripcion,
            restauranteid: restauranteid,
            precio: precio,
            imagen: imagen
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error: ' + error
        });
    }
}

const obtenerPlatillosRestaurante = async (req, res = response) => {
    const {restauranteId} = req.body;
    try {
        const platillos = await Platillo.find({restauranteid: restauranteId});
        if (!platillos) {
            return res.status(404).json({
                ok: false,
                msg: 'Platillos no encontrados'
            });
        }
        res.json({
            platillos
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error: ' + error
        });
    }
}

module.exports = {
    crearPlatillo,
    obtenerPlatillo,
    obtenerPlatillosRestaurante
}