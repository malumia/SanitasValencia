//***************************************//
//*************FRANJAS.html**************//
//****************************************/


function callfranjas() {

    console.log("entro /api/franjas")

   // const url = 'http://172.20.0.80:4567/api/franjas';
    const url = 'http://localhost:4567/api/franjas';
    const param1 = $("#campania").val()
    const param2 = $("#fini").val()
    const param3 = $("#ffin").val()
  
    const urln = url + "?campania=" + param1 + "&fecha_i=" + param2 + "&fecha_f=" + param3
    
    $(document).ready(function (req, res) {


        console.log(urln)

        $('#franjas').DataTable({
            ajax: {
                url: urln,
                dataSrc: ''

            },
            columns: [
                
                 { data: "FECHA" },
                 { data: "FRANJA" },
                 { data: "EMITIDAS" },
                 { data: "EMITIDAS_ATENDIDAS" },
                 { data: "VENTAS" },
                 { data: "ABANDONADAS" },
                 { data: "% CONTACTACION" }
               
                
            ],
            responsive: true,
            "lengthMenu": [[16, -1], [16, "All"]]
        }).columns.adjust()
            .responsive.recalc();
    })

    //Elimino la tabla user en cada llamaada para que se pueda recargar el dato

    $("#franjas").dataTable().fnDestroy();

var chart = document.querySelector('#myChart')
var options = {
     colors: ['#0EB8FC', '#2BFC0E', '#FCD40E', '#FC120E'],

    series: [{
        name: 'EMITIDAS',
        type: 'area',
        data: ['']
    }, {
        name: 'EMITIDAS_ATENDIDAS',
        type: 'line',
        data: ['']
    }, {
        name: 'VENTAS',
        type: 'line',
        data: ['']
    }, {
        name: 'ABANDONADAS',
        type: 'line',
        data: ['']
    }

],
    chart: {
        height: 900,
        type: 'line',

        zoom: {
            enabled: false
        }
    },
    stroke: {
        curve: 'smooth'
    },
    fill: {
        type: 'solid',
        opacity: [0.05, 1],
    },
    labels:  [''],
    markers: {
        size: 7
    },
    yaxis: [
        {

            title: {
                text: `Llamadas ${param3}`,
                fontStyle: "bold"
            },
        } 
    ],
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter: function(y) {
                if (typeof y !== "undefined") {
                    return y.toFixed(0) + " llamadas";
                }
                return y;
            }
        }
    }
};

window.chart3 = new ApexCharts(chart, options);
//let url='http://172.20.0.80:4567/api/franjas?fecha_i=2022-01-01&fecha_f=2022-02-13&campana=&service='

fetch(urln)
.then (response => response.json() )
.then (datos => mostrar(datos))
.catch (error => error)


const mostrar = (datos)=>{
    datos.map(element => {
        console.log(options)

        options['labels'].push(element.FRANJA)
        options['series'][0].data.push(element.EMITIDAS)
        options['series'][1].data.push(element.EMITIDAS_ATENDIDAS)
        options['series'][2].data.push(element.VENTAS)
        options['series'][3].data.push(element.ABANDONADAS)
      
     
    });

    options['labels'].pop();
    options['labels'].shift();
    options['series'][0].data.pop();
    options['series'][0].data.shift();
    options['series'][1].data.pop();
    options['series'][1].data.shift();
    options['series'][2].data.pop();
    options['series'][2].data.shift();
    options['series'][3].data.pop();
    options['series'][3].data.shift();



   // console.log(options)
   window.chart3.render();
   window.chart3.delete();
}

}

/**FUNCION PARA EXPORTAR CSV DE LA TABLA **/

function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], { type: "text/csv" });

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}

function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);

        csv.push(row.join(";"));
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}

//**********************************************/
/**FUNCION PARA EXPORTAR HACER PDF DE LA TABLA **/
//**********************************************/

document.addEventListener("DOMContentLoaded", () => {
    // Escuchamos el click del botón
    const $boton = document.querySelector("#btnpdf");

    const fecha = new Date().toISOString().slice(0, 10);

    $boton.addEventListener("click", () => {
        const $elementoParaConvertir = document.querySelector("#tablefranjas"); // <-- Aquí puedes elegir cualquier elemento del DOM
        html2pdf()
            .set({
                margin: 0,

                filename: `Orange_Franjas_${fecha}.pdf`,
                image: {
                    type: 'jpeg',
                    quality: 0.98

                },
                html2canvas: {
                    scale: 5, // A mayor escala, mejores gráficos, pero más peso
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "in",
                    format: "a1",
                    orientation: 'landscape' // landscape o portrait
                }
            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err));
    });
});

//**********************************************/
/**VENTAS **/
//**********************************************/

