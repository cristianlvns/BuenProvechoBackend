const {response} = require('express');
const {validationResult} = require('express-validator');
const Restaurante = require('../models/restaurante');

const crearRestaurante = async (req, res = response) => {
    const {nombre, categoria, direccion, ciudad, horario, imagen} = req.body;
    try {
        //Crear una instancia del modelo
        const restaurante = new Restaurante(req.body);

        //Guardamos en la base de datos
        await restaurante.save();

        res.json({
            nombre: nombre,
            categoria: categoria,
            direccion: direccion,
            ciudad: ciudad,
            horario,
            imagen: imagen,
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

const obtenerRestaurante = async (req, res = response) => {
    const {id} = req.body;
    try {
        const restaurante = await Restaurante.findOne({_id: id});
        if (!restaurante) {
            return res.status(404).json({
                ok: false,
                msg: 'Restaurante no encontrado'
            });
        }
        const {_id, nombre, categoria, direccion, ciudad, horario, imagen} = restaurante;
        res.json({
            _id: _id,
            nombre: nombre,
            categoria: categoria,
            direccion: direccion,
            ciudad: ciudad,
            horario,
            imagen: imagen,
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error: ' + error
        });
    }
}

const enlistarRestaurantes = async (req, res = response) => {
    
    try {
        const restaurantes = await Restaurante.find();
        const {nombre, categoria, direccion, ciudad, horario, imagen} = restaurantes;
        //Validar email
        //const restaurantes = await Restaurante.findOne({_id: _id});
        if (!restaurantes) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontraron restaurantes'
            });
        }
        res.json({
            restaurantes,
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
    crearRestaurante,
    obtenerRestaurante,
    enlistarRestaurantes
}