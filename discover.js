
setTimeout( ()=> {
/*
  let Hypermerge = require('./src/hypermerge/index')
//  let storage = require("random-access-chrome-file")
  var storage = require('random-access-file')
//  var storage = require('random-access-memory')


  let hm = new Hypermerge({ path: "derp", storage: storage })
  hm.once('ready', () => {
    hm.joinSwarm()
//    var doc = hm.create();
//    var id = hm.getId(doc);
//    var handle = hm.openHandle(id);
    var handle = hm.openHandle("cbfda8d7647862f250c6a627e1f48393e3df60a1825acd93fba15d575f6f3034");
//    console.log("DOC",doc);
//    console.log("ID",id);
    console.log("HANDLE",handle);
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
