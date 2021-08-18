const {Schema, model} = require('mongoose');

const MensajeSchema = Schema({

   message: {
       type: String,
       required: true
   },
   uidReceptor: {
        type: String,
        required: true
   },
   nombreEmisor: {
    type: String,
    required: true
   },
   uidEmisor: {
        type: String,
        required: true
   }
});


module.exports = model('Mensaje', MensajeSchema);