function callventas() {

    console.log("entro /api/ventas")

   // const url = 'http://172.20.0.80:4567/api/ventas';
    const url = 'http://localhost:4567/api/ventas';
    
    const param1 = $("#fini").val()
    const param2 = $("#ffin").val()
  
    const urln = url + "?&fecha_i=" + param1 + "&fecha_f=" + param2
    
    $(document).ready(function (req, res) {


        console.log(urln)

        $('#franjas').DataTable({
            ajax: {
                url: urln,
                dataSrc: ''

            },
            columns: [
                
                 { data: "AGENTE" },
                 { data: "ID" },
                 { data: "Nº POLIZA" },
                 { data: "TIPO DE CLIENTE" },
                 { data: "PRODUCTO" },
                 { data: "FORMA PAGO" },
                 { data: "FECHA VENTA" },
                 { data: "FECHA GRABACIÓN" },
                 { data: "FECHA EFECTO" },
                 { data: "NOMBRE" },
                 { data: "DNI" },
                 { data: "SEXO" },
                 { data: "FECHA NACIMIENTO" },
                 { data: "T_MOVIL" },
                 { data: "POBLACION" },
                 { data: "CP" },
                 { data: "TIPO ASEGURADO" },
                 { data: "CITA" },
                 { data: "ORIGEN(CORREGISTROS)" },
                 { data: "PROVINCIA" },
                 { data: "COMPLEMENTO FARMACIA" },
                 { data: "LOPD" },
                 { data: "PARENTESCO" },
                 { data: "CORREO" },
                 { data: "CUENTA BANCARIA" },
                 { data: "DIRECCIÓN" },
                 { data: "CAMPAÑA" },
                 { data: "ADG(CORREGISTROS)" },
                 { data: "DURACION TOTAL" },
                 { data: "TIPO DE VENTA" },
                 { data: "FECHA ACTIVACION" },
                 { data: "FECHA RECIBO" },
                 { data: "ORIGEN" }
               
                
            ],
            responsive: true,
            "lengthMenu": [[16, -1], [16, "All"]]
        }).columns.adjust()
            .responsive.recalc();
    })

    //Elimino la tabla user en cada llamaada para que se pueda recargar el dato

    $("#franjas").dataTable().fnDestroy();

var chart = document.querySelector('#myChart')
var options = {
     colors: ['#0EB8FC', '#2BFC0E', '#FCD40E', '#FC120E'],

    series: [{
        name: 'EMITIDAS',
        type: 'area',
        data: ['']
    }, {
        name: 'EMITIDAS_ATENDIDAS',
        type: 'line',
        data: ['']
    }, {
        name: 'VENTAS',
        type: 'line',
        data: ['']
    }, {
        name: 'ABANDONADAS',
        type: 'line',
        data: ['']
    }

],
    chart: {
        height: 900,
        type: 'line',

        zoom: {
            enabled: false
        }
    },
    stroke: {
        curve: 'smooth'
    },
    fill: {
        type: 'solid',
        opacity: [0.05, 1],
    },
    labels:  [''],
    markers: {
        size: 7
    },
    yaxis: [
        {

            title: {
                text: `Llamadas ${param2}`,
                fontStyle: "bold"
            },
        } 
    ],
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter: function(y) {
                if (typeof y !== "undefined") {
                    return y.toFixed(0) + " llamadas";
                }
                return y;
            }
        }
    }
};

window.chart3 = new ApexCharts(chart, options);
//let url='http://172.20.0.80:4567/api/franjas?fecha_i=2022-01-01&fecha_f=2022-02-13&campana=&service='

fetch(urln)
.then (response => response.json() )
.then (datos => mostrar(datos))
.catch (error => error)


const mostrar = (datos)=>{
    datos.map(element => {
        console.log(options)

        options['labels'].push(element.FRANJA)
        options['series'][0].data.push(element.EMITIDAS)
        options['series'][1].data.push(element.EMITIDAS_ATENDIDAS)
        options['series'][2].data.push(element.VENTAS)
        options['series'][3].data.push(element.ABANDONADAS)
      
     
    });

    options['labels'].pop();
    options['labels'].shift();
    options['series'][0].data.pop();
    options['series'][0].data.shift();
    options['series'][1].data.pop();
    options['series'][1].data.shift();
    options['series'][2].data.pop();
    options['series'][2].data.shift();
    options['series'][3].data.pop();
    options['series'][3].data.shift();



   // console.log(options)
   window.chart3.render();
   window.chart3.delete();
}

}

/**FUNCION PARA EXPORTAR CSV DE LA TABLA **/

function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], { type: "text/csv" });

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}

function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);

        csv.push(row.join(";"));
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}

//**********************************************/
/**FUNCION PARA EXPORTAR HACER PDF DE LA TABLA **/
//**********************************************/

document.addEventListener("DOMContentLoaded", () => {
    // Escuchamos el click del botón
    const $boton = document.querySelector("#btnpdf");

    const fecha = new Date().toISOString().slice(0, 10);

    $boton.addEventListener("click", () => {
        const $elementoParaConvertir = document.querySelector("#tablefranjas"); // <-- Aquí puedes elegir cualquier elemento del DOM
        html2pdf()
            .set({
                margin: 0,

                filename: `Sanitas_Ventas_${fecha}.pdf`,
                image: {
                    type: 'jpeg',
                    quality: 0.98

                },
                html2canvas: {
                    scale: 5, // A mayor escala, mejores gráficos, pero más peso
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "in",
                    format: "a1",
                    orientation: 'landscape' // landscape o portrait
                } 
                
            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err));
    });
});

//**********************************************/
/**COSTES TELEFÓNICOS **/
//**********************************************/

