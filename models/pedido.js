const {Schema, model, Types} = require('mongoose');

const PedidoSchema = Schema({
    uid: {
        type: Schema.Types.ObjectId,
        require: true
    },
    items: {
        type: Array,
        require: true,
    },
    total: {
        type: Number,
        require: true,
    },
    estatus: {
        type: String,
        require: true
    },
}, {
    timestamps: true
});

PedidoSchema.method('toJSON', function () {
   const {__v, ...object} = this.toObject();
   return object;
})

module.exports = model('Pedido', PedidoSchema);