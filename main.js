var bd = require('./conectar')
bd.connect()
var series = require('./series')

var p1 = new Promise(function(resolve,reject){series(bd)})
//series(bd)
p1.then(function(){console.log('funcionou')})