function callcostestelefonicos() {

    console.log("entro /api/costestelefonicos")

   // const url = 'http://172.20.0.80:4567/api/costestelefonicos';
    const url = 'http://localhost:4567/api/costestelefonicos';
    
    const param1 = $("#fini").val()
    const param2 = $("#ffin").val()
  
    const urln = url + "?&fecha_i=" + param1 + "&fecha_f=" + param2
    
    $(document).ready(function (req, res) {


        console.log(urln)

        $('#franjas').DataTable({
            ajax: {
                url: urln,
                dataSrc: ''

            },
            columns: [
                
                 { data: "CAMPAIGN_NAME" },
                 { data: "ORIGEN" },
                 { data: "MINUTOS MOVIL" },
                 { data: "MINUTOS FIJO" }
                
            ],
            responsive: true,
            "lengthMenu": [[16, -1], [16, "All"]]
        }).columns.adjust()
            .responsive.recalc();
    })

    //Elimino la tabla user en cada llamaada para que se pueda recargar el dato

    $("#franjas").dataTable().fnDestroy();

var chart = document.querySelector('#myChart')
var options = {
     colors: ['#0EB8FC', '#2BFC0E', '#FCD40E', '#FC120E'],

    series: [{
        name: 'EMITIDAS',
        type: 'area',
        data: ['']
    }, {
        name: 'EMITIDAS_ATENDIDAS',
        type: 'line',
        data: ['']
    }, {
        name: 'VENTAS',
        type: 'line',
        data: ['']
    }, {
        name: 'ABANDONADAS',
        type: 'line',
        data: ['']
    }

],
    chart: {
        height: 900,
        type: 'line',

        zoom: {
            enabled: false
        }
    },
    stroke: {
        curve: 'smooth'
    },
    fill: {
        type: 'solid',
        opacity: [0.05, 1],
    },
    labels:  [''],
    markers: {
        size: 7
    },
    yaxis: [
        {

            title: {
                text: `Llamadas ${param2}`,
                fontStyle: "bold"
            },
        } 
    ],
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter: function(y) {
                if (typeof y !== "undefined") {
                    return y.toFixed(0) + " llamadas";
                }
                return y;
            }
        }
    }
};

window.chart3 = new ApexCharts(chart, options);
//let url='http://172.20.0.80:4567/api/franjas?fecha_i=2022-01-01&fecha_f=2022-02-13&campana=&service='

fetch(urln)
.then (response => response.json() )
.then (datos => mostrar(datos))
.catch (error => error)


const mostrar = (datos)=>{
    datos.map(element => {
        console.log(options)

        options['labels'].push(element.FRANJA)
        options['series'][0].data.push(element.EMITIDAS)
        options['series'][1].data.push(element.EMITIDAS_ATENDIDAS)
        options['series'][2].data.push(element.VENTAS)
        options['series'][3].data.push(element.ABANDONADAS)
      
     
    });

    options['labels'].pop();
    options['labels'].shift();
    options['series'][0].data.pop();
    options['series'][0].data.shift();
    options['series'][1].data.pop();
    options['series'][1].data.shift();
    options['series'][2].data.pop();
    options['series'][2].data.shift();
    options['series'][3].data.pop();
    options['series'][3].data.shift();



   // console.log(options)
   window.chart3.render();
   window.chart3.delete();
}

}

/**FUNCION PARA EXPORTAR CSV DE LA TABLA **/

function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], { type: "text/csv" });

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}

function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);

        csv.push(row.join(";"));
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}

//**********************************************/
/**FUNCION PARA EXPORTAR HACER PDF DE LA TABLA **/
//**********************************************/

document.addEventListener("DOMContentLoaded", () => {
    // Escuchamos el click del botón
    const $boton = document.querySelector("#btnpdf");

    const fecha = new Date().toISOString().slice(0, 10);

    $boton.addEventListener("click", () => {
        const $elementoParaConvertir = document.querySelector("#tablefranjas"); // <-- Aquí puedes elegir cualquier elemento del DOM
        html2pdf()
            .set({
                margin: 0,

                filename: `Sanitas_Costes_Telefonicos_${fecha}.pdf`,
                image: {
                    type: 'jpeg',
                    quality: 0.98

                },
                html2canvas: {
                    scale: 5, // A mayor escala, mejores gráficos, pero más peso
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "in",
                    format: "a1",
                    orientation: 'landscape' // landscape o portrait
                }
            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err));
    });
});


//**********************************************/
/**INFORME ACTIVIDAD **/
//**********************************************/

function callinfoactividad() {

    console.log("entro /api/infoactividad")

   // const url = 'http://172.20.0.80:4567/api/infoactividad';
    const url = 'http://localhost:4567/api/infoactividad';
    
    const param1 = $("#campania").val()
    const param2 = $("#fini").val()
    const param3 = $("#ffin").val()
    const param4 = $("#bbdd").val()
  
    const urln = url + "?campania=" + param1 + "&fecha_i=" + param2 + "&fecha_f=" + param3 + "&bbdd=" + param4
    
    $(document).ready(function (req, res) {


        console.log(urln)

        $('#infoactividad').DataTable({
            ajax: {
                url: urln,
                dataSrc: ''

            },
            columns: [
                
                 { data: "TIPIFICACION" },
                 { data: "TOTALES" },
                 { data: "CAMPANIA" },
                 { data: "COREGISTROS_EGENTIC" },
                 { data: "COREGISTROS_MEDIAADGO" },
                 { data: "COREGISTROS_ADSALSA" },
                 { data: "COREGISTROS_BICLAMEDIA" },
                 { data: "SPONSOR_BICLAMEDIA" },
                 { data: "COREGISTROS_TAGADA" },
                 { data: "SPONSOR_TAGADA" },
                 { data: "CONHIJO_TAGADA" },
                 { data: "COREGISTROS_BBDDFRIA" },
                 { data: "COREGISTROS_DATACENTRIC" },
                 { data: "COREGISTROS_STARTEND" }
                
            ],
            responsive: true,
            "lengthMenu": [[16, -1], [16, "All"]]
        }).columns.adjust()
            .responsive.recalc();
    })

    //Elimino la tabla user en cada llamaada para que se pueda recargar el dato

    $("#infoactividad").dataTable().fnDestroy();

var chart = document.querySelector('#myChart')
var options = {
     colors: ['#0EB8FC', '#2BFC0E', '#FCD40E', '#FC120E'],

    series: [{
        name: 'EMITIDAS',
        type: 'area',
        data: ['']
    }, {
        name: 'EMITIDAS_ATENDIDAS',
        type: 'line',
        data: ['']
    }, {
        name: 'VENTAS',
        type: 'line',
        data: ['']
    }, {
        name: 'ABANDONADAS',
        type: 'line',
        data: ['']
    }

],
    chart: {
        height: 900,
        type: 'line',

        zoom: {
            enabled: false
        }
    },
    stroke: {
        curve: 'smooth'
    },
    fill: {
        type: 'solid',
        opacity: [0.05, 1],
    },
    labels:  [''],
    markers: {
        size: 7
    },
    yaxis: [
        {

            title: {
                text: `Llamadas ${param2}`,
                fontStyle: "bold"
            },
        } 
    ],
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter: function(y) {
                if (typeof y !== "undefined") {
                    return y.toFixed(0) + " llamadas";
                }
                return y;
            }
        }
    }
};

