const {Schema, model, connection} = require('mongoose');
const Horario = require('../models/horario');

const RestauranteSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    categoria: {
        type: String,
        require: true
    },
    direccion: {
        type: String,
        require: true,
    },
    ciudad: {
        type: String,
        require: true
    },
    horario: {
        type: Map,
        ref: Horario,
        require: true
    },
    imagen: {
        type: String,
        require: true
    }
});

RestauranteSchema.method('toJSON', function () {
   const {__v, ...object} = this.toObject();
   return object;
})

module.exports = model('Restaurante', RestauranteSchema);