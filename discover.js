var swarm = require("discovery-swarm")

var sw = swarm({ utp: false })

sw.listen(1025 + Math.floor(Math.random() * 100))
sw.join('chrome-app-test') // can be any id/name/hash

sw.on("connection", function(connection) {
  console.log("found + connected to peer", connection)
})
