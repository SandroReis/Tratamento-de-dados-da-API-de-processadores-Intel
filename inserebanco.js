values = [];
values1 = [];
values2 = [];
values3 = [];
var r = require('request')
function requestAPI(bd) {


    r.get('https://odata.intel.com/API/v1_0/Products/Processors()?&$select=Series/SeriesId,Series/SeriesName&$expand=Series&$format=json', function (error, response, body3) {
        console.log('error rqproc:', error);
        console.log('statusCode:', response && response.statusCode);
        var obj3 = JSON.parse(body3);
        var valores = [];
        for (const key3 in obj3['d']) {
            var ok = 1;
            values3[key3] = [obj3['d'][key3]['Series']['SeriesId'], obj3['d'][key3]['Series']['SeriesName']];
            for (const key in valores) {

                if (JSON.stringify(values3[key3]) == JSON.stringify(valores[key])) {
                    ok++;
                }
            }
            if (ok == 1) {
                valores.push(values3[key3])
            }
        }
        //console.log(valores)
        //inserir no banco tabela series
        const sql3 = 'INSERT INTO Series (SeriesId,SeriesName) VALUES ?';

        bd.query(sql3, [valores], function (error, results, fields) {
            if (error) return console.log(error);
            console.log('adicionou registros Series!   ');

        });
        r.get('https://odata.intel.com/API/v1_0/Products/Processors()?&$select=Family/FamilyId,Family/FamilyName&$expand=Family&$format=json', function (error, response, body2) {
            console.log('error rqfamily:', error);
            console.log('statusCode:', response && response.statusCode);
            var obj2 = JSON.parse(body2);
            var valores = [];
            //vetor da tabella family
            //Preencher Vetor Values2 com dados de "Family"
            for (const key2 in obj2['d']) {
                values2[key2] = [obj2['d'][key2]['Family']['FamilyId'], obj2['d'][key2]['Family']['FamilyName']];
                // console.log(values2[key2])
                var ok = 1;
                for (const key in valores) {
                    if (JSON.stringify(values2[key2]) == JSON.stringify(valores[key])) {
                        ok++;
                    }
                }
                if (ok == 1) {
                    valores.push(values2[key2])
                }
            }
            //inserir no banco tabela family
            const sql2 = "INSERT INTO Family(FamilyId,FamilyName) VALUES ?";

            bd.query(sql2, [valores], function (error, results, fields) {

                if (error) return console.log(error);
                console.log('adicionou registros Family!');

            });
            r.get('https://odata.intel.com/API/v1_0/Products/Processors()?&$select=ProductId,ProductFamilyId,ProductSeriesId,MaxTDP,EM64,HyperThreading,IntegratedGraphics,CacheKB,ClockSpeedMhz,ThermalMonitoring2Indicator,TBT,CacheType,ThreadCount,Status,BornOnDate,ProductName,TBTVersion,ConfigTDPMin,GraphicsDirectXSupport,Graphics4KSupportLevel,SpeedShiftTechVersion,DiscreteNumDisplaysSupported&$format=json', function (error, response, body) {
                console.log('error rqproc:', error);
                console.log('statusCode:', response && response.statusCode);
                //parse json para obj
                var obj = JSON.parse(body);
                console.log('jsonparse OK!');

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
                bd.query(sql1, [values], function (error, results, fields) {

                    if (error) return console.log(error);
                    console.log('adicionou registro Processorss!');
                    bd.end();
                });
            });
        });
    });

}
module.exports = requestAPI;