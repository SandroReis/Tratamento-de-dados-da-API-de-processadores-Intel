
//Variáveis que receberão os dados da api
values = []; //dados de Processor
values2 = []; //dados de Family
values3 = []; //dados de series
//values4 = [];
//Conexão ao banco
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'intelapi'
});



connection.connect(function (err) {
    if (err) return console.log(err);
    console.log('conectou!');
    createTable(connection);//chama função create table.
    addRows(connection) //chama função add rows 
})
function createTable(conn) {
    //criação da tabela Series.
    const sql2 = "CREATE TABLE IF NOT EXISTS Series (\n" +
        "SeriesId varchar(100), \n" +
        "SeriesName varchar (200), \n" +
        "PRIMARY KEY (SeriesId)\n" +
        ");\n";

    //criação da tabela processor.
    const sql3 = "CREATE TABLE IF NOT EXISTS Processors (\n" +
        "ProductId varchar(100) NOT NULL,\n" +
        "ProductFamilyId varchar(100),\n" +
        "ProductSeriesId varchar(100),\n" +
        "MaxTDP varchar(100), \n" +
        "EM64 varchar(100), \n" +
        "HyperThreading varchar(100), \n" +
        "IntegratedGraphics varchar (100), \n" +
        "ClockSpeedMhz varchar(100), \n" +
        "ThermalMonitoring2Indicator varchar(100), \n" +
        "TBT varchar(100), \n" +
        "CacheType varchar (100), \n" +
        "ThreadCount varchar(100), \n" +
        "BornOnDate varchar(100), \n" +
        "ProductName varchar(500), \n" +
        "TBTVersion varchar(100), \n" +
        "ConfigTDPMin varchar(100), \n" +
        "GraphicsDirectXSupport varchar (100), \n" +
        "Graphics4KSupportLevel varchar(100), \n" +
        "SpeedShiftTechVersion varchar(100), \n" +
        "DiscreteNumDisplaysSupported varchar(100), \n" +
        "PRIMARY KEY (ProductId)\n" +
        //"FOREIGN KEY (ProductSeriesId) REFERENCES Series (SeriesId),\n" +
        // "FOREIGN KEY (ProductFamilyId) REFERENCES Family (FamilyId)\n" +
        ");\n";

    //criação da tabela family
    const sql = "CREATE TABLE IF NOT EXISTS Family (\n" +
        "FamilyId int, \n" +
        "FamilyName varchar (200), \n" +
        "PRIMARY KEY (FamilyID)\n" +
        ");\n";

    //manda o comando criação da tabela family para o banco
    conn.query(sql, function (error, results, fields) {
        if (error) return console.log(error);
        console.log('criou a tabela Family!');
    });

    //manda o comando criação da tabela series para o banco
    conn.query(sql2, function (error, results, fields) {
        if (error) return console.log(error);
        console.log('criou a tabela Series!');
    });


    //manda o comando criação da tabela Processors para o banco
    conn.query(sql3, function (error, results, fields) {
        if (error) return console.log(error);
        console.log('criou a tabela Processors!');
    });
}

//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------



