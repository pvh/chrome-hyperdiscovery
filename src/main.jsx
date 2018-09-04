
process.hrtime = require('browser-process-hrtime')

setTimeout( ()=> {

  let Hypermerge = require('../src/hypermerge/index')
  let racf = require("random-access-chrome-file")
//  var raf = require('random-access-file')
//  var ram = require('random-access-memory')

  let hm = new Hypermerge({ storage: racf })
  hm.once('ready', () => {
    hm.joinSwarm()
  })

}, 1000)
