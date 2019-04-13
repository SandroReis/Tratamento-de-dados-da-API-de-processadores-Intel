values3 = [];


var r = require('request');

//request da tabela series
var getDados=(bd) => {
r.get('https://odata.intel.com/API/v1_0/Products/Processors()?&$select=Series/SeriesId,Series/SeriesName&$expand=Series&$format=json', function (error, response, body3) {
    console.log('error rqproc:', error);
    console.log('statusCode:', response && response.statusCode);
    var obj3 = JSON.parse(body3);
    var valores = [];
    for (const key3 in obj3['d']) {
        var ok = 1;
        values3[key3] = [obj3['d'][key3]['Series']['SeriesId'], obj3['d'][key3]['Series']['SeriesName']];
        for (const key in valores) {
            
            if(JSON.stringify(values3[key3]) == JSON.stringify(valores[key])){
                ok++;
            }
        }
        if (ok == 1){
            valores.push(values3[key3])
        }
    }

    

    console.log(valores)

    //inserir no banco tabela series
    const sql3 = 'INSERT INTO Series (SeriesId,SeriesName) VALUES ?';

    bd.query(sql3, [valores], function (error, results, fields) {
        if (error) return console.log(error);
        console.log('adicionou registros Series!   ');
        

        //values3 = [ ... new Set (values4)];
    });
});
}
module.exports = getDados;