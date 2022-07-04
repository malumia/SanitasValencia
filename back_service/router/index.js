const express = require("express")
const router = express.Router();
const conexion = require('../utilss/cnxMySql');
const fetch  = require('fetch');

router.get('/', function (req, res) {
    res.send('Ruta INICIO');
});


router.get('/home', function (req, res) {
    res.send('Estás en el Home');
});



//API  FRANJAS
router.get('/api/franjas',  (req, res) => {

	console.log("api/franjas")

    const { campania, fecha_i, fecha_f } = req.query;


     try {
     conexion.query(`CALL sanitas_valencia_sp0_info_franjas ("${campania}","${fecha_i}","${fecha_f}")`, (error, filas) => {
        if (error) {
            throw error;
            console.log(conexion.query)
        } else {
            res.send(filas[0]);
            console.log(conexion.query)
       
            
        }
    })

     } catch (error) {
    
}
});


//API  VENTAS
router.get('/api/ventas',  (req, res) => {

	console.log("api/ventas")

    const { campania, fecha_i, fecha_f } = req.query;


     try {
     conexion.query(`CALL sanitas_valencia_sp1_info_ventas ("${fecha_i}","${fecha_f}")`, (error, filas) => {
        if (error) {
            throw error;
            console.log(conexion.query)
        } else {
            res.send(filas[0]);
            console.log(conexion.query)
       
            
        }
    })

     } catch (error) {
    
}
});

//API  COSTES TELEFONICOS
router.get('/api/costestelefonicos',  (req, res) => {

	console.log("api/costestelefonicos")

    const { campania, fecha_i, fecha_f } = req.query;


     try {
     conexion.query(`CALL sanitas_valencia_sp3_info_costes ("${fecha_i}","${fecha_f}")`, (error, filas) => {
        if (error) {
            throw error;
            console.log(conexion.query)
        } else {
            res.send(filas[0]);
            console.log(conexion.query)
       
            
        }
    })

     } catch (error) {
    
}
});


//API INFO ACTIVIDAD
router.get('/api/infoactividad',  (req, res) => {

	console.log("api/infoactividad")

    const { campania, fecha_i, fecha_f,bbdd } = req.query;


     try {
     conexion.query(`CALL sanitas_valencia_sp2_info_actividad ("${campania}","${fecha_i}","${fecha_f}","${bbdd}")`, (error, filas) => {
        if (error) {
            throw error;
            console.log(conexion.query)
        } else {
            res.send(filas[0]);
            console.log(conexion.query)
       
            
        }
    })

     } catch (error) {
    
}
});

//API INSERTAR VENTAS
router.get('/api/insertarventas',  (req, res) => {

	console.log("api/insertarventas")

  
    const {fecha_actual,fini, hventa,tipoventa, poliza,telefono,asegurados,remoteid,origen,adg } = req.query;
    

     try {
     conexion.query(`CALL sanitas_valencia_sp4_insertar_ventas ("${fecha_actual}","${fini}","${hventa}","${tipoventa}","${poliza}",
     "${telefono}","${asegurados}","${remoteid}","${origen}","${adg}")`, (error, filas) => {
        if (error) {
            throw error;
            console.log(conexion.query)
        } else {
            res.send(filas[0]);
            console.log(conexion.query)
       
            
        }
    })

     } catch (error) {
    
}
});
//API ACTIVIDAD VENTAS
router.get('/api/actividadventas',  (req, res) => {

	console.log("api/actividadventas")

  
    const {campania,f_ini, f_fin,bbdd } = req.query;
    

     try {
     conexion.query(`CALL sanitas_valencia_sp5_info_ventas_conteo ("${campania}","${f_ini}","${f_fin}","${bbdd}")`,  (error, filas) => {
        if (error) {
            throw error;
            console.log(conexion.query)
        } else {
            
            res.send(filas[0]);
            console.log(conexion.query)
          
       
            
        }
    })

     } catch (error) {
    
}
});

module.exports = router;