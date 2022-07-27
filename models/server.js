const express =  require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

const app = express()


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }


    middlewares(){
        //CORS
        app.use( cors() );
        

        //Lectura y parsedel body
        this.app.use(express.json());

        //Directorio público
        this.app.use( express.static('public') );
    }

    routes(){

        this.app.use(this.usuariosPath,require('../routes/usuarios'));

    }

    listen() {
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en puerto', process.env.PORT);
        });
        
    }

}


module.exports = Server;