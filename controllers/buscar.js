const { response } = require("express");
const {ObjectId} = require("mongoose").Types;
const{Usuario,Categoria,Producto} = require ('../models')

const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
];

const buscarUsuarios = async(termino='',res=response)=>{
    const esMongoID = ObjectId.isValid(termino); //TRUE

    if(esMongoID){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []  //si el usuario existe devuelvo la inof, sino deculevo arreglo vacío
        });
    }

    const regex = new RegExp( termino, 'i' ); //sensitive case

    const ususarios = await Usuario.find({
        $or:[{nombre: regex}, {correo: regex}], //cumple alguna de las dos
        $and: [{estado: true}]
    });

    return res.json({
        results: ususarios
    });
}

const buscarCategorias = async(termino='',res=response)=>{
    const esMongoID = ObjectId.isValid(termino); //TRUE

    if(esMongoID){
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []  //si el usuario existe devuelvo la inof, sino deculevo arreglo vacío
        });
    }

    const regex = new RegExp( termino, 'i' ); //sensitive case

    const categorias = await Categoria.find({nombre: regex, estado: true});

    return res.json({
        results: categorias
    });
}

const buscarProductos = async(termino='',res=response)=>{
    const esMongoID = ObjectId.isValid(termino); //TRUE

    if(esMongoID){
        const producto = await Producto.findById(termino).populate('categoria','nombre');
        return res.json({
            results: (producto) ? [producto] : []  
        });
    }

    const regex = new RegExp( termino, 'i' ); //sensitive case

    const productos = await Producto.find({nombre: regex, estado: true})
                                .populate('categoria','nombre')

    return res.json({
        results: productos
    });
}

const buscar = (req, res = response)=>{

    const {coleccion, termino}= req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg:`Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch(coleccion){
        case 'usuarios':
            buscarUsuarios(termino,res);
            break;

        case 'categoria':
            buscarCategorias(termino,res)
            break;

        case 'productos':
            buscarProductos(termino,res)
            break;

        default:
            res.status(500).json({
                msg: ' Se le olvidó hacer esta búsqueda'
            })
            break;
    }
}




module.exports = {
    buscar
}