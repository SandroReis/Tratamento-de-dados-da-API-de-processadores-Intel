var r = require('request');
r.get('https://odata.intel.com/API/v1_0/Products/Processors()?&$select=Series/SeriesId,Series/SeriesName&$expand=Series&$format=json', function (error, response, body3) {
     console.log('error rqproc:', error);
     console.log('statusCode:', response && response.statusCode);
     //var obj3 = JSON.parse(body3);


    const obj3 = JSON.parse(body3)  
    console.log(obj3.d.Series)  
    const valores = obj3.d.Series;
    console.log(valores);

});