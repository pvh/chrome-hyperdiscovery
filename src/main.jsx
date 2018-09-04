
process.hrtime = require('browser-process-hrtime')

setTimeout( ()=> {

/*
  let Hypermerge = require('../src/hypermerge/index')
  let racf = require("random-access-chrome-file")
//  var raf = require('random-access-file')
//  var ram = require('random-access-memory')

  let hm = new Hypermerge({ storage: racf })
  hm.once('ready', () => {
    hm.joinSwarm()
  })
*/


var swarm = require('discovery-swarm');

var DAT_DOMAIN = 'dat.local'
var DEFAULT_DISCOVERY = [
  'discovery1.datprotocol.com',
  'discovery2.datprotocol.com'
]

var apptype = `discover.js`

var sw = swarm({utp: true, tcp: false, dht: false }) //, dns: {server: DEFAULT_DISCOVERY, domain: DAT_DOMAIN}})

console.log("SW._utp",sw._utp);

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
