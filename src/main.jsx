var swarm = require("discovery-swarm")

var DAT_DOMAIN = 'dat.local'
var DEFAULT_DISCOVERY = [
  'discovery1.datprotocol.com',
  'discovery2.datprotocol.com'
]

setTimeout( ()=> {
  //var sw = swarm({ utp: false, dns: {multicast: false, server: DEFAULT_DISCOVERY, domain: DAT_DOMAIN}})
  var sw = swarm({ utp: false, dns: {multicast: true}})

  sw.listen(1025 + Math.floor(Math.random() * 100))
  sw.join('chrome-app-test') // can be any id/name/hash

  sw.on("connection", function(connection) {
    console.log("found + connected to peer", connection)
  })
}, 2000)
