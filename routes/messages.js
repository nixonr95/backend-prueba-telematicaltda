const {Router} = require('express');
const {check} = require('express-validator');

const {validarJWT} = require('../middlewares/validar-jwt');
const {validarCampos} = require('../middlewares/validar-campos');
const { enviarMensaje, getMensajeRecibidos } = require('../controllers/menssages');

const router = Router(); 
// router.use(validarJWT);

router.get('/:id', getMensajeRecibidos);

router.post(
    '/', 
    [
        check('message', 'el mensaje es obligatorio').not().isEmpty(),
        check('uidReceptor', 'el mensaje es obligatorio').not().isEmpty(),
        check('uidEmisor', 'el mensaje es obligatorio').not().isEmpty(),
        validarCampos,
    ], 
    enviarMensaje
);

module.exports = router;