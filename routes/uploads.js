const {Router} = require('express');
const {check} = require('express-validator');
const { actualizarCategoria } = require('../controllers/categorias');
const { cargarArchivo, actualizarImagen,mostrarImagen } = require('../controllers/uploads');
const { validarCampos, validarArchivoSubir } = require('../middlewares');
const {coleccionesPermitidas} = require('../helpers/db-validators');

const router = Router();


router.post('/',validarArchivoSubir,cargarArchivo);

router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios','productos'])),
    validarCampos
], actualizarImagen)

router.get('/:coleccion/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios','productos'])),
    validarCampos
],mostrarImagen)


module.exports = router;