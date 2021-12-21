const {response} = require('express');
const {validationResult} = require('express-validator');
const Pedido = require('../models/pedido');

const crearPedido = async (req, res = response) => {
    try {
        const pedido = new Pedido(req.body);
        await pedido.save();
        const {uid, items, total, estatus} = pedido;
        res.json({
            uid: uid,
            items: items,
            total: total,
            estatus: estatus,
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

const actualizarEstatus = async (req, res = response) => {
    const {_id} = req.body;
    try {
        const pedido = await Pedido.findOne({_id: _id});
        if (!pedido) {
            return res.status(404).json({
                ok: false,
                msg: 'Pedido no encontrado'
            });
        }
        res.json({
            pedido
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error: ' + error
        });
    }
}

const enlistarPedidos = async (req, res = response) => {
    const {uid} = req.body;
    try {
        const pedidos = await Pedido.find({uid: uid});
        if (!pedidos) {
            return res.status(404).json({
                ok: false,
                msg: 'Platillos no encontrados'
            });
        }
        res.json({
            pedidos
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
    crearPedido,
    actualizarEstatus,
    enlistarPedidos
}