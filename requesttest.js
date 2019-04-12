var request2 = require('request3');
request('https://odata.intel.com/API/v1_0/Products/Processors()?&$select=Series/SeriesId,Series/SeriesName&$expand=Series&$format=json', function (error, response, body2) {
  console.log('error:', error);
  console.log('statusCode:', response && response.statusCode);
  var obj3 = JSON.parse(body3);
  var values3 = [];
  for (const key in obj3['d']) {
    console.log(obj3['d'][key]['Family']['FamilyId']);
  }
});