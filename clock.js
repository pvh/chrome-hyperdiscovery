const clock = require('hyperclock')('clock')
clock.on('ready', function () {
  console.log(clock.key.toString('hex'))
  require('hyperdiscovery')(clock)
})