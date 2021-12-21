const {Schema, model} = require('mongoose');

const HorarioSchema = Schema({
    lunes: {
        type: String,
        require: true
    },
    martes: {
        type: String,
        require: true,
    },
    miercoles: {
        type: String,
        require: true
    },
    jueves: {
        type: String,
        require: true
    },
    viernes: {
        type: String,
        require: true
    },
    sabado: {
        type: String,
        require: true
    },
    domingo: {
        type: String,
        require: true
    }
});

//Sobreescribimos el método toJSON
HorarioSchema.method('toJSON', function () {
   const object = this.toObject();
   return object;
})

module.exports = model('Horario', HorarioSchema);