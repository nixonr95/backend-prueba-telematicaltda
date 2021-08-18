const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({

    name: {
        type: String,
        required: true   //es requerido
    },
    email: {
        type: String,
        required: true,
        unique: true   // tiene que ser unico, no puede estar repetido
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = model('Usuario', UsuarioSchema);

