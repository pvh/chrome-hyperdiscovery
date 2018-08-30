var DiscoveryChannel = require("discovery-channel")

var DAT_DOMAIN = 'dat.local'
var DEFAULT_DISCOVERY = [
  'discovery1.datprotocol.com',
  'discovery2.datprotocol.com'
]

setTimeout( ()=> {
  //var sw = swarm({ utp: false, dns: {multicast: false, server: DEFAULT_DISCOVERY, domain: DAT_DOMAIN}})
  var dc = DiscoveryChannel({dht: false})

  dc.join('discovery-channel-test', 1025 + Math.floor(Math.random() * 100))
  console.log('joined chrome-app-test')
  console.log(dc.list())

  dc.on('peer', function(id, peer, type) {
    console.log("found + connected to peer", id, peer, type)
  })
}, 1000)
