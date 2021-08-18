const express = require('express');  //importacion de express
require('dotenv').config();
const {dbConnection} = require('./database/config');
const cors = require('cors');
const path = require('path');

// console.log(process.env);  //ahi estan todas las variables de entorno en process.env


//Crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());

//Directorio publico
app.use( express.static('public'));

//lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/messages', require('./routes/messages'));

//manejo demas rutas para prod
app.get('*', (req, res) => {
    res.sendFile( path.resolve(__dirname, 'public/index.html'));
})


//Escuchar peticiones 
app.listen( process.env.PORT, () => {  //se le pone un puerto distinto al 3000 que es el que usualmente se usa en el frontend
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})