var express = require('express');
var cors = require('cors');
var app = express();
const morgan = require('morgan')

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.use(express.json());
app.use(cors());
app.use(morgan('combined'))



app.use(require('./router/index'))// por defecto node siempre llamara a /index.js



const puerto = 4567;
app.listen(puerto, function () {
    console.log("Servidor Ok en puerto:" + puerto);
});
