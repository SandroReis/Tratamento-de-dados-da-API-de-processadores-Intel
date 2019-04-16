var bd = require('./conectar')
bd.connect()

var insert = require ('./inserebanco');

insert(bd)



