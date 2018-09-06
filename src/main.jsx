import * as React from "react"
import { render } from "react-dom"
import App from "./components/App"
import racf from 'random-access-chrome-file'
import dgram from 'chrome-dgram'
import mdns from 'multicast-dns'
import hd from 'hyperdiscovery'
import hypercore from 'hypercore'
import Hypermerge from "./hypermerge"

process.hrtime = require("browser-process-hrtime")

setTimeout(() => {
  let hm = new Hypermerge({ storage: racf })
  window.hm = hm

  render(<App hm={hm} />, window.app)

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
}, 1000)



function run(socket) {
  const multicast = mdns({ socket, bind: false, port: 5300, multicast: false })

  hm.ready.then(() => {
    hm.joinSwarm({
      dht: false,
      dns: { multicast }
    })
  })
}