window.chart3 = new ApexCharts(chart, options);
//let url='http://172.20.0.80:4567/api/franjas?fecha_i=2022-01-01&fecha_f=2022-02-13&campana=&service='

fetch(urln)
.then (response => response.json() )
.then (datos => mostrar(datos))
.catch (error => error)


const mostrar = (datos)=>{
    datos.map(element => {
        console.log(options)

        options['labels'].push(element.FRANJA)
        options['series'][0].data.push(element.EMITIDAS)
        options['series'][1].data.push(element.EMITIDAS_ATENDIDAS)
        options['series'][2].data.push(element.VENTAS)
        options['series'][3].data.push(element.ABANDONADAS)
      
     
    });

    options['labels'].pop();
    options['labels'].shift();
    options['series'][0].data.pop();
    options['series'][0].data.shift();
    options['series'][1].data.pop();
    options['series'][1].data.shift();
    options['series'][2].data.pop();
    options['series'][2].data.shift();
    options['series'][3].data.pop();
    options['series'][3].data.shift();



   // console.log(options)
   window.chart3.render();
   window.chart3.delete();
}

}

/**FUNCION PARA EXPORTAR CSV DE LA TABLA **/

function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], { type: "text/csv" });

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}

function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);

        csv.push(row.join(";"));
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}

//**********************************************/
/**FUNCION PARA EXPORTAR HACER PDF DE LA TABLA **/
//**********************************************/

document.addEventListener("DOMContentLoaded", () => {
    // Escuchamos el click del botón
    const $boton = document.querySelector("#btnpdf");

    const fecha = new Date().toISOString().slice(0, 10);

    $boton.addEventListener("click", () => {
        const $elementoParaConvertir = document.querySelector("#tablefranjas"); // <-- Aquí puedes elegir cualquier elemento del DOM
        html2pdf()
            .set({
                margin: 0,

                filename: `Sanitas_Costes_Telefonicos_${fecha}.pdf`,
                image: {
                    type: 'jpeg',
                    quality: 0.98

                },
                html2canvas: {
                    scale: 5, // A mayor escala, mejores gráficos, pero más peso
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "in",
                    format: "a1",
                    orientation: 'landscape' // landscape o portrait
                }
            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err));
    });
});

//***************************************//
//********CDMagente.html**************//
//****************************************/


function callcdmagente() {

    console.log("/api/ccdmagente")

    
    const url = 'http://172.20.0.80:4567/api/cdmagente';
    const param1 = $("#fini").val()
    const param2 = $("#ffin").val()
    const param3 = $("#campana").val()
    const param4 = $("#service").val()
    const param5 = $("#ddi").val()
    const urln = url + "?fecha_i=" + param1 + "&fecha_f=" + param2 + "&campana=" + param3 + "&service=" + param4 + "&ddi=" + param5
    $(document).ready(function (req, res) {

        console.log(urln)

        $('#cdmagente').DataTable({
            ajax: {
                url: urln,
                dataSrc: ''
            },
            columns: [
                 { data: "SERVICE" },
                 { data: "DDI" },
                 { data: "CAMPAIN" },
                 { data: "FECHA" },
                 { data: "AGENTE" },
                 { data: "EMITIDAS" },
                 { data: "EMITIDAS ATENDIDAS" },
                 { data: "p_ATENDIDAS" },
                 { data: "PROMESA" },
                 { data: "PROMESAANT" },
                 { data: "RECLAMACION" },
                 { data: "TELEF_ERR" },
                 { data: "VLLTERCERO" },
                 { data: "VLLTITULAR" },
                 { data: "CORRIENTE" },
                 { data: "CSINPROMESA" },
                 { data: "NEG" },
                 { data: "CONTESTADOR" },
                 { data: "ENTORNOFAM" },
                 { data: "ENTORNOLAB" },
                 { data: "CANCEL" },
                 { data: "INCLOGIN" },
                 { data: "AUTOWRP" }
                
            ],
            responsive: true,
            "lengthMenu": [[300, -1], [300, "All"]]
        }).columns.adjust()
            .responsive.recalc();
    })

    //Elimino la tabla user en cada llamaada para que se pueda recargar el dato

    $("#cdmagente").dataTable().fnDestroy();

}

