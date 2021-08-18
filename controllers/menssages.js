const { response } = require('express');
const Mensaje = require('../models/Mensaje');

const enviarMensaje = async (req, res = response) => {
    const mensaje = new Mensaje(req.body);
    console.log(mensaje);

    try {

        mensaje.user = req.uid;
        const mensajeGuardado = await mensaje.save();
           
        res.json({
            ok: true,
            mensaje: mensajeGuardado
        })
    
       } catch (error) {
           console.log(error);
           res.status(500).json({
               ok: false,
               msg: 'Hable con el administrador'
           })
        }
}

const getMensajeRecibidos = async (req, res = response) => {
    
    // const mensajes = await Mensaje.find({ uidReceptor: req.body.uidReceptor })
    const uidReceptor = req.params.id;
    const mensajes = await Mensaje.find({ uidReceptor: uidReceptor })
                                

    res.json({
        ok: true,
        mensajes
    })
}

module.exports = { 
    enviarMensaje,
    getMensajeRecibidos
}