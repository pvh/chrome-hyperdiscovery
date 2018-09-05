
const racf = require('random-access-chrome-file')
const dgram = require('chrome-dgram')
const mdns = require('multicast-dns')
const hd = require('hyperdiscovery')
const hypercore = require('hypercore')

const hyperclock = require('hyperclock')

const socket = dgram.createSocket('udp4')

socket.setMulticastTTL(255)
socket.setMulticastLoopback(true)

chrome.system.network.getNetworkInterfaces((ifaces) => {
  socket.on('listening', function () {
    for (let i = 0; i < ifaces.length; i++) {
      if (ifaces[i].prefixLength == 24) {
        socket.addMembership('224.0.0.251', ifaces[i].address)
      }
    }
    run(socket)
  })
  socket.bind(5300)
})


function run (socket) {
  const multicast = mdns({socket, bind: false, port: 5300, multicast: false})

  // replace this with your own hypercore
  const feed = require('hyperclock')(name => racf('/clock/' + name))
  feed.on('ready', function () {
    console.log(feed.key.toString('hex'))
    hd(feed, {
      dht: false,
      dns: {multicast}
    })
  })
}
