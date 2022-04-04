//@ts-ignore
const express = require('express');
const cors = require('cors');
const { dbConn } = require('./db/config');
require('dotenv').config();

const app = express();
/**
 * DB
 */
const dbConnection = dbConn();
app.use(express.json()) //parsing application/json
app.use(express.urlencoded({ extended: true })) //parsing application/x-www-form-urlencoded
app.use(express.static('public'));
//RUTAS
//@ts-ignore
app.use('/api/auth', require('./routes/auth'));

// Lectura y Parseo del body:
app.use(express.json());

//CRUD
//@ts-ignore
// console.log(process.env);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server online on port ${PORT}`)
})