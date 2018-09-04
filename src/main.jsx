
process.hrtime = require('browser-process-hrtime')

setTimeout( ()=> {

  let Hypermerge = require('../src/hypermerge/index')
  let racf = require("random-access-chrome-file")
//  var raf = require('random-access-file')
//  var ram = require('random-access-memory')

  let hm = new Hypermerge({ storage: racf })
  hm.once('ready', () => {
    hm.joinSwarm()
    var doc = hm.create();
    var id = hm.getId(doc);
    console.log(id)
    var handle = hm.openHandle(id);
    setInterval( () => {
      handle.change( (doc) => {
        let value = Math.random()
        console.log("new value: ", value)
        doc.value = value
      })
    }, 1000)
  })

}, 1000)