function addRows(conn) {
    //request da tabela processors
   /* var request = require('request');
    request('https://odata.intel.com/API/v1_0/Products/Processors()?&$select=ProductId,ProductFamilyId,ProductSeriesId,MaxTDP,EM64,HyperThreading,IntegratedGraphics,CacheKB,ClockSpeedMhz,ThermalMonitoring2Indicator,TBT,CacheType,ThreadCount,Status,BornOnDate,ProductName,TBTVersion,ConfigTDPMin,GraphicsDirectXSupport,Graphics4KSupportLevel,SpeedShiftTechVersion,DiscreteNumDisplaysSupported&$format=json', function (error, response, body) {
        console.log('error rqproc:', error);
        console.log('statusCode:', response && response.statusCode);
        //parse json para obj
        var obj = JSON.parse(body);
        console.log('jsonparse OK!');
        //vetor da tabela processors
        //var values = [];
        //Request da tabela family
        var request = require('request');
        request('https://odata.intel.com/API/v1_0/Products/Processors()?&$select=Family/FamilyId,Family/FamilyName&$expand=Family&$format=json', function (error, response, body2) {
            console.log('error rqfamily:', error);
            console.log('statusCode:', response && response.statusCode);
            var obj2 = JSON.parse(body2);
            //vetor da tabella familly
            // let values2 = [];
            //Preencher Vetor Values2 com dados de "Family"
            for (const key2 in obj2['d']) {
                values2[key2] = [obj2['d'][key2]['Family']['FamilyId'], obj2['d'][key2]['Family']['FamilyName']];
               // console.log(values2[key2])
            }
        });
        */
        //request da tabela series
        var request = require('request');
        request('https://odata.intel.com/API/v1_0/Products/Processors()?&$select=Series/SeriesId,Series/SeriesName&$expand=Series&$format=json', function (error, response, body3) {
            console.log('error rqproc:', error);
            console.log('statusCode:', response && response.statusCode);
            var obj3 = JSON.parse(body3);
            // let values3 = [];
            for (const key3 in obj3['d']) {
                
                    if(values3.indexOF(obj3['d']['Series']['SeriesId'])= -1){
                        values3[key3] = [obj3['d'][key3]['Series']['SeriesId'], obj3['d'][key3]['Series']['SeriesName']];
                        console.log(values3[key3])
                    }
                    
                    
                
                //console.log(values3[key3])
            }
            //values3 = [ ... new Set (values4)];
            insereseries(conn);
        });


        //Preencher Vetor Values com dados de "processors"
        /*for (const key in obj['d']) {
            values[key] = [obj['d'][key]['ProductId'], obj['d'][key]['ProductFamilyId'], obj['d'][key]['ProductSeriesId'], obj['d'][key]['MaxTDP'],
            obj['d'][key]['EM64'], obj['d'][key]['HyperThreading'], obj['d'][key]['IntegratedGraphics'], obj['d'][key]['ClockSpeedMhz'],
            obj['d'][key]['ThermalMonitoring2Indicator'], obj['d'][key]['TBT'], obj['d'][key]['CacheType'], obj['d'][key]['ThreadCount'],
            obj['d'][key]['BornOnDate'], obj['d'][key]['ProductName'], obj['d'][key]['TBTVersion'], obj['d'][key]['ConfigTDPMin'],
            obj['d'][key]['GraphicsDirectXSupport'], obj['d'][key]['Graphics4KSupportLevel'], obj['d'][key]['SpeedShiftTechVersion'],
            obj['d'][key]['DiscreteNumDisplaysSupported']];
        }*/


        //inserir no banco tabela family
       /* const sql2 = "INSERT INTO Family(FamilyId,FamilyName) VALUES ?";
        conn.query(sql2, [values2], function (error, results, fields) {

            if (error) return console.log(error);
            console.log('adicionou registros Family!');
            conn.end();
        });*/

        //inserir no banco tabela series
        /*const sql3 = 'INSERT INTO Series (SeriesId,SeriesName) VALUES ?';

        conn.query(sql3, [values3], function (error, results, fields) {
            // get inserted rows
           // console.log('Row inserted:' + results.affectedRows);
            if (error) return console.log(error);
            console.log('adicionou registros Series!');
            conn.end();
        });*/


        //const sql3 = "INSERT INTO Processors(ProductId,ProductFamilyId,ProductSeriesId,MaxTDP,EM64,HyperThreading,IntegratedGraphics,ClockSpeedMhz,ThermalMonitoring2Indicator,TBT,CacheType,ThreadCount,BornOnDate,ProductName,TBTVersion,ConfigTDPMin,GraphicsDirectXSupport,Graphics4KSupportLevel,SpeedShiftTechVersion,DiscreteNumDisplaysSupported) VALUES ?";

        //Processors queeue testado e funcionando!.
       /* const sql1 = "INSERT INTO Processors(ProductId,ProductFamilyId,ProductSeriesId,MaxTDP,EM64,HyperThreading,IntegratedGraphics,ClockSpeedMhz,ThermalMonitoring2Indicator,TBT,CacheType,ThreadCount,BornOnDate,ProductName,TBTVersion,ConfigTDPMin,GraphicsDirectXSupport,Graphics4KSupportLevel,SpeedShiftTechVersion,DiscreteNumDisplaysSupported) VALUES ?";
        conn.query(sql1, [values], function (error, results, fields) {

            if (error) return console.log(error);
            console.log('adicionou registro Processorss!');
            conn.end();
        });*/
    //});


   /* function inserefamily(conn){
        const sql2 = "INSERT INTO Family(FamilyId,FamilyName) VALUES ?";
        conn.query(sql2, [values2], function (error, results, fields) {

            if (error) return console.log(error);
            console.log('adicionou registros Family!');
            conn.end();
        });
    }
    function insereprocessor(conn){
        const sql1 = "INSERT INTO Processors(ProductId,ProductFamilyId,ProductSeriesId,MaxTDP,EM64,HyperThreading,IntegratedGraphics,ClockSpeedMhz,ThermalMonitoring2Indicator,TBT,CacheType,ThreadCount,BornOnDate,ProductName,TBTVersion,ConfigTDPMin,GraphicsDirectXSupport,Graphics4KSupportLevel,SpeedShiftTechVersion,DiscreteNumDisplaysSupported) VALUES ?";
        conn.query(sql1, [values], function (error, results, fields) {

            if (error) return console.log(error);
            console.log('adicionou registro Processorss!');
            conn.end();
        });
    }*/
    function insereseries(conn){
        const sql3 = 'INSERT INTO Series (SeriesId,SeriesName) VALUES ?';

        conn.query(sql3, [values3], function (error, results, fields) {
            // get inserted rows
           // console.log('Row inserted:' + results.affectedRows);
            if (error) return console.log(error);
            //console.log('adicionou registros Series!');
            conn.end();
        });
    }

    
}

