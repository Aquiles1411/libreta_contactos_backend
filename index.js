/* Arrancar en el terminal CMD con el comando: node index.js */

const express = require('express');
const bodyParser = require('body-parser');

//Gestor de rutas
const apiRouter = require('./routes/api');

const app = express();

require('./contactosBD');

//Configuraciones BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//Gestor de rutas (redireccion)
app.use('/api', apiRouter);

//levantar la aplicacion usando express
app.listen(8700 ,()=>{
    console.log('Servidor arrancado con exito');
});