/**FUNCION PARA EXPORTAR CSV DE LA TABLA **/

function downloadCSV74(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], { type: "text/csv" });

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}

function exportTableTipisToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);

        csv.push(row.join(";"));
    }

    // Download CSV file
    downloadCSV2(csv.join("\n"), filename);
}


/**FUNCION PARA EXPORTAR PDF DE LA TABLA **/

document.addEventListener("DOMContentLoaded", () => {
    // Escuchamos el click del botón
    const $boton = document.querySelector("#btnpdf3");

    const fecha = new Date().toISOString().slice(0, 10);

    $boton.addEventListener("click", () => {
        const $elementoParaConvertir = document.querySelector("#tablecdmagente"); // <-- Aquí puedes elegir cualquier elemento del DOM
        html2pdf()
            .set({
                margin: 2,

                filename: `Orange_CDM_Agente_${fecha}.pdf`,
                image: {
                    type: 'jpeg',
                    quality: 0.98

                },
                 html2canvas: {
                    scale: 1, // A mayor escala, mejores gráficos, pero más peso
                    letterRendering: true,
                    width: 3500
               
                    
                },
                jsPDF: {
                    format: "a1",
                    orientation: 'landscape' // landscape o portrait
                }
            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err));
    });
});

//**********************************************/
/**INFORME ACTIVIDAD **/
//**********************************************/

function insertventas() {

    console.log("entro /api/insertarventas")

   // const url = 'http://172.20.0.80:4567/api/insertarventas';
    const url = 'http://localhost:4567/api/insertarventas';
    
    const param1 = $("#fini").val()
    const param2 = $("#hventa").val()
    const param3 = $("#tipoventa").val()
    const param4 = $("#poliza").val()
    const param5 = $("#telefono").val()
    const param6 = $("#asegurados").val()
    const param7 = $("#remoteid").val()
    const param8 = $("#origen").val()
    const param9 = $("#adg").val()


    const urln = url + "?fecha_i=" + param1 + "&hventa=" + param2 + "&tipoventa=" + param3 + "&poliza=" + param4
    + "&telefono=" + param5  + "&asegurados=" + param6  + "&remoteid=" + param7  + "&origen=" + param8
    + "&adg=" + param9
    
    $(document).ready(function (req, res) {

        console.log(res)
        console.log(urln)


})
};

//***************************************//
//********CDMagente.html**************//
//****************************************/

function callcdmtipis() {

    console.log("/api/cdmtipisdia")

    
    const url = 'http://172.20.0.80:4567/api/cdmtipisdia';
    const param1 = $("#fini").val()
    const param2 = $("#ffin").val()
    const param3 = $("#campana").val()
    const param4 = $("#service").val()
    const param5 = $("#ddi").val()
    const urln = url + "?fecha_i=" + param1 + "&fecha_f=" + param2 + "&campana=" + param3 + "&service=" + param4 + "&ddi=" + param5

    $(document).ready(function (req, res) {

        console.log(urln)

        $('#cdmtipis').DataTable({
            ajax: {
                url: urln,
                dataSrc: ''
            },
            columns: [
                 { data: "SERVICE" },
                 { data: "DDI" },
                 { data: "CAMPAIN" },
                 { data: "FECHA" },
                 { data: "EMITIDAS" },
                 { data: "EMITIDAS ATENDIDAS" },
                 { data: "p_ATENDIDAS" },
                 { data: "PROMESA" },
                 { data: "PROMESAANT" },
                 { data: "RECLAMACION" },
                 { data: "TELEF_ERR" },
                 { data: "VLLTERCERO" },
                 { data: "VLLTITULAR" },
                 { data: "CORRIENTE" },
                 { data: "CSINPROMESA" },
                 { data: "NEG" },
                 { data: "CONTESTADOR" },
                 { data: "ENTORNOFAM" },
                 { data: "ENTORNOLAB" },
                 { data: "CANCEL" },
                 { data: "INCLOGIN" },
                 { data: "AUTOWRP" }
                
            ],
            responsive: true,
            "lengthMenu": [[50,100, -1], [300,100, "All"]]
        }).columns.adjust()
            .responsive.recalc();
    })

    //Elimino la tabla user en cada llamaada para que se pueda recargar el dato

    $("#cdmtipis").dataTable().fnDestroy();


    chart = document.querySelector('#myChart')

    var options = {
        
            plugins: {
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        font: {
                            size: 20
                        }
                    }
                }
            },
        
        scale: [{
            pointLabels :{
               fontStyle: "bold"
            }
        }],
        series: [{
            name: 'Emitidas',
            type: 'area',
            data: ['']
        }, {
            name: 'Atendidas',
            type: 'line',
            data: ['']
        }, {
            name: 'Promesa',
            type: 'line',
            data: ['']
        }, {
            name: 'Negativa',
            type: 'line',
            data: ['']
        },
        {
            name: 'Entorno FAM',
            type: 'line',
            data: ['']
        },
        {
            name: 'Entorno LAB',
            type: 'line',
            data: ['']
        }
    
    ],
        chart: {
            height: 900,
            type: 'line',
    
            zoom: {
                enabled: false
            }
        },
        stroke: {
            curve: 'smooth'
        },
        fill: {
            type: 'solid',
            opacity: [0.05, 1],
        },
        labels:  [''],
        markers: {
            size: 5
        },
        yaxis: [
            {
    
                title: {
                    text: `Tipificacion ${param3}`,
                    fontStyle: "bold"
                },
            } 
        ],
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function(y) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(0) + " llamadas";
                    }
                    return y;
                }
            }
        }
    };
    
    window.chart3 = new ApexCharts(chart, options);
    //let url='http://172.20.0.80:4567/api/franjas?fecha_i=2022-01-01&fecha_f=2022-02-13&campana=&service='
    
    fetch(urln)
    .then (response => response.json() )
    .then (datos => mostrar(datos))
    .catch (error => error)
    
    
    const mostrar = (datos)=>{
        datos.map(element => {
            console.log(options)
    
            options['labels'].push(element.FECHA)
            options['series'][0].data.push(element.EMITIDAS)
            options['series'][1].data.push(element["EMITIDAS ATENDIDAS"])
            options['series'][2].data.push(element.PROMESA)
            options['series'][3].data.push(element.NEG)
            options['series'][4].data.push(element.ENTORNOFAM)
            options['series'][5].data.push(element.ENTORNOLAB)
            //options['series'][5].data.push(element.EMITIDAS+" "+ATENDIDAS)
         
        });
    
        options['labels'].pop();
        options['labels'].shift();
        options['series'][0].data.pop();
        options['series'][0].data.shift();
        options['series'][1].data.pop();
        options['series'][1].data.shift();
        options['series'][2].data.pop();
        options['series'][2].data.shift();
        options['series'][3].data.pop();
        options['series'][3].data.shift();
        options['series'][4].data.pop(); 
        options['series'][4].data.shift(); 
        options['series'][5].data.pop(); 
        options['series'][5].data.shift(); 
    
       // console.log(options)
       window.chart3.render();
       window.chart3.delete();
    }
}

