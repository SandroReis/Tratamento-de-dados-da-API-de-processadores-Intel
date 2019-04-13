values3 = [];
unico = []
function puxaapi() {
  var request = require('request');
  request('https://odata.intel.com/API/v1_0/Products/Processors()?&$select=Series/SeriesId,Series/SeriesName&$expand=Series&$format=json', function (error, response, body3) {
    console.log('error rqproc:', error);
    console.log('statusCode:', response && response.statusCode);
    var obj3 = JSON.parse(body3);
    // let values3 = [];
    for (const key3 in obj3['d']) {
      values3[key3] = [obj3['d'][key3]['Series']['SeriesId'], obj3['d'][key3]['Series']['SeriesName']];
      //console.log(values3[key3])
    }
    console.log('Vetor Preenchido');

    //console.log(unico)
    //values3 = [ ... new Set (values4)];

  });
}
function funcao(){
  puxaapi();
  removerduplicatas(values3);
  console.log(unico)
}

funcao();




function removerduplicatas(arr) {
  unico = [... new Set(arr)];
  console.log('Fiz o unico')
}



