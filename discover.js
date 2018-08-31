
setTimeout( ()=> {
  var swarm = require('discovery-swarm')

var DAT_DOMAIN = 'dat.local'
var DEFAULT_DISCOVERY = [
  'discovery1.datprotocol.com',
  'discovery2.datprotocol.com'
]

var str = `hello world from a discovery.js instance ${Math.round(Math.random() * 100)}`

var sw = swarm({utp: true, tcp: false, dht: false, dns: {server: DEFAULT_DISCOVERY, domain: DAT_DOMAIN}})

sw.listen()
sw.join('somekindoftest') // can be any id/name/hash

console.log('mine:', str)

sw.on('connection', function (connection) {
  console.log('found + connected to peer', connection)
  connection.write(str)
  connection.on('data', function (data) {
    console.log('echo: ' + data)
  })
})

}, 1000)
