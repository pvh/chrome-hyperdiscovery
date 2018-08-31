var DiscoverySwarm = require("discovery-swarm")

var DAT_DOMAIN = 'dat.local'
var DEFAULT_DISCOVERY = [
  'discovery1.datprotocol.com',
  'discovery2.datprotocol.com'
]

setTimeout( ()=> {
  var ds = DiscoverySwarm({utp: true, tcp: false, dht: false, dns: {multicast: false, server: DEFAULT_DISCOVERY, domain: DAT_DOMAIN}})

  ds.join('discovery-channel-test')
  console.log('joined chrome-app-test')
  console.log(ds)

  ds.on('peer', function (connection) {
    console.log('found a peer', connection)
  })

  ds.on('connecting', function (peer) {
    console.log('connecting to peer', peer)
  })

  ds.on('connection', function(peer) {
    console.log("found + connected to peer", peer)
    console.log(peer.channel)
    peer.channel.on('message', (message) => console.log(message))
    peer.channel.send("sent by discover.js")
  })
}, 1000)