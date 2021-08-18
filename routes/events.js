/* 
    Event Routes
    /api/events
*/

const {Router} = require('express');
const {check} = require('express-validator');

const {validarJWT} = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento  } = require('../controllers/events');
const {validarCampos} = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router(); 
router.use(validarJWT);  /// para que todos los que esten debajo de esta linea tengan que usar el middleware validarJWT

//Obtener evento
router.get('/', getEventos);

//Crear un nuevo evento
router.post(
    '/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de publicacion es obligatoria').custom(isDate),
        validarCampos,
    ], 
    crearEvento);

//Actualizar evento
router.put('/:id', actualizarEvento);

//Borrar evento
router.delete('/:id', eliminarEvento);


module.exports = router;




// router.get('/', validarJWT, getEventos); //sin poner el router.use(validarJWT) 
// router.post('/', validarJWT, crearEvento);
// router.put('/:id', validarJWT, actualizarEvento);
// router.delete('/:id', validarJWT, eliminarEvento);