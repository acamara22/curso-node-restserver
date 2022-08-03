const {Router} = require('express');
const {check} = require('express-validator');
const {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
} = require('../controllers/productos');

const {existeProductoPorId, existeCategoriaPorId} = require ('../helpers/db-validators');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();


          //{{url}}/api/producto

//Obtener todas las producto - público
router.get('/', obtenerProductos);

//Obtener una producto  por id - público
router.get('/:id',[
    check('id','No es un id de Mongo válido').isMongoId(),
    validarCampos,
    check('id').custom( existeProductoPorId )
],obtenerProducto);

//Crear producto - privado - cualquier persona con un token válido
router.post('/',[validarJWT,
check('nombre','El nombre es obligatorio').not().isEmpty(),
check('categoria','No es un id de mongo').isMongoId(),
check('categoria').custom( existeCategoriaPorId ),
validarCampos
],crearProducto);

//Actualizar - privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
    //check('categoria','No es un id de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto );

//Borrar una producto - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos

], borrarProducto);




module.exports = router;