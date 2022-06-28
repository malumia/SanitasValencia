const express = require("express")
const router = express.Router();
const conexion = require('../utilss/cnxMySql')

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



//API  CDM SERVICIO
router.get('/api/cdmserviciodia',  (req, res) => {

    const { fecha_i, fecha_f, campana, service,ddi } = req.query;

    //console.log(fecha_i)
     try {
     conexion.query(`CALL orange_sp1_dias_calls("${fecha_i}","${fecha_f}","${campana}", "${service}", "${ddi}")`, (error, filas) => {
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



//API CDM SERVICIO
router.get('/api/cdmagente',  (req, res) => {

    const { fecha_i, fecha_f, campana, service,ddi } = req.query;

	console.log("api/cdmagente")
     try {
     conexion.query(`CALL orange_sp4_dias_tipi_agente("${fecha_i}","${fecha_f}","${campana}", "${service}", "${ddi}")`, (error, filas) => {
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

//API CDM SERVICIO
router.get('/api/cdmtipisdia',  (req, res) => {

    const { fecha_i, fecha_f, campana, service,ddi } = req.query;

	console.log("api/cdmtipisdia")
     try {
     conexion.query(`CALL orange_sp3_dias_tipif("${fecha_i}","${fecha_f}","${campana}", "${service}", "${ddi}")`, (error, filas) => {
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



//API CDM SERVICIO
router.get('/api/loginagente',  (req, res) => {

    const { fecha_i, fecha_f, campana } = req.query;

    //console.log(fecha_i)
     try {
     conexion.query(`CALL orange_TIEMPOS_AGENTES_F("${fecha_i}","${fecha_f}","${campana}")`, (error, filas) => {
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


//API LOGIN 
router.get('/api/loginservicio',  (req, res) => {

    const { fecha_i, fecha_f, campana } = req.query;

 try {
    
     conexion.query(`CALL orange_TIEMPOS_SERVICIO("${fecha_i}","${fecha_f}","${campana}")`, (error, filas) => {
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

//API CDR TELEFONICO

router.get('/api/cdrtelefonico',  (req, res) => {

    const { fecha_i, fecha_f } = req.query;

    //console.log(fecha_i)
     try {
     conexion.query(`CALL orange_CDR_TELEFONICO("${fecha_i}","${fecha_f}")`, (error, filas) => {
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