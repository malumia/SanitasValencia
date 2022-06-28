var mysql = require('mysql');
//Establecemos los prámetros de conexió
var conexion = mysql.createConnection({
    host: '172.20.0.80',
    user: 'root',
    password: 'Lrnas03m01',
    database: 'MKT_REPORTING_2022'
});

//Conexión a la database
conexion.connect(function (error) {
    if (error) {
        throw error;
    } else {
        console.log("¡Conexión exitosa a la base de datos!");
    }
});

module.exports= conexion