/**FUNCION PARA EXPORTAR CSV DE LA TABLA **/

function downloadCSV74(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], { type: "text/csv" });

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}

function exportTableTipisToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);

        csv.push(row.join(";"));
    }

    // Download CSV file
    downloadCSV2(csv.join("\n"), filename);
}


/**FUNCION PARA EXPORTAR PDF DE LA TABLA **/

document.addEventListener("DOMContentLoaded", () => {
    // Escuchamos el click del botón
    const $boton = document.querySelector("#btnpdf3");

    const fecha = new Date().toISOString().slice(0, 10);

    $boton.addEventListener("click", () => {
        const $elementoParaConvertir = document.querySelector("#tablecdmagente"); // <-- Aquí puedes elegir cualquier elemento del DOM
        html2pdf()
            .set({
                margin: 2,

                filename: `Orange_CDM_Agente_${fecha}.pdf`,
                image: {
                    type: 'jpeg',
                    quality: 0.98

                },
                 html2canvas: {
                    scale: 1, // A mayor escala, mejores gráficos, pero más peso
                    letterRendering: true,
                    width: 3500
               
                    
                },
                jsPDF: {
                    format: "a1",
                    orientation: 'landscape' // landscape o portrait
                }
            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err));
    });
});


//***************************************//
//********cdmservicio.html**************//
//****************************************/


function callcdmservicio() {

    console.log("/api/cdmserviciodia")

    
    const url = 'http://172.20.0.80:4567/api/cdmserviciodia';
    const param1 = $("#fini").val()
    const param2 = $("#ffin").val()
    const param3 = $("#campana").val()
    const param4 = $("#service").val()
    const param5 = $("#ddi").val()
    const urln = url + "?fecha_i=" + param1 + "&fecha_f=" + param2 + "&campana=" + param3 + "&service=" + param4 + "&ddi=" + param5

    
    $(document).ready(function (req, res) {

        console.log(urln)

        $('#cdmservicio').DataTable({
            ajax: {
                url: urln,
                dataSrc: ''
            },
            columns: [
                 { data: "SERVICE" },
                 { data: "DDI" },
                 { data: "CAMPAIN" },
                 { data: "FECHA" },
                 { data: "EMITIDAS" },
                 { data: "EMITIDAS ATENDIDAS" },
                 { data: "p_ATENDIDAS" },
                 { data: "BUSY" },
                 { data: "DROP" },
                 { data: "NO_ANSWER" },
                 { data: "INVALID_NUMBER" },
                 { data: "VOCIEEMAIL" },
                 { data: "NETWORFAIL" },
                 { data: "p_BUSY" },
                 { data: "p_DROP" },
                 { data: "p_NO_ANSWER" },
                 { data: "p_INVALID_NUMBER" },
                 { data: "p_VOCIEEMAIL" },
                 { data: "p_NETWORFAIL" }
                
            ],
            responsive: true,
            "lengthMenu": [[30, -1], [30, "All"]]
        }).columns.adjust()
            .responsive.recalc();
    })

    //Elimino la tabla user en cada llamaada para que se pueda recargar el dato

    $("#cdmservicio").dataTable().fnDestroy();

    

var chart = document.querySelector('#myChart')
var options = {
    
        plugins: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 20
                    }
                }
            }
        },
    
    scale: [{
        pointLabels :{
           fontStyle: "bold"
        }
    }],
    series: [{
        name: 'Emitidas',
        type: 'area',
        data: ['']
    }, {
        name: 'Atendidas',
        type: 'line',
        data: ['']
    }, {
        name: 'Voicemail',
        type: 'line',
        data: ['']
    }, {
        name: 'Drop',
        type: 'line',
        data: ['']
    },
    {
        name: 'Networkfail',
        type: 'line',
        data: ['']
    },
    {
        name: 'Voicemail',
        type: 'line',
        data: ['']
    }

],
    chart: {
        height: 900,
        type: 'line',

        zoom: {
            enabled: false
        }
    },
    stroke: {
        curve: 'smooth'
    },
    fill: {
        type: 'solid',
        opacity: [0.05, 1],
    },
    labels:  [''],
    markers: {
        size: 5
    },
    yaxis: [
        {

            title: {
                text: `Llamadas ${param3}`,
                fontStyle: "bold"
            },
        } 
    ],
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter: function(y) {
                if (typeof y !== "undefined") {
                    return y.toFixed(0) + " llamadas";
                }
                return y;
            }
        }
    }
};


