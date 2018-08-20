var swarm = require('discovery-swarm')

setTimeout( function() {
  var sw = swarm()
  sw.listen()
  sw.join('chrome-app-test')
  sw.on('connection', function (connection) {
    console.log(connection)
  })
}, 1000)
