const Role = require('../models/role');
const {Usuario, Categoria, Producto} = require('../models');


const esRolValido = async(rol='') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    } 

} 

//verificar si el correo existe


const emailExiste = async (correo ='' ) =>{
    const existeEmail = await Usuario.findOne({correo: correo});
        if(existeEmail){
            throw new Error(`El correo ${ correo } ya está registrado`)
        }

}

const existeUsuarioPorId = async (id) =>{
    const existeUsuario = await Usuario.findById(id);
        if(!existeUsuario){
            throw new Error(`El id  ${ id } no existe`)
        }

}

//Categorias
const existeCategoriaPorId = async (id) =>{
    const existeCategoria = await Categoria.findById(id);
        if(!existeCategoria){
            throw new Error(`El id  ${ id } no existe`)
        }

}

// Productos
const existeProductoPorId = async (id) =>{
    const existeProducto = await Producto.findById(id);
        if(!existeProducto){
            throw new Error(`El id  ${ id } no existe`)
        }

}

//Validar colecciones permitidas
const coleccionesPermitidas = (coleccion ='', colecciones =[])=>{
    const incluida = colecciones.includes(coleccion);
    if(!incluida){
        throw new Error(`La colección ${coleccion} no es permitida, ${colecciones}`);
    }
    return true;

}



module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}

