
setTimeout( ()=> {
  var swarm = require('discovery-swarm')

var DAT_DOMAIN = 'dat.local'
var DEFAULT_DISCOVERY = [
  'discovery1.datprotocol.com',
  'discovery2.datprotocol.com'
]

var apptype = `discover.js`

var sw = swarm({utp: false, tcp: true, dht: false }) //, dns: {server: DEFAULT_DISCOVERY, domain: DAT_DOMAIN}})

sw.listen(0, () => console.log("we are on port ", sw.address().port))
sw.join('peter') // can be any id/name/hash

sw.on('peer', function(peer) {
  console.log('peer discovered', peer.host, ':', peer.port)
})

sw.on('connection', function (connection) {
  console.log('found + connected to peer')
  connection.write(`hello from a ${apptype} on port ${sw.address().port}`)
  connection.on('data', function (data) {
    console.log('echo: ' + data)
  })
})

}, 1000)