window.chart2 = new ApexCharts(chart, options);

//let url='http://172.20.0.80:4567/api/franjas?fecha_i=2022-01-01&fecha_f=2022-02-13&campana=&service='

    fetch(urln)
    .then (response => response.json() )
    .then (datos => mostrar(datos))
    .catch (error => error)


const mostrar = (datos)=>{
    datos.map(element => {
        console.log(options)

        options['labels'].push(element.FECHA)
        options['series'][0].data.push(element.EMITIDAS)
        options['series'][1].data.push(element["EMITIDAS ATENDIDAS"])
        options['series'][2].data.push(element.VOCIEEMAIL)
        options['series'][3].data.push(element.DROP)
        options['series'][4].data.push(element.NETWORFAIL)
        //options['series'][5].data.push(element.EMITIDAS+" "+ATENDIDAS)
     
    });

    options['labels'].pop();
    options['labels'].shift();
    options['series'][0].data.pop();
    options['series'][0].data.shift();
    options['series'][1].data.pop();
    options['series'][1].data.shift();
    options['series'][2].data.pop();
    options['series'][2].data.shift();
    options['series'][3].data.pop();
    options['series'][3].data.shift();
    options['series'][4].data.pop(); 
    options['series'][4].data.shift(); 


   // console.log(options)
   window.chart2.render();
   window.chart2.delete();
}

}

/**FUNCION PARA EXPORTAR CSV DE LA TABLA **/

function downloadCSV74(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], { type: "text/csv" });

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}

function exportTableTipisToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);

        csv.push(row.join(";"));
    }

    // Download CSV file
    downloadCSV2(csv.join("\n"), filename);
}


/**FUNCION PARA EXPORTAR PDF DE LA TABLA **/

document.addEventListener("DOMContentLoaded", () => {
    // Escuchamos el click del botón
    const $boton = document.querySelector("#btnpdf3");

    const fecha = new Date().toISOString().slice(0, 10);

    $boton.addEventListener("click", () => {
        const $elementoParaConvertir = document.querySelector("#tablecdmservice"); // <-- Aquí puedes elegir cualquier elemento del DOM
        html2pdf()
            .set({
                margin: 2,

                filename: `Orange_CDM_Servicio_${fecha}.pdf`,
                image: {
                    type: 'jpeg',
                    quality: 0.98

                },
                 html2canvas: {
                    scale: 1, // A mayor escala, mejores gráficos, pero más peso
                    letterRendering: true,
                    width: 3500
               
                    
                },
                jsPDF: {
                    format: "a1",
                    orientation: 'landscape' // landscape o portrait
                }
            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err));
    });
});


//******************************/
//////////LOGIN SERVICIO/////////


function callloginservicio() {

    console.log("ENTRO loginservicio")

    $(document).ready(function (req, res) {

        const url2 = 'http://172.20.0.80:4567/api/loginservicio';
        const param1 = $("#fini").val()
        const param2 = $("#ffin").val()
        const param3 = $("#campana").val()
        

        const urln = url2 + "?fecha_i=" + param1 + "&fecha_f=" + param2 + "&campana=" + param3 


        console.log(urln)

        $('#loginservicio').DataTable({
            ajax: {
                url: urln,
                dataSrc: ''
            },
            columns: [
                { data: "SERVICIO" },
                { data: "FECHA" },
                { data: "LOGADO" },
                { data: "COMIDA" },
                { data: "PAUSA_VISUAL" },
                { data: "FORMACION" }
            
            ],
            responsive: true,
            "lengthMenu": [[50, -1], [50, "All"]]
        }).columns.adjust()
            .responsive.recalc();
    })

    //Elimino la tabla user en cada llamaada para que se pueda recargar el dato

    $("#loginservicio").dataTable().fnDestroy();
}

/**FUNCION PARA EXPORTAR CSV DE LA TABLA **/

function downloadCSV5(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], { type: "text/csv" });

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}

function exportTableTipisToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);

        csv.push(row.join(";"));
    }

    // Download CSV file
    downloadCSV2(csv.join("\n"), filename);
}


/**FUNCION PARA EXPORTAR PDF DE LA TABLA **/

document.addEventListener("DOMContentLoaded", () => {
    // Escuchamos el click del botón
    const $boton = document.querySelector("#btnpdf5");

    const fecha = new Date().toISOString().slice(0, 10);

    $boton.addEventListener("click", () => {
        const $elementoParaConvertir = document.querySelector("#tableloginservicio"); // <-- Aquí puedes elegir cualquier elemento del DOM
        html2pdf()
            .set({
                margin: 0,
                filename: `Orange_Login_Agente_${fecha}.pdf`,
                image: {
                    type: 'jpeg',
                    quality: 0.98

                },
                html2canvas: {
                    scale: 1, // A mayor escala, mejores gráficos, pero más peso
                    letterRendering: true,
                },
                jsPDF: {

                    format: "a4",
                    orientation: 'portrait' // landscape o portrait
                }
            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err));
    });
});

