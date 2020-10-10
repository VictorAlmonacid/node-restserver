

//========================
// PUERTO
//=======================

const { mongo } = require("mongoose");

process.env.PORT = process.env.PORT || 3000;

//========================
// ENTORNO
//=======================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//========================
// expiracion del token
//=======================
//60s
//60m
//46hrs
//30d
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


//========================
// SEED de autenticacion
//=======================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


//========================
// BASE DE DATOS
//=======================

let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
}else{
urlDB = process.env.MONGO_URI;
}
 process.env.URLDB = urlDB;


//========================
// Google Client ID
//=======================
process.env.CLIENT_ID = process.env.CLIENT_ID || '1004710961864-bk909phfr2h0ad71dqceu9mg8iqeh7ta.apps.googleusercontent.com';