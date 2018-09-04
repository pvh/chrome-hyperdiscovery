
setTimeout( ()=> {
  let Hypermerge = require('./src/hypermerge/index')
//  let storage = require("random-access-chrome-file")
  var storage = require('random-access-file')
//  var storage = require('random-access-memory')


  let hm = new Hypermerge({ path: "derp", storage: storage })
  hm.once('ready', () => {
    hm.joinSwarm()
//    var doc = hm.create();
//    var id = hm.getId(doc);
//    var handle = hm.openHandle(id);
    var handle = hm.openHandle(process.argv[2]);
    console.log("HANDLE",handle);
    handle.onChange(console.log)
  })

}, 1000)