function callloginagente() {

    console.log("ENTRO")

    $(document).ready(function (req, res) {

        const url = 'http://172.20.0.80:4567/api/loginagente';
        const param1 = $("#fini").val()
        const param2 = $("#ffin").val()
        const param3 = $("#campana").val()

        const urln = url + "?fecha_i=" + param1 + "&fecha_f=" + param2 + "&campana=" + param3 + "&service=" 


        console.log(urln)

        $('#loginagente').DataTable({
            ajax: {
                url: urln,
                dataSrc: ''
            },
            columns: [
                { data: "FECHA" },
                { data: "SERVICIO" },
                { data: "AGENTE" },
                { data: "HORA_ENTRADA" },
                { data: "HORA_SALIDA" },
                { data: "LOGADO" },
                { data: "COMIDA" },
                { data: "PAUSA_VISUAL" },
                { data: "FORMACION" }
            
            ],
            responsive: true,
            "lengthMenu": [[50, -1], [50, "All"]]
        }).columns.adjust()
            .responsive.recalc();
    })

    //Elimino la tabla user en cada llamaada para que se pueda recargar el dato

    $("#loginagente").dataTable().fnDestroy();
}

/**FUNCION PARA EXPORTAR CSV DE LA TABLA **/

function downloadCSV5(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], { type: "text/csv" });

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}

function exportTableTipisToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);

        csv.push(row.join(";"));
    }

    // Download CSV file
    downloadCSV2(csv.join("\n"), filename);
}


/**FUNCION PARA EXPORTAR PDF DE LA TABLA **/

document.addEventListener("DOMContentLoaded", () => {
    // Escuchamos el click del botón
    const $boton = document.querySelector("#btnpdf5");

    const fecha = new Date().toISOString().slice(0, 10);

    $boton.addEventListener("click", () => {
        const $elementoParaConvertir = document.querySelector("#tableloginagente"); // <-- Aquí puedes elegir cualquier elemento del DOM
        html2pdf()
            .set({
                margin: 2,
                filename: `Orange_Login_Agente_${fecha}.pdf`,
                image: {
                    type: 'jpeg',
                    quality: 0.98

                },
                 html2canvas: {
                    scale: 1, // A mayor escala, mejores gráficos, pero más peso
                    letterRendering: true,
                    width: 3500
               
                    
                },
                jsPDF: {
                    format: "a1",
                    orientation: 'landscape' // landscape o portrait
                }

            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err));
    });
});


function callcdrtelefonico() {

    console.log("ENTRO")

    $(document).ready(function (req, res) {

        const url = 'http://172.20.0.80:4567/api/cdrtelefonico';
        const param1 = $("#fini").val()
        const param2 = $("#ffin").val()
        //const param3 = $("#campana").val()

        const urln = url + "?fecha_i=" + param1 + "&fecha_f=" + param2 


        console.log(urln)

        $('#cdrtelefonico').DataTable({
            ajax: {
                url: urln,
                dataSrc: ''
            },
            columns: [
                { data: "SERVICIO" },
                { data: "CAMPAIGNNAME" },
                { data: "Caller" },
                { data: "Original CLI" },
                { data: "CLI" },
                { data: "Original  CLD" },
                { data: "CLD	Billing" },
                { data: "Prefix" },
                { data: "Country" },
                { data: "Description" },
                { data: "Setup Time" },
                { data: "Connect Time" },
                { data: "Disconnect Time" },
                { data: "Duration sec" },
                { data: "Billed Durationsec" },
                { data: "Cost	Currency"}
                
            
            ],
            responsive: true,
            "lengthMenu": [[100,500,3000, -1], [100,500,1000, "All"]]
        }).columns.adjust()
            .responsive.recalc();
    })

    //Elimino la tabla user en cada llamaada para que se pueda recargar el dato

    $("#cdrtelefonico").dataTable().fnDestroy();
}

/**FUNCION PARA EXPORTAR CSV DE LA TABLA **/

function downloadCSV7(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], { type: "text/csv" });

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}

function exportTableTipisToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);

        csv.push(row.join(";"));
    }

    // Download CSV file
    downloadCSV2(csv.join("\n"), filename);
}


/**FUNCION PARA EXPORTAR PDF DE LA TABLA **/

document.addEventListener("DOMContentLoaded", () => {
    // Escuchamos el click del botón
    const $boton = document.querySelector("#btnpdf7");

    const fecha = new Date().toISOString().slice(0, 10);

    $boton.addEventListener("click", () => {
        const $elementoParaConvertir = document.querySelector("#cdrtelefonico"); // <-- Aquí puedes elegir cualquier elemento del DOM
        html2pdf()
            .set({
                margin: 0,
                filename: `Orange_CDR_Telefonico_${fecha}.pdf`,
                image: {
                    type: 'jpeg',
                    quality: 0.98

                },
                html2canvas: {
                    scale: 1, // A mayor escala, mejores gráficos, pero más peso
                    letterRendering: true,
                },
                jsPDF: {

                    format: "a1",
                    orientation: 'landscape' // landscape o portrait
                }
            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err));
    });
});
