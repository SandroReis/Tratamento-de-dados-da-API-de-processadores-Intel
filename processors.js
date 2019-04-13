//Variáveis que receberão os dados da api
values = []; //dados de Processor
//Conexão ao banco


connection.connect(function (err) {
    if (err) return console.log(err);
    console.log('conectou!');
    createTable(connection);//chama função create table.
    //addRows(connection) //chama função add rows
    //removerduplicatas(connection)
    //insereseries(connection);
})

//-----------------------------------------------------------------///---------------------------------------------------------

/*function createTable(conn) {
     
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

    //manda o comando criação da tabela Processors para o banco
    conn.query(sql3, function (error, results, fields) {
        if (error) return console.log(error);
        console.log('criou a tabela Processors!');
    });
}*/


//request da tabela processors
var request = require('request');
request('https://odata.intel.com/API/v1_0/Products/Processors()?&$select=ProductId,ProductFamilyId,ProductSeriesId,MaxTDP,EM64,HyperThreading,IntegratedGraphics,CacheKB,ClockSpeedMhz,ThermalMonitoring2Indicator,TBT,CacheType,ThreadCount,Status,BornOnDate,ProductName,TBTVersion,ConfigTDPMin,GraphicsDirectXSupport,Graphics4KSupportLevel,SpeedShiftTechVersion,DiscreteNumDisplaysSupported&$format=json', function (error, response, body) {
    console.log('error rqproc:', error);
    console.log('statusCode:', response && response.statusCode);
    //parse json para obj
    var obj = JSON.parse(body);
    console.log('jsonparse OK!');
});


//Preencher Vetor Values com dados de "processors"
for (const key in obj['d']) {
    values[key] = [obj['d'][key]['ProductId'], obj['d'][key]['ProductFamilyId'], obj['d'][key]['ProductSeriesId'], obj['d'][key]['MaxTDP'],
    obj['d'][key]['EM64'], obj['d'][key]['HyperThreading'], obj['d'][key]['IntegratedGraphics'], obj['d'][key]['ClockSpeedMhz'],
    obj['d'][key]['ThermalMonitoring2Indicator'], obj['d'][key]['TBT'], obj['d'][key]['CacheType'], obj['d'][key]['ThreadCount'],
    obj['d'][key]['BornOnDate'], obj['d'][key]['ProductName'], obj['d'][key]['TBTVersion'], obj['d'][key]['ConfigTDPMin'],
    obj['d'][key]['GraphicsDirectXSupport'], obj['d'][key]['Graphics4KSupportLevel'], obj['d'][key]['SpeedShiftTechVersion'],
    obj['d'][key]['DiscreteNumDisplaysSupported']];
}

//Processors queeue testado e funcionando!.
const sql1 = "INSERT INTO Processors(ProductId,ProductFamilyId,ProductSeriesId,MaxTDP,EM64,HyperThreading,IntegratedGraphics,ClockSpeedMhz,ThermalMonitoring2Indicator,TBT,CacheType,ThreadCount,BornOnDate,ProductName,TBTVersion,ConfigTDPMin,GraphicsDirectXSupport,Graphics4KSupportLevel,SpeedShiftTechVersion,DiscreteNumDisplaysSupported) VALUES ?";
conn.query(sql1, [values], function (error, results, fields) {

    if (error) return console.log(error);
    console.log('adicionou registro Processorss!');
    conn.end();
});


