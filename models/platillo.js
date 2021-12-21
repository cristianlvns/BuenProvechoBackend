const {Schema, model, connection} = require('mongoose');

const PlatilloSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    },
    restauranteid: {
        type: Schema.Types.ObjectId,
        require: true,
    },
    precio: {
        type: Number,
        require: true
    },
    imagen: {
        type: String,
        require: true
    }
});

PlatilloSchema.method('toJSON', function () {
   const {__v, ...object} = this.toObject();
   return object;
})

module.exports = model('Platillo', PlatilloSchema);