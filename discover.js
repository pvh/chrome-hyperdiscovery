
setTimeout( ()=> {
  let Hypermerge = require('./src/hypermerge/index')
//  let storage = require("random-access-chrome-file")
  var storage = require('random-access-file')
//  var storage = require('random-access-memory')


  let hm = new Hypermerge({ path: "derp", storage: storage })
  hm.once('ready', () => {
    hm.joinSwarm()
    var doc = hm.create();
    var id = hm.getId(doc);
    var handle = hm.openHandle(id);
//    var handle = hm.openHandle("cbfda8d7647862f250c6a627e1f48393e3df60a1825acd93fba15d575f6f3034");
//    console.log("DOC",doc);
//    console.log("ID",id);
    console.log("HANDLE",handle);
  })

}, 1000)
