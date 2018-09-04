
setTimeout( ()=> {
  let Hypermerge = require('./src/hypermerge/index')
//  let racf = require("random-access-chrome-file")
//  var raf = require('random-access-file')
  var ram = require('random-access-memory')


  let hm = new Hypermerge({ storage: ram })
  hm.once('ready', () => {
    hm.joinSwarm()
    cb()
  })

}, 